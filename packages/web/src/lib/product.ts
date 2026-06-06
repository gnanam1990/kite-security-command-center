export const product = {
  name: "KiteSecurity Command Center",
  repo: "kite-security-command-center",
  subtitle: "SECURITY",
  hero: "Scan Kite agent wallets, preview signatures, inspect contracts, and coordinate incident response.",
  positioning: "Security and risk command center for Kite agent wallets and contracts.",
  entity: "scans",
  entitySingular: "scan",
  entityRoute: "/scan",
  routes: [
  "/",
  "/scan",
  "/wallet/:address",
  "/safesign",
  "/contracts/:address",
  "/incidents",
  "/revoke",
  "/settings"
],
  modules: [
  {
    "id": "module_1",
    "name": "Wallet Risk Scanner",
    "description": "Analyze wallet behavior for suspicious activity and risk factors.",
    "preview": "live"
  },
  {
    "id": "module_2",
    "name": "SafeSign Preview",
    "description": "Decode proposed transactions before users sign.",
    "preview": "preview"
  },
  {
    "id": "module_3",
    "name": "Contract Interaction Analyzer",
    "description": "Analyze contracts and interactions for known risks.",
    "preview": "preview"
  },
  {
    "id": "module_4",
    "name": "Incident Response Checklist",
    "description": "Guided response for compromised or buggy agent wallets.",
    "preview": "preview"
  },
  {
    "id": "module_5",
    "name": "Emergency Revoke / Freeze Center",
    "description": "Pause agents, revoke sessions, and create revoke actions.",
    "preview": "preview"
  }
],
};
