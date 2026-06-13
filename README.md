# Kite Security Command Center

> Security and risk command center for Kite agent wallets and contracts — scan wallets, preview signatures, inspect contracts, and coordinate incident response.

[![CI](https://github.com/gnanam1990/kite-security-command-center/actions/workflows/ci.yml/badge.svg)](https://github.com/gnanam1990/kite-security-command-center/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Overview

Kite Security Command Center is a pnpm monorepo that surfaces security and risk
tooling for agent wallets and contracts on the Kite network. It pairs a Vite +
React frontend with a Hono API that performs a real, live read of the Kite
mainnet (block height and gas) over JSON-RPC via `viem`, alongside a pure
TypeScript core for address/transaction validation and approval policies. It is
built for operators and developers who need to inspect wallet behavior and gate
risky actions behind explicit approval.

## Features

- **Wallet Risk Scanner** — record and review wallet scan items, including EVM
  address validation on submission.
- **SafeSign Preview** — preview proposed transactions before signing (preview module).
- **Contract Interaction Analyzer** — surface contracts and interactions for review (preview module).
- **Incident Response Checklist** — guided response flow for compromised or buggy agent wallets.
- **Emergency Revoke / Freeze Center** — approval-gated revoke and freeze actions.
- **Live Kite mainnet read** — `GET /api/chain/stats` returns live block height and
  gas over JSON-RPC (`viem`), plus network stats from the KiteScan explorer, with
  graceful fallback to preview data if the upstream infra is unreachable.
- **Approval-gated actions** — fund-moving or risky actions require explicit
  approval; client-submitted claims are not trusted.

## Tech stack

- **Frontend:** Vite, React, TypeScript, Tailwind CSS, lucide-react
- **API:** Hono (`@hono/node-server`, with the Vercel Node adapter for deploy)
- **Chain reads:** viem (Kite mainnet/testnet public client)
- **Tooling:** pnpm workspaces, TypeScript, Vitest, esbuild
- **Hosting:** Vercel (Build Output API)

## Architecture

This is a pnpm workspace with packages under `packages/*`:

- `packages/core` — pure TypeScript domain logic: address/tx validation, risk
  policies, activity logs, approval rules. No runtime dependencies.
- `packages/connectors` — Kite chain constants, KiteScan explorer helper, and the
  `viem` public client (`createKitePublicClient`).
- `packages/api` — the Hono application, routes, and chain-read logic; also runs
  standalone as a local dev server.
- `packages/worker` — background/run-simulation runtime, invoked by the API at
  `POST /api/runs/simulate`.
- `packages/web` — the Vite + React single-page app.

`server/index.ts` mounts the shared Hono app under `/api` and is bundled into a
single Vercel Serverless Function (Node runtime) for production.

## Getting started

### Prerequisites

- Node.js 22+
- pnpm 9.15.9 (pinned via `packageManager`)

### Installation

```bash
pnpm install
```

### Configuration

Copy `.env.example` and adjust as needed. The variables the project reads or
references:

| Variable | Purpose |
| --- | --- |
| `KITE_NETWORK` | Selected network (`mainnet` / `testnet`). |
| `KITE_MAINNET_RPC` | Kite mainnet JSON-RPC endpoint. |
| `KITE_MAINNET_API` | KiteScan mainnet explorer API base. |
| `KITE_TESTNET_RPC` | Kite testnet JSON-RPC endpoint. |
| `KITE_TESTNET_API` | KiteScan testnet explorer API base. |
| `API_PORT` | Local API server port (default `8787`). |
| `WEB_ORIGIN` | Allowed CORS origin for the API (default `http://localhost:5173`). |
| `VITE_API_URL` | Frontend API base in local dev; ignored in production (the SPA calls same-origin `/api`). |
| `WEBHOOK_SECRET_DEMO` | Local webhook secret for the preview webhook intake. |
| `LLM_PROVIDER` | LLM provider selector; defaults to `preview`. |

Do not commit real secrets. `.env.example` ships placeholder values only.

### Running

```bash
pnpm dev
```

Runs the API and web app in parallel.

- Frontend: `http://localhost:5173`
- API: `http://localhost:8787`

```bash
curl http://localhost:8787/health        # { "ok": true, "service": "kite-security-command-center" }
curl http://localhost:8787/chain/stats   # live Kite mainnet block height + gas
```

## Usage

The API base path is `/api` (same-origin) in production and
`http://localhost:8787` in local dev.

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Service health probe. |
| GET | `/meta` | Product + module metadata. |
| GET | `/modules` | Product modules. |
| GET | `/scan` | List scan items. |
| POST | `/scan` | Create a scan item (`name`, `description`, `owner` required; `owner` must be a valid EVM address). |
| GET | `/scan/:id` | Fetch one scan item. |
| GET | `/runs` | Activity / run log. |
| POST | `/runs/simulate` | Simulate a run through the worker runtime. |
| GET | `/approvals` | Pending approvals. |
| POST | `/approvals/:id/approve` / `/deny` | Resolve an approval. |
| GET | `/chain/stats` | Live Kite mainnet block height + gas (falls back to preview if infra is down). |
| POST | `/webhooks/:triggerId` | Preview webhook intake. |

## Testing

```bash
pnpm -r typecheck                                       # typecheck all packages
pnpm -r test                                            # run all package tests (Vitest)
pnpm --filter @kite-security-command-center/web build   # production build of the web app
```

Tests cover core validation logic, API routes (including the chain and worker
routes), and worker execution. The same steps run in CI
(`.github/workflows/ci.yml`).

## Project structure

```txt
server/index.ts        Hono entry mounted at /api (bundled into a Vercel function)
packages/web/          Vite + React frontend
packages/api/          Hono API (app, routes, live chain read) + local dev server
packages/worker/       background jobs and run simulation
packages/core/         pure TypeScript domain logic
packages/connectors/   Kite constants, KiteScan helper, viem RPC client
scripts/               build helpers (e.g. Vercel build)
docs/                  proof-of-work notes and screenshot
```

## Status

Preview. The frontend, Hono API, core validation, worker runtime, and the live
Kite mainnet `chain/stats` read are real and tested. Several product modules
(SafeSign preview, contract analysis, agentic decisions, payment/fund-movement,
scoring) are PREVIEW-safe: the app degrades to bundled preview data when the live
API is unreachable, client-submitted claims are not trusted, and fund-moving or
risky actions require explicit approval. No official mainnet contract address is
invented in this repo.

Deployment is via Vercel using the Build Output API (`scripts/vercel-build.mjs`):
the built Vite SPA is served statically and `server/index.ts` is esbuild-bundled
into a self-contained Serverless Function mounted at `/api`.

## License

[MIT](LICENSE) © 2026 Gnanam (gnanam1990)
