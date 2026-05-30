#!/usr/bin/env node
/**
 * Remote-control agent — runs on the device/app you want to control.
 *
 * It opens a persistent SSE stream to the relay server, receives commands,
 * runs the matching handler, and posts the result back. Handlers are
 * intentionally small and safe; add your own to expose real device/app
 * capabilities (GPIO, media playback, app state, etc.).
 *
 * Uses only Node.js built-ins (global fetch, available in Node 18+).
 *
 * Env / args:
 *   --server <url>   relay base URL          (default http://localhost:8787)
 *   --id <id>        stable agent id         (default random)
 *   --name <name>    human-friendly name     (default hostname)
 *   --type <type>    device/app type label   (default "node")
 *   --token <token>  shared secret (or REMOTE_CONTROL_TOKEN env)
 */
import os from 'node:os';
import { randomUUID } from 'node:crypto';

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) out[argv[i].slice(2)] = argv[i + 1];
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
const SERVER = (args.server || 'http://localhost:8787').replace(/\/$/, '');
const ID = args.id || `agent-${randomUUID().slice(0, 8)}`;
const NAME = args.name || os.hostname();
const TYPE = args.type || 'node';
const TOKEN = args.token || process.env.REMOTE_CONTROL_TOKEN || null;

// ---------------------------------------------------------------------------
// Device/app state + command handlers.
// Replace or extend these to control real hardware or an application.
// ---------------------------------------------------------------------------
const state = {
  power: 'on',
  volume: 50,
  channel: 1,
  brightness: 80,
};

const handlers = {
  ping: () => ({ pong: true, at: Date.now() }),

  echo: (p) => ({ echo: p }),

  'system.info': () => ({
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    uptimeSec: Math.round(os.uptime()),
    loadAvg: os.loadavg(),
    memFreeMB: Math.round(os.freemem() / 1e6),
    memTotalMB: Math.round(os.totalmem() / 1e6),
  }),

  'state.get': () => ({ state: { ...state } }),

  'state.set': (p) => {
    const allowed = Object.keys(state);
    const changed = {};
    for (const [k, v] of Object.entries(p || {})) {
      if (!allowed.includes(k)) throw new Error(`unknown property '${k}'`);
      state[k] = v;
      changed[k] = v;
    }
    return { changed, state: { ...state } };
  },

  'power.toggle': () => {
    state.power = state.power === 'on' ? 'off' : 'on';
    return { power: state.power };
  },

  'volume.adjust': (p) => {
    const delta = Number(p?.delta ?? 0);
    state.volume = Math.max(0, Math.min(100, state.volume + delta));
    return { volume: state.volume };
  },

  notify: (p) => {
    const msg = p?.message ?? '';
    console.log(`\n🔔 NOTIFY: ${msg}\n`);
    return { shown: true, message: msg };
  },
};

async function postResult(commandId, ok, result, error) {
  const headers = { 'Content-Type': 'application/json' };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  try {
    await fetch(`${SERVER}/api/agents/${encodeURIComponent(ID)}/results`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ commandId, ok, result, error }),
    });
  } catch (e) {
    console.error('failed to post result:', e.message);
  }
}

async function handleCommand(cmd) {
  const handler = handlers[cmd.action];
  console.log(`[cmd] ${cmd.action} ${JSON.stringify(cmd.params || {})}`);
  if (!handler) {
    return postResult(cmd.commandId, false, null, `unknown action '${cmd.action}'`);
  }
  try {
    const result = await handler(cmd.params || {});
    await postResult(cmd.commandId, true, result, null);
  } catch (e) {
    await postResult(cmd.commandId, false, null, e.message);
  }
}

/** Parse an SSE stream and dispatch `command` events. */
async function consumeStream(reader, decoder) {
  let buffer = '';
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let idx;
    while ((idx = buffer.indexOf('\n\n')) !== -1) {
      const rawEvent = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 2);
      let event = 'message';
      let data = '';
      for (const line of rawEvent.split('\n')) {
        if (line.startsWith('event:')) event = line.slice(6).trim();
        else if (line.startsWith('data:')) data += line.slice(5).trim();
        // lines starting with ':' are comments / keep-alives — ignored.
      }
      if (!data) continue;
      let payload;
      try {
        payload = JSON.parse(data);
      } catch {
        continue;
      }
      if (event === 'ready') console.log(`[ok] registered with server (${payload.id})`);
      else if (event === 'command') handleCommand(payload);
    }
  }
}

async function connect() {
  const qs = new URLSearchParams({ name: NAME, type: TYPE });
  if (TOKEN) qs.set('token', TOKEN);
  const url = `${SERVER}/api/agents/${encodeURIComponent(ID)}/stream?${qs}`;
  console.log(`connecting to ${SERVER} as "${NAME}" (id=${ID}, type=${TYPE})`);

  try {
    const res = await fetch(url, { headers: { Accept: 'text/event-stream' } });
    if (!res.ok || !res.body) throw new Error(`server responded ${res.status}`);
    await consumeStream(res.body.getReader(), new TextDecoder());
  } catch (e) {
    console.error('connection error:', e.message);
  }
  console.log('disconnected — reconnecting in 3s…');
  setTimeout(connect, 3000);
}

console.log('available actions:', Object.keys(handlers).join(', '));
connect();
