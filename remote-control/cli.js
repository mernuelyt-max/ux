#!/usr/bin/env node
/**
 * Remote-control CLI controller.
 *
 * Sends a command to a connected agent through the relay server and prints
 * the agent's result.
 *
 * Usage:
 *   node cli.js list
 *   node cli.js send <agentId> <action> [jsonParams]
 *
 * Examples:
 *   node cli.js list
 *   node cli.js send tv-1 ping
 *   node cli.js send tv-1 state.set '{"volume":70}'
 *   node cli.js send tv-1 system.info
 *
 * Env:
 *   RC_SERVER             relay base URL (default http://localhost:8787)
 *   REMOTE_CONTROL_TOKEN  shared secret if the server requires one
 */
const SERVER = (process.env.RC_SERVER || 'http://localhost:8787').replace(/\/$/, '');
const TOKEN = process.env.REMOTE_CONTROL_TOKEN || null;

function headers(extra = {}) {
  const h = { ...extra };
  if (TOKEN) h.Authorization = `Bearer ${TOKEN}`;
  return h;
}

async function list() {
  const res = await fetch(`${SERVER}/api/agents`, { headers: headers() });
  const body = await res.json();
  if (!body.agents?.length) {
    console.log('No agents connected.');
    return;
  }
  console.log('Connected agents:');
  for (const a of body.agents) {
    console.log(`  ${a.id}  [${a.type}]  ${a.name}`);
  }
}

async function send(agentId, action, paramsJson) {
  if (!agentId || !action) {
    console.error('usage: cli.js send <agentId> <action> [jsonParams]');
    process.exit(1);
  }
  let params = {};
  if (paramsJson) {
    try {
      params = JSON.parse(paramsJson);
    } catch {
      console.error('params must be valid JSON');
      process.exit(1);
    }
  }
  const res = await fetch(
    `${SERVER}/api/agents/${encodeURIComponent(agentId)}/commands?wait=1`,
    {
      method: 'POST',
      headers: headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ action, params }),
    },
  );
  const body = await res.json();
  if (!res.ok) {
    console.error(`error (${res.status}):`, body.error || body);
    process.exit(1);
  }
  if (body.ok) {
    console.log(JSON.stringify(body.result, null, 2));
  } else {
    console.error('agent error:', body.error);
    process.exit(1);
  }
}

const [cmd, ...rest] = process.argv.slice(2);
try {
  if (cmd === 'list') await list();
  else if (cmd === 'send') await send(rest[0], rest[1], rest[2]);
  else {
    console.log('commands:');
    console.log('  list                                 list connected agents');
    console.log('  send <agentId> <action> [jsonParams] send a command and print the result');
  }
} catch (e) {
  console.error('request failed:', e.message);
  console.error(`(is the server running at ${SERVER}?)`);
  process.exit(1);
}
