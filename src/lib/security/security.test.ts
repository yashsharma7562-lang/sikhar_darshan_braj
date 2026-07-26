import { describe, expect, it } from "vitest";
import { validateApiMutation } from "./request-security";
import { securityHeaders } from "./security-headers";
describe("request security", () => {
  it("rejects cross-origin mutations", () => {
    expect(
      validateApiMutation(
        "POST",
        "application/json",
        "20",
        "https://attacker.example",
        "https://shikhardarshan.com",
        null,
      ),
    ).toMatchObject({ allowed: false, status: 403 });
  });
  it("rejects oversized and non-JSON mutations", () => {
    expect(
      validateApiMutation(
        "POST",
        "application/json",
        "1048577",
        null,
        "https://shikhardarshan.com",
        null,
      ),
    ).toMatchObject({ status: 413 });
    expect(
      validateApiMutation(
        "PATCH",
        "text/plain",
        "20",
        null,
        "https://shikhardarshan.com",
        null,
      ),
    ).toMatchObject({ status: 415 });
  });
  it("permits reads and valid same-origin JSON", () => {
    expect(
      validateApiMutation(
        "GET",
        null,
        null,
        "https://attacker.example",
        "https://shikhardarshan.com",
        null,
      ),
    ).toEqual({ allowed: true });
    expect(
      validateApiMutation(
        "POST",
        "application/json; charset=utf-8",
        "20",
        "https://shikhardarshan.com",
        "https://shikhardarshan.com",
        null,
      ),
    ).toEqual({ allowed: true });
  });
  it("removes unsafe eval from the production CSP", () => {
    const productionCsp = securityHeaders(true).find(
      (header) => header.key === "Content-Security-Policy",
    )?.value;
    const developmentCsp = securityHeaders(false).find(
      (header) => header.key === "Content-Security-Policy",
    )?.value;
    expect(productionCsp).not.toContain("'unsafe-eval'");
    expect(developmentCsp).toContain("'unsafe-eval'");
  });
});
