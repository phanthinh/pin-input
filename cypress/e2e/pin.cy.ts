describe("<Pin />", () => {
  it("should render according to the default configuration", () => {
    cy.visit("http://localhost:3000");
    cy.get(".pin-content").find(".pin-input").should("have.length", 4);
    cy.get(".pin-content")
      .find(".pin-input[type=text]")
      .should("have.length", 4);
  });

  it("the first input should be focused when the pin is rendered", () => {
    cy.visit("http://localhost:3000");
    cy.get(".pin-content .pin-input").first().should("have.focus");
    cy.get(".pin-content .pin-input").last().should("not.have.focus");
  });

  it("should render when the pin length is changed", () => {
    cy.visit("http://localhost:3000");
    cy.get("input[name=pinLength]").clear();
    cy.get("input[name=pinLength]").type("5");
    cy.get(".pin-content")
      .find(".pin-input[type=text]")
      .should("have.length", 5);
  });

  it("should be allow input any character according to the pin regex is changed", () => {
    cy.visit("http://localhost:3000");
    cy.get("input[name=pinRegex]").clear();
    cy.get(".pin-content").find(".pin-input").first().type("a");
    cy.get(".pin-content").find(".pin-input:first").next().should("have.focus");
  });

  it("should render as mask input when the secret mode is selected", () => {
    cy.visit("http://localhost:3000");
    cy.get("input[name=secretMode]").click();
    cy.get(".pin-content")
      .find(".pin-input[type=password]")
      .should("have.length", 4);
  });

  it("should move pointer to next input when the current input is filled", () => {
    cy.visit("http://localhost:3000");

    cy.get(".pin-content .pin-input").first().type("5");
    cy.get(".pin-content .pin-input:first").next().should("have.focus");
  });

  it("should not move pointer to next input when the current input fills a wrong character", () => {
    cy.visit("http://localhost:3000");

    cy.get(".pin-content .pin-input").first().type("a");
    cy.get(".pin-content .pin-input:first").next().should("not.have.focus");
  });

  it("should render when pasting a pin incorrect", () => {
    const textToPaste = "6789";
    cy.visit("http://localhost:3000");
    cy.get(".pin-input").first().type(textToPaste);

    cy.get(".pin-content")
      .find(".pin-input[type=text]")
      .each(($input, index) => {
        cy.wrap($input)
          .invoke("val")
          .then((item) => {
            const arr = textToPaste.split("");
            expect(item).equal(arr[index]);
          });
      });
  });

  it("should render when pasting a pin correct", () => {
    const textToPaste = "9999";
    cy.visit("http://localhost:3000");
    cy.get(".pin-input").first().type(textToPaste);

    cy.get(".pin-content")
      .find(".pin-input[type=text]")
      .each(($input, index) => {
        cy.wrap($input)
          .invoke("val")
          .then((item) => {
            const arr = textToPaste.split("");
            expect(item).equal(arr[index]);
          });
      });
  });
});
