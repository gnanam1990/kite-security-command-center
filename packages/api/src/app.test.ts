import { describe, expect, it } from "vitest";
import { app } from "./app.js";

describe("kite-security-command-center API", () => {
  it("returns health", async () => {
    const response = await app.request("/health");
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true, service: "kite-security-command-center" });
  });

  it("lists primary scans", async () => {
    const response = await app.request("/scan");
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.items.length).toBeGreaterThan(0);
  });

  it("lists activity and approvals", async () => {
    const runs = await app.request("/runs");
    const approvals = await app.request("/approvals");
    expect(runs.status).toBe(200);
    expect(approvals.status).toBe(200);
  });
});
