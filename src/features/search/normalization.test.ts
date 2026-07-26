import { describe, expect, it } from "vitest";
import { expandSearchTerms, normalizeSearchText } from "./normalization";
import { searchRepository } from "./repository";

describe("search normalization", () => {
  it("normalizes whitespace and punctuation", () => {
    expect(normalizeSearchText("  Braj—Yatra! ")).toBe("braj-yatra");
  });
  it("expands familiar spellings and Hindi terms", () => {
    expect(expandSearchTerms("Goverdhan")).toContain("govardhan");
    expect(expandSearchTerms("ब्रज")).toContain("braj");
  });
  it("discovers Banke Bihari through Bihari Ji", async () => {
    const result = await searchRepository.search("Bihari Ji", {
      categories: [],
      destination: null,
      verificationOnly: false,
    });
    expect(result.hits[0]?.document.title).toBe("Banke Bihari Temple");
  });
  it("supports one-character typo tolerance", async () => {
    const result = await searchRepository.search("Mathrua", {
      categories: [],
      destination: null,
      verificationOnly: false,
    });
    expect(result.hits.some((hit) => hit.document.title === "Mathura")).toBe(
      true,
    );
  });
});
