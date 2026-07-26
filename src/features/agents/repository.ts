import "server-only";
import type { AgentLead, AgentPackageDraft, GroupQuotation } from "./types";
export interface AgentRepository {
  createLead(value: Omit<AgentLead, "id" | "status">): Promise<AgentLead>;
  createQuote(organisationId: string, value: unknown): Promise<GroupQuotation>;
  createPackage(
    organisationId: string,
    value: unknown,
  ): Promise<AgentPackageDraft>;
}
export class AgentPersistenceUnavailableError extends Error {
  constructor() {
    super("Travel-agent persistence is not configured.");
    this.name = "AgentPersistenceUnavailableError";
  }
}
class UnavailableAgentRepository implements AgentRepository {
  async createLead(): Promise<AgentLead> {
    throw new AgentPersistenceUnavailableError();
  }
  async createQuote(): Promise<GroupQuotation> {
    throw new AgentPersistenceUnavailableError();
  }
  async createPackage(): Promise<AgentPackageDraft> {
    throw new AgentPersistenceUnavailableError();
  }
}
export const agentRepository: AgentRepository =
  new UnavailableAgentRepository();
