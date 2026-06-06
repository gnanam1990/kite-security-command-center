# KiteSecurity Command Center — Project Prompt Pack

## One-line summary
Security and risk command center for Kite agent wallets and contracts.

## Product positioning
Scan wallets, preview risky signatures, analyze contract interactions, and guide incident response for agent systems on Kite.

## Why this exists
Autonomous agents introduce new risks: runaway spending, malicious contracts, risky approvals, abnormal transactions, and compromised wallets. This becomes the trust/safety layer.

## Repository name
`kite-security-command-center`

## Header subtitle
`SECURITY`

## Core routes
- `/`
- `/scan`
- `/wallet/:address`
- `/safesign`
- `/contracts/:address`
- `/incidents`
- `/revoke`
- `/settings`


## Core modules
1. **Wallet Risk Scanner** — Analyze wallet behavior for suspicious activity and risk factors.
2. **SafeSign Preview** — Decode proposed transactions before users sign.
3. **Contract Interaction Analyzer** — Analyze contracts and interactions for known risks.
4. **Incident Response Checklist** — Guided response for compromised/buggy agent wallets.
5. **Emergency Revoke / Freeze Center** — Central UI for pausing agents, revoking sessions, and creating revoke actions.

## API surface
- `POST /scan/wallet`
- `GET /scan/wallet/:address`
- `POST /safesign/preview`
- `GET /contracts/:address`
- `POST /incidents`
- `PATCH /incidents/:id`
- `POST /emergency-actions`


## Safety requirements
- Security scores are ESTIMATED, not guarantees
- Never say safe/unsafe absolutely
- No private keys
- Destructive actions require explicit confirmation and preview


## Build philosophy
This is not a small demo. Build it as a serious productivity platform for Kite AI agents. Every UI screen must move the user toward a real workflow, decision, payment, approval, or operational outcome.
