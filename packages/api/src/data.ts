import { buildActivity, demoAddress, type ActivityEvent, type ApprovalRequest, type ProductItem, type ProductModule } from "@kite-security-command-center/core";

export const modules: ProductModule[] = [
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
];

export const items: ProductItem[] = [
  {
    "id": "scan_1",
    "name": "Wallet Risk Scanner",
    "description": "Analyze wallet behavior for suspicious activity and risk factors.",
    "owner": demoAddress,
    "status": "active",
    "risk": "medium",
    "moduleId": "module_1",
    "budgetKite": "5",
    "createdAt": "2026-06-06T02:00:00.000Z"
  },
  {
    "id": "scan_2",
    "name": "SafeSign Preview",
    "description": "Decode proposed transactions before users sign.",
    "owner": demoAddress,
    "status": "active",
    "risk": "high",
    "moduleId": "module_2",
    "budgetKite": "50",
    "createdAt": "2026-06-06T02:00:00.000Z"
  },
  {
    "id": "scan_3",
    "name": "Contract Interaction Analyzer",
    "description": "Analyze contracts and interactions for known risks.",
    "owner": demoAddress,
    "status": "draft",
    "risk": "low",
    "moduleId": "module_3",
    "budgetKite": "0",
    "createdAt": "2026-06-06T02:00:00.000Z"
  }
];

export const activity: ActivityEvent[] = [
  buildActivity(items[0], "KiteSecurity Command Center preview event accepted", new Date("2026-06-06T02:10:00.000Z")),
  buildActivity(items[1], "Risky Kite action queued for explicit approval", new Date("2026-06-06T02:20:00.000Z")),
];

export const approvals: ApprovalRequest[] = [
  {
    id: "approval_1",
    itemId: items[1].id,
    status: "pending",
    reason: "High-risk or fund-moving Kite action requires explicit approval.",
    risk: "high",
    requestedAt: "2026-06-06T02:20:00.000Z",
  },
];

export function createItem(input: Pick<ProductItem, "name" | "description" | "owner">) {
  const item: ProductItem = {
    id: `scan_${Date.now()}`,
    name: input.name,
    description: input.description,
    owner: input.owner,
    status: "draft",
    risk: "low",
    moduleId: modules[0].id,
    budgetKite: "0",
    createdAt: new Date().toISOString(),
  };
  items.unshift(item);
  return item;
}
