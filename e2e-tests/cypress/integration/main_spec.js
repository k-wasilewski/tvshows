describe("Main", () => {
  it("should contain body", () => {
    cy.get("body")
      .should("be.visible");
  });
});
