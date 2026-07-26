import { describe, expect, it } from "vitest";
import { POST } from "./route";

describe("temple correction intake", () => {
  it("rejects invalid reports", async () => {
    const response = await POST(
      new Request("http://localhost/api/temples/corrections", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          templeSlug: "bad slug",
          field: "schedule",
          correction: "short",
          sourceUrl: "",
        }),
      }),
    );
    expect(response.status).toBe(400);
  });
  it("does not claim to persist reports without configured storage", async () => {
    const response = await POST(
      new Request("http://localhost/api/temples/corrections", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "sec-fetch-site": "same-origin",
        },
        body: JSON.stringify({
          templeSlug: "banke-bihari-temple",
          field: "schedule",
          correction: "This is a sufficiently detailed correction report.",
          sourceUrl: "",
        }),
      }),
    );
    expect(response.status).toBe(503);
    const body = (await response.json()) as { message: string };
    expect(body.message).toContain("No report was saved");
  });
});
