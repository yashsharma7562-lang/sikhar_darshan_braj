import "server-only";
import type {
  VendorApplication,
  VendorMetric,
  VendorSubscription,
} from "./types";
export interface VendorRepository {
  submitApplication(
    value: Omit<VendorApplication, "id" | "status" | "submittedAt">,
  ): Promise<VendorApplication>;
  createPropertyDraft(
    organisationId: string,
    value: unknown,
  ): Promise<{ id: string; status: "draft" }>;
  updateInventory(organisationId: string, value: unknown): Promise<void>;
  updateVehicle(organisationId: string, value: unknown): Promise<void>;
  updateBooking(organisationId: string, value: unknown): Promise<void>;
  getSubscription(organisationId: string): Promise<VendorSubscription | null>;
  getMetrics(organisationId: string): Promise<readonly VendorMetric[]>;
}
export class VendorPersistenceUnavailableError extends Error {
  constructor() {
    super("Verified vendor persistence is not configured.");
    this.name = "VendorPersistenceUnavailableError";
  }
}
class UnavailableVendorRepository implements VendorRepository {
  async submitApplication(): Promise<VendorApplication> {
    throw new VendorPersistenceUnavailableError();
  }
  async createPropertyDraft(): Promise<{ id: string; status: "draft" }> {
    throw new VendorPersistenceUnavailableError();
  }
  async updateInventory(): Promise<void> {
    throw new VendorPersistenceUnavailableError();
  }
  async updateVehicle(): Promise<void> {
    throw new VendorPersistenceUnavailableError();
  }
  async updateBooking(): Promise<void> {
    throw new VendorPersistenceUnavailableError();
  }
  async getSubscription(): Promise<VendorSubscription | null> {
    throw new VendorPersistenceUnavailableError();
  }
  async getMetrics(): Promise<readonly VendorMetric[]> {
    throw new VendorPersistenceUnavailableError();
  }
}
export const vendorRepository: VendorRepository =
  new UnavailableVendorRepository();
