import type { IncidentReport } from "./types";
export interface TripOperationsRepository {
  reportIncident(
    report: IncidentReport,
    actorId: string,
  ): Promise<{ incidentId: string }>;
  requestDriverReplacement(
    tripId: string,
    actorId: string,
    reason: string,
  ): Promise<{ operationId: string }>;
  verifyStartOtp(tripId: string, otp: string, actorId: string): Promise<void>;
}
export class OperationsUnavailableError extends Error {
  constructor() {
    super("Authenticated trip operations are not configured.");
    this.name = "OperationsUnavailableError";
  }
}
export class UnavailableTripOperationsRepository implements TripOperationsRepository {
  async reportIncident(
    report: IncidentReport,
    actorId: string,
  ): Promise<{ incidentId: string }> {
    void report;
    void actorId;
    throw new OperationsUnavailableError();
  }
  async requestDriverReplacement(
    tripId: string,
    actorId: string,
    reason: string,
  ): Promise<{ operationId: string }> {
    void tripId;
    void actorId;
    void reason;
    throw new OperationsUnavailableError();
  }
  async verifyStartOtp(
    tripId: string,
    otp: string,
    actorId: string,
  ): Promise<void> {
    void tripId;
    void otp;
    void actorId;
    throw new OperationsUnavailableError();
  }
}
export const tripOperationsRepository: TripOperationsRepository =
  new UnavailableTripOperationsRepository();
