import { describe, expect, it } from "vitest";
import { POST } from "./route";
const valid = {
  propertyId: "property-1",
  roomTypeId: "room-1",
  checkIn: "2027-01-10",
  checkOut: "2027-01-12",
  rooms: 1,
  idempotencyKey: "123e4567-e89b-42d3-a456-426614174000",
};
describe("stay reservation API", () => {
  it("rejects reversed dates", async () => {
    const response = await POST(
      new Request("http://localhost/api/stays/reservations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...valid, checkOut: "2027-01-09" }),
      }),
    );
    expect(response.status).toBe(400);
  });
  it("fails closed when transactional inventory is unavailable", async () => {
    const response = await POST(
      new Request("http://localhost/api/stays/reservations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(valid),
      }),
    );
    expect(response.status).toBe(503);
    const body = (await response.json()) as { message: string };
    expect(body.message).toContain("No room was held");
  });
});
