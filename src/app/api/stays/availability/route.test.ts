import { describe, expect, it } from "vitest";
import { GET } from "./route";
describe("stay availability API", () => {
  it("returns an honest empty inventory state", async () => {
    const response = await GET(
      new Request(
        "http://localhost/api/stays/availability?destination=vrindavan&checkIn=2027-01-10&checkOut=2027-01-12&rooms=1&adults=2&children=0",
      ),
    );
    expect(response.status).toBe(200);
    const body = (await response.json()) as {
      count: number;
      availabilityState: string;
    };
    expect(body).toEqual(
      expect.objectContaining({
        count: 0,
        availabilityState: "no-verified-inventory",
      }),
    );
  });
});
