import type { SavedItinerary } from "./types";
export interface ItineraryAssistant {
  improve(itinerary: SavedItinerary, request: string): Promise<SavedItinerary>;
}
export class ItineraryAssistantUnavailableError extends Error {
  constructor() {
    super("AI itinerary assistance is not configured.");
    this.name = "ItineraryAssistantUnavailableError";
  }
}
class UnavailableAssistant implements ItineraryAssistant {
  async improve(): Promise<SavedItinerary> {
    throw new ItineraryAssistantUnavailableError();
  }
}
export const itineraryAssistant: ItineraryAssistant =
  new UnavailableAssistant();
