import { describe, expect, it } from "vitest";
import { templeRepository } from "./repository";

describe("templeRepository", () => {
  it("never exposes seeded operational schedules as verified", async () => {
    const temples = await templeRepository.listTemples();
    expect(temples.length).toBeGreaterThan(0);
    for (const temple of temples) {
      expect(temple.status).toBe("schedule-unverified");
      expect(temple.schedule).toHaveLength(0);
      expect(temple.lastVerifiedAt).toBeNull();
    }
  });
  it("returns null for unknown temple slugs", async () => {
    await expect(
      templeRepository.getTemple("not-a-temple"),
    ).resolves.toBeNull();
  });
});
