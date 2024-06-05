import { fixture, expect } from "@open-wc/testing";
import "../src/components/FxNeumorphixObservable";

describe("FxNeumorphixObservable", () => {
  it("should apply neumorphix styles when the attribute is set", async () => {
    const element = await fixture(
      "<fx-neu-observable fx-enable-neu></fx-neu-observable>"
    );
    expect(element).to.have.attribute("fx-enable-neu");
    expect(element.style.boxShadow).to.not.equal("none");
  });

  
  it("should not apply neumorphix styles when the attribute is not set", async () => {
    const element = await fixture("<fx-neu-observable></fx-neu-observable>");
    expect(element).to.not.have.attribute("fx-enable-neu");
    expect(element.style.boxShadow).to.equal("none");
  });
});
