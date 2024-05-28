describe('Movie search and sort', () => {
  it('searches for movies and sorts results', () => {
    // Assign
    cy.visit("http://localhost:5173");

    // Act
    cy.get("input#searchText").type("ghost");
    cy.get("button#search").click();

    //Assert
    cy.get('#movie-container')
    .should("have.length", 1)
    //.should("have.text", "ghost");
  });
  

});

