describe("Login Page test", () => {
  const user = {
    username: "SomeUser_name",
    name: "SomeName",
    password: "TopSecret1234!",
    favouriteFruit: "some fruit",
    favouriteMovie: "The Room",
    favouriteNumber: "BN<1234>",
  };

  beforeEach(() => {
    cy.visit("http://localhost:8080/");
    cy.get('input[placeholder="Enter Username"]').as("userNameField");
    cy.get('input[placeholder="password"]').as("passwordField");
    cy.get("button").contains('LOGIN').as("loginButton");
  });

  it("should display proper header", () => {
    cy.contains("qa.code-quiz.dev").should("be.visible");
  });

  it("should display proper input fields for username", () => {
    cy.get("@userNameField").should("be.visible");
  });

  it("should display proper input field for password", () => {
    cy.get("@passwordField").should("be.visible");
  });

  it("should display the login button", () => {
    cy.get("@loginButton").should("be.visible");
  });

  it("should allow login with valid credentials", () => {
    cy.get("@userNameField").type(user.username);
    cy.get("@passwordField").type(user.password);
    cy.get("@loginButton").click();

    cy.contains(user.name).should("be.visible");
    cy.contains(user.favouriteFruit).should("be.visible");
    cy.contains(user.favouriteMovie).should("be.visible");
    cy.contains(user.favouriteNumber).should("be.visible");

    cy.contains("LOGOUT").should("be.visible").click();

    cy.contains("qa.code-quiz.dev").should("be.visible");
  });
});
