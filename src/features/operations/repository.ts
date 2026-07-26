import "server-only";
import type { AuditEntry, SafetyEscalation, SupportTicket } from "./types";
export interface OperationsRepository {
  createTicket(
    value: Omit<SupportTicket, "id" | "status" | "assignedTo" | "createdAt">,
  ): Promise<SupportTicket>;
  updateTicket(actorId: string, value: unknown): Promise<SupportTicket>;
  createSafetyEscalation(
    value: Omit<SafetyEscalation, "id" | "status" | "assignedTo" | "createdAt">,
  ): Promise<SafetyEscalation>;
  updateSafetyEscalation(
    actorId: string,
    value: unknown,
  ): Promise<SafetyEscalation>;
  performAdminAction(
    value: Omit<AuditEntry, "id" | "occurredAt">,
  ): Promise<AuditEntry>;
}
export class OperationsPersistenceUnavailableError extends Error {
  constructor() {
    super("Operations persistence is not configured.");
    this.name = "OperationsPersistenceUnavailableError";
  }
}
class UnavailableOperationsRepository implements OperationsRepository {
  async createTicket(): Promise<SupportTicket> {
    throw new OperationsPersistenceUnavailableError();
  }
  async updateTicket(): Promise<SupportTicket> {
    throw new OperationsPersistenceUnavailableError();
  }
  async createSafetyEscalation(): Promise<SafetyEscalation> {
    throw new OperationsPersistenceUnavailableError();
  }
  async updateSafetyEscalation(): Promise<SafetyEscalation> {
    throw new OperationsPersistenceUnavailableError();
  }
  async performAdminAction(): Promise<AuditEntry> {
    throw new OperationsPersistenceUnavailableError();
  }
}
export const operationsRepository: OperationsRepository =
  new UnavailableOperationsRepository();
