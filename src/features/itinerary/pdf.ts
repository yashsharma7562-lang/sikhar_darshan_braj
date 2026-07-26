import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { SavedItinerary } from "./types";
function clean(value: string) {
  return value.replace(/[^\x20-\x7E]/g, "").trim();
}
export async function createItineraryPdf(itinerary: SavedItinerary) {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  let page = pdf.addPage([595, 842]);
  let y = 784;
  const draw = (text: string, size = 10, isBold = false) => {
    if (y < 70) {
      page = pdf.addPage([595, 842]);
      y = 784;
    }
    page.drawText(clean(text), {
      x: 54,
      y,
      size,
      font: isBold ? bold : regular,
      color: rgb(0.15, 0.13, 0.11),
      maxWidth: 487,
    });
    y -= size + 9;
  };
  page.drawRectangle({
    x: 0,
    y: 790,
    width: 595,
    height: 52,
    color: rgb(0.05, 0.31, 0.4),
  });
  page.drawText("SHIKHAR DARSHAN BRAJ", {
    x: 54,
    y: 809,
    size: 14,
    font: bold,
    color: rgb(1, 1, 1),
  });
  y = 752;
  draw(itinerary.title, 22, true);
  draw("Planning itinerary - verify operational details before travel", 10);
  y -= 8;
  for (const day of itinerary.days) {
    draw("Day " + day.day + ": " + day.title, 14, true);
    if (!day.stops.length) draw("No stops saved.");
    for (const stop of day.stops) {
      draw("- " + stop.label, 11, true);
      if (stop.note) draw("  " + stop.note);
    }
    y -= 5;
  }
  draw("Important", 12, true);
  draw(
    "Temple timings, closures, crowds, routes, travel duration, accessibility and availability can change. Verify with official or current sources before travelling.",
  );
  const pages = pdf.getPages();
  pages.forEach((item, index) => {
    item.drawText("Page " + (index + 1) + " of " + pages.length, {
      x: 470,
      y: 28,
      size: 8,
      font: regular,
      color: rgb(0.44, 0.41, 0.37),
    });
    item.drawText("Generated itinerary - not a booking voucher", {
      x: 54,
      y: 28,
      size: 8,
      font: regular,
      color: rgb(0.44, 0.41, 0.37),
    });
  });
  return pdf.save();
}
