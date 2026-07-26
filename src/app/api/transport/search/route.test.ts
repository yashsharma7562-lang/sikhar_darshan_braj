import { describe, expect, it } from "vitest";
import { GET } from "./route";
describe("transport search API", () => {
  it("returns an honest empty verified-inventory state", async () => {
    const response = await GET(
      new Request(
        "http://localhost/api/transport/search?pickup=Mathura%20Junction&drop=Vrindavan&date=2027-01-10&time=10%3A30&passengers=2&luggage=1&seniorCitizens=1&wheelchairRequired=false&journeyType=one-way",
      ),
    );
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(
      expect.objectContaining({
        count: 0,
        availabilityState: "no-verified-inventory",
      }),
    );
  });
});
