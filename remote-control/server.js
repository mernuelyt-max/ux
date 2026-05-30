#!/usr/bin/env node
/**
 * Remote-control relay server.
 *
 * Acts as a broker between two kinds of clients:
 *   - Agents      : the device/app being controlled. They open a persistent
 *                   Server-Sent Events (SSE) stream and receive commands.
 *   - Controllers : the operator (web UI, CLI, or any HTTP client). They POST
 *                   commands targeted at a specific agent and optionally wait
 *                   for the result.
 *
 * Uses only Node.js built-ins (no external dependencies).
 *
 * Env:
 *   PORT                  HTTP port (default 8787)
 *   REMOTE_CONTROL_TOKEN  optional shared secret; if set, every request must
 *                         send it via `Authorization: Bearer <token>` or
 *                         `?token=<token>`.
 */
import http from 'node:http';
import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, normalize } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 8787;
const TOKEN = process.env.REMOTE_CONTROL_TOKEN || null;
const RESULT_TIMEOUT_MS = 30_000;

/** @type {Map<string, Agent>} */
const agents = new Map();
/** @type {Map<string, PendingResult>} */
const pendingResults = new Map();

/**
 * @typedef {Object} Agent
 * @property {string} id
 * @property {string} name
 * @property {string} type
 * @property {http.ServerResponse} stream
 * @property {number} connectedAt
 * @property {number} lastSeen
 *
 * @typedef {Object} PendingResult
 * @property {http.ServerResponse} res    controller awaiting the result
 * @property {NodeJS.Timeout} timer
 */

const STATIC_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

function authorized(req, url) {
  if (!TOKEN) return true;
  const header = req.headers['authorization'] || '';
  const bearer = header.startsWith('Bearer ') ? header.slice(7) : null;
  const qToken = url.searchParams.get('token');
  return bearer === TOKEN || qToken === TOKEN;
}

function sendJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
    'Access-Control-Allow-Origin': '*',
  });
  res.end(payload);
}

function readBody(req, limit = 1_000_000) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > limit) {
        reject(new Error('payload too large'));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function agentSummary(a) {
  return {
    id: a.id,
    name: a.name,
    type: a.type,
    connectedAt: a.connectedAt,
    lastSeen: a.lastSeen,
  };
}

/** Push a server-sent event to an agent's stream. */
function pushEvent(agent, event, data) {
  agent.stream.write(`event: ${event}\n`);
  agent.stream.write(`data: ${JSON.stringify(data)}\n\n`);
}

async function serveStatic(res, urlPath) {
  const rel = urlPath === '/' ? '/index.html' : urlPath;
  const filePath = normalize(join(__dirname, 'public', rel));
  if (!filePath.startsWith(join(__dirname, 'public'))) {
    return sendJson(res, 403, { error: 'forbidden' });
  }
  try {
    const data = await readFile(filePath);
    const ext = filePath.slice(filePath.lastIndexOf('.'));
    res.writeHead(200, { 'Content-Type': STATIC_TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  } catch {
    sendJson(res, 404, { error: 'not found' });
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = url;

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
    return res.end();
  }

  // Static control panel.
  if (req.method === 'GET' && (pathname === '/' || pathname.startsWith('/public/') || pathname === '/app.js' || pathname === '/styles.css')) {
    const p = pathname.startsWith('/public/') ? pathname.slice('/public'.length) : pathname;
    return serveStatic(res, p);
  }

  if (!authorized(req, url)) {
    return sendJson(res, 401, { error: 'unauthorized' });
  }

  // List connected agents.
  if (req.method === 'GET' && pathname === '/api/agents') {
    return sendJson(res, 200, { agents: [...agents.values()].map(agentSummary) });
  }

  // Agent opens an SSE command stream.
  let m;
  if (req.method === 'GET' && (m = pathname.match(/^\/api\/agents\/([^/]+)\/stream$/))) {
    const id = decodeURIComponent(m[1]);
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    });
    const agent = {
      id,
      name: url.searchParams.get('name') || id,
      type: url.searchParams.get('type') || 'generic',
      stream: res,
      connectedAt: Date.now(),
      lastSeen: Date.now(),
    };
    agents.set(id, agent);
    pushEvent(agent, 'ready', { id, serverTime: Date.now() });
    console.log(`[+] agent connected: ${agent.name} (${id}) type=${agent.type}`);

    const keepAlive = setInterval(() => {
      res.write(`: keep-alive ${Date.now()}\n\n`);
    }, 15_000);

    req.on('close', () => {
      clearInterval(keepAlive);
      if (agents.get(id) === agent) agents.delete(id);
      console.log(`[-] agent disconnected: ${agent.name} (${id})`);
    });
    return;
  }

  // Controller sends a command to an agent.
  if (req.method === 'POST' && (m = pathname.match(/^\/api\/agents\/([^/]+)\/commands$/))) {
    const id = decodeURIComponent(m[1]);
    const agent = agents.get(id);
    if (!agent) return sendJson(res, 404, { error: `agent '${id}' not connected` });

    let body;
    try {
      body = await readBody(req);
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
    if (!body.action || typeof body.action !== 'string') {
      return sendJson(res, 400, { error: "missing 'action'" });
    }

    const commandId = randomUUID();
    const command = { commandId, action: body.action, params: body.params || {}, issuedAt: Date.now() };
    pushEvent(agent, 'command', command);
    console.log(`[>] ${agent.name} <- ${command.action} (${commandId})`);

    const wait = url.searchParams.get('wait') === '1' || body.wait === true;
    if (!wait) {
      return sendJson(res, 202, { commandId, status: 'dispatched' });
    }

    const timer = setTimeout(() => {
      pendingResults.delete(commandId);
      sendJson(res, 504, { commandId, error: 'timed out waiting for agent result' });
    }, RESULT_TIMEOUT_MS);
    pendingResults.set(commandId, { res, timer });
    return;
  }

  // Agent reports a command result.
  if (req.method === 'POST' && (m = pathname.match(/^\/api\/agents\/([^/]+)\/results$/))) {
    const id = decodeURIComponent(m[1]);
    const agent = agents.get(id);
    if (agent) agent.lastSeen = Date.now();

    let body;
    try {
      body = await readBody(req);
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
    const { commandId } = body;
    if (!commandId) return sendJson(res, 400, { error: "missing 'commandId'" });
    console.log(`[<] ${id} -> result for ${commandId} ok=${body.ok}`);

    const pending = pendingResults.get(commandId);
    if (pending) {
      clearTimeout(pending.timer);
      pendingResults.delete(commandId);
      sendJson(pending.res, 200, {
        commandId,
        ok: body.ok !== false,
        result: body.result ?? null,
        error: body.error ?? null,
      });
    }
    return sendJson(res, 200, { received: true });
  }

  sendJson(res, 404, { error: 'not found' });
});

server.listen(PORT, () => {
  console.log(`remote-control server listening on http://localhost:${PORT}`);
  if (TOKEN) console.log('auth: token required (REMOTE_CONTROL_TOKEN set)');
  else console.log('auth: disabled (set REMOTE_CONTROL_TOKEN to require a token)');
});
