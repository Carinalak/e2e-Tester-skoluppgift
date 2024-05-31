describe("Movie search and sort", () => {

  // Assign
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("searches for movies and displays results", () => {

    // Act
    cy.get("input#searchText").type("ghost");
    cy.get("button#search").click();

    //Assert
    cy.get("#movie-container")
    .should("have.length.greaterThan", 0)
  });

});

