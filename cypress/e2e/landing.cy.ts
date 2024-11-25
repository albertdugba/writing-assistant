describe("Landing page", () => {
  const inputText = "Hello, this is a test input!";
  const mockOutput = "This is a mock rewritten text";
  const selectedTone = "friendly";
  const selectedLength = "longer";

  beforeEach(() => {
    cy.visit("/");
  });
  it("it should visit the landing page", () => {
    cy.get("h1").should("exist").and("contain.text", "AI Writing Assistant");
  });

  it("should type and submit form to the server", () => {
    cy.get("textarea")
      .should("be.visible")
      .and("have.attr", "placeholder", "Enter your text here...");

    const inputText = "Hello, this is a test input!";
    cy.get("textarea").type(inputText).should("have.value", inputText);

    cy.intercept("POST", "/api/chat").as("rewriteText");

    cy.get('[data-testid="rewrite-btn"]').click();

    cy.wait("@rewriteText").then((interception) => {
      expect(interception.response!.statusCode).to.equal(200);
    });
  });

  it("should type a message, select a tone, select a length, and submit the form and display output", () => {
    cy.get("textarea")
      .should("be.visible")
      .and("have.attr", "placeholder", "Enter your text here...");

    cy.get("textarea").type(inputText).should("have.value", inputText);

    cy.get('[data-testid="tone-select"]')
      .should("be.visible")
      .select(selectedTone)
      .should("have.value", selectedTone);

    cy.get('[data-testid="length-select"]')
      .should("be.visible")
      .select(selectedLength)
      .should("have.value", selectedLength);

    cy.intercept("POST", "/api/chat", {
      body: { text: mockOutput },
    }).as("rewriteText");

    cy.get('[data-testid="rewrite-btn"]').click();

    cy.wait("@rewriteText").then((interception) => {
      expect(interception.request.body).to.include({
        content: inputText,
        tone: selectedTone,
        length: selectedLength,
      });
      expect(interception.response!.statusCode).to.equal(200);
    });
  });
});
