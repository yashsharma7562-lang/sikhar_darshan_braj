import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("search API", () => {
  it("returns matched catalogue records", async () => {
    const response = await GET(
      new Request("http://localhost/api/search?q=Bihari%20Ji"),
    );
    expect(response.status).toBe(200);
    const body = (await response.json()) as { total: number };
    expect(body.total).toBeGreaterThan(0);
  });
  it("rejects invalid destinations", async () => {
    const response = await GET(
      new Request(
        "http://localhost/api/search?destination=javascript%3Aalert(1)",
      ),
    );
    expect(response.status).toBe(400);
  });
});
