import { describe, expect, it } from "vitest";
import {
  canTransitionSafety,
  canTransitionTicket,
  requiresImmediateEscalation,
} from "./workflow";
describe("staff operations workflows", () => {
  it("prevents tickets from skipping active handling", () => {
    expect(canTransitionTicket("open", "resolved")).toBe(false);
    expect(canTransitionTicket("open", "in-progress")).toBe(true);
  });
  it("allows a resolved ticket to be reopened", () => {
    expect(canTransitionTicket("resolved", "in-progress")).toBe(true);
  });
  it("requires safety acknowledgement before response", () => {
    expect(canTransitionSafety("reported", "responding")).toBe(false);
    expect(canTransitionSafety("reported", "acknowledged")).toBe(true);
  });
  it("allows a stabilised incident to return to response", () => {
    expect(canTransitionSafety("stabilised", "responding")).toBe(true);
  });
  it("marks only critical incidents for immediate escalation", () => {
    expect(requiresImmediateEscalation("critical")).toBe(true);
    expect(requiresImmediateEscalation("high")).toBe(false);
  });
});
