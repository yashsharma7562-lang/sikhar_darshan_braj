import { mkdir, writeFile } from "node:fs/promises";
import { createItineraryPdf } from "../src/features/itinerary/pdf";
const output = "output/pdf/sample-braj-itinerary.pdf";
const bytes = await createItineraryPdf({
  id: "sample-layout-check",
  ownerId: "layout-check",
  title: "Three Day Braj Planning Itinerary",
  days: [
    {
      day: 1,
      title: "Mathura and Vrindavan",
      stops: [
        {
          placeId: "sample-1",
          label: "Mathura planning stop",
          note: "Verify opening hours and travel time before departure.",
        },
        {
          placeId: "sample-2",
          label: "Vrindavan planning stop",
          note: "Confirm current access rules and crowd advisories.",
        },
      ],
    },
    {
      day: 2,
      title: "Govardhan and Radha Kund",
      stops: [
        {
          placeId: "sample-3",
          label: "Govardhan planning stop",
          note: "Route, walking effort, weather and accessibility remain unverified.",
        },
      ],
    },
    { day: 3, title: "Rest and contingency", stops: [] },
  ],
  updatedAt: "2026-07-22T00:00:00.000Z",
  routeStatus: "unresolved",
  lastSyncedAt: null,
});
await mkdir("output/pdf", { recursive: true });
await writeFile(output, bytes);
console.log(output);
