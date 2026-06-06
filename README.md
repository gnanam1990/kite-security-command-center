# KiteSecurity Command Center

Security and risk command center for Kite agent wallets and contracts.

This repository is built from the staged OpenCode prompt pack in `prompts/`.

## Product promise

Scan Kite agent wallets, preview signatures, inspect contracts, and coordinate incident response.

## Core modules

- **Wallet Risk Scanner** — Analyze wallet behavior for suspicious activity and risk factors.
- **SafeSign Preview** — Decode proposed transactions before users sign.
- **Contract Interaction Analyzer** — Analyze contracts and interactions for known risks.
- **Incident Response Checklist** — Guided response for compromised or buggy agent wallets.
- **Emergency Revoke / Freeze Center** — Pause agents, revoke sessions, and create revoke actions.

## What is real

- Vite + React + TypeScript frontend with the required product routes.
- Hono API with health, scans, runs, approvals, webhook, and route metadata endpoints.
- Pure TypeScript core package for Kite-safe validation, risk policies, activity logs, and approval rules.
- Worker runtime simulation for queued scan activity.
- Kite constants, KiteScan helper, cached fetch, and RPC helper in `packages/connectors`.
- Tests for core validation, API routes, and worker execution.

## What is PREVIEW

- Agentic decisions, payment verification, fund movement, trading, security, and scoring behavior are preview-safe unless explicitly verified by backend code.
- Client-submitted payment claims are not trusted.
- Fund-moving or risky actions require explicit approval.
- No official mainnet contract address is invented in this repo.

## Structure

```txt
packages/web/          Vite + React 19 frontend
packages/api/          Hono API server
packages/worker/       background jobs and runtime simulation
packages/core/         pure TypeScript domain logic
packages/connectors/   KiteScan, RPC, webhook, LLM, wallet/API connectors
```

## Run locally

```bash
pnpm install
pnpm dev
```

Frontend: `http://localhost:5173`

API: `http://localhost:8787`

Health check:

```bash
curl http://localhost:8787/health
```

Expected:

```json
{ "ok": true, "service": "kite-security-command-center" }
```

## Verification

```bash
pnpm -r typecheck
pnpm -r lint
pnpm -r test
pnpm --filter @kite-security-command-center/web build
grep -rn "Instrument\|font-instrument\|font-serif" packages/web/src packages/web/index.html
grep -rn "violet\|indigo\|cyan\|#7C3AED\|#4F46E5\|#06B6D4" packages/web/src
```

The two grep commands should return zero hits.
