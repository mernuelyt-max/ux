# Remote Control

A small, dependency-free remote-control system for Node.js. It lets a
**controller** (web UI, CLI, or any HTTP client) send commands to a remote
**device or app** through a lightweight relay **server**.

```
 ┌────────────┐   command    ┌────────────┐   SSE stream   ┌────────────┐
 │ Controller │ ───────────▶ │   Server   │ ─────────────▶ │   Agent    │
 │ (web/CLI)  │ ◀─────────── │  (relay)   │ ◀───── result ─│ (device)   │
 └────────────┘   result     └────────────┘                └────────────┘
```

- **No external dependencies** — uses only Node.js built-ins (`http`, `crypto`,
  global `fetch`). Requires Node 18+.
- **Server-Sent Events** push commands to agents; agents POST results back.
- Optional shared-secret auth via `REMOTE_CONTROL_TOKEN`.

## Components

| File               | Role                                                            |
| ------------------ | -------------------------------------------------------------- |
| `server.js`        | Relay broker + serves the web control panel.                   |
| `agent.js`         | Runs on the device/app being controlled. Executes commands.    |
| `cli.js`           | Command-line controller (`list`, `send`).                      |
| `public/index.html`| Browser-based control panel.                                   |

## Quick start

Open three terminals from the `remote-control/` directory.

**1. Start the server**

```bash
node server.js
# remote-control server listening on http://localhost:8787
```

**2. Start an agent** (the simulated device/app)

```bash
node agent.js --id tv-1 --name "Living room TV" --type tv
```

**3. Control it**

From the CLI:

```bash
node cli.js list
node cli.js send tv-1 ping
node cli.js send tv-1 system.info
node cli.js send tv-1 state.set '{"volume":70}'
node cli.js send tv-1 state.get
```

…or open the web panel at **http://localhost:8787**, click your agent, and use
the buttons / custom-command box.

## Built-in agent actions

These ship with `agent.js` as a demo "device". Add your own in the `handlers`
map to control real hardware or an application.

| Action          | Params                | Description                          |
| --------------- | --------------------- | ------------------------------------ |
| `ping`          | —                     | Liveness check.                      |
| `echo`          | any                   | Returns the params back.             |
| `system.info`   | —                     | Host platform / memory / uptime.     |
| `state.get`     | —                     | Current device state.                |
| `state.set`     | `{ key: value, … }`   | Update known state properties.       |
| `power.toggle`  | —                     | Toggle power on/off.                 |
| `volume.adjust` | `{ delta: number }`   | Change volume, clamped 0–100.        |
| `notify`        | `{ message: string }` | Show a notification on the device.   |

## Authentication

Set a shared secret on the server and all clients:

```bash
REMOTE_CONTROL_TOKEN=s3cret node server.js
REMOTE_CONTROL_TOKEN=s3cret node agent.js --id tv-1
REMOTE_CONTROL_TOKEN=s3cret node cli.js send tv-1 ping
```

For the web panel, append `?token=s3cret` to the URL. Requests without a valid
token receive `401`. Run the server behind TLS (e.g. a reverse proxy) if exposed
beyond localhost.

## HTTP API

| Method & path                          | Who        | Purpose                                  |
| -------------------------------------- | ---------- | ---------------------------------------- |
| `GET  /api/agents`                     | controller | List connected agents.                   |
| `GET  /api/agents/:id/stream`          | agent      | Open SSE command stream (registers it).  |
| `POST /api/agents/:id/commands`        | controller | Send a command. `?wait=1` to await result.|
| `POST /api/agents/:id/results`         | agent      | Report a command result.                 |

Command body: `{ "action": "state.set", "params": { "volume": 70 } }`.
With `?wait=1` the server holds the response until the agent replies (30s timeout).

## Extending

To control a real device or app, edit the `handlers` object in `agent.js`:

```js
handlers['light.on'] = async () => {
  await myGpio.write(PIN, 1);
  return { on: true };
};
```

Then: `node cli.js send <agentId> light.on`.
