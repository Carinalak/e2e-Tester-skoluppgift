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


  it('should sort movies correctly after searching', () => {
    // Assign
    cy.visit("http://localhost:5173");

    // Act
    cy.get("input#searchText").type("ghost");
    cy.get("button#search").click();
    
    // Assert - ascending order
    cy.get('#movie-container').then(titles => {
      const sortedTitles = [...titles]
        .map(el => el.innerText)
        .sort();
      expect([...titles]
        .map(el => el.innerText)).to.deep
        .equal(sortedTitles);
    });
    
    // Assert - descending order
    cy.get('#movie-container').then(titles => {
      const sortedTitles = [...titles]
        .map(el => el.innerText)
        .sort().reverse();
      expect([...titles]
        .map(el => el.innerText)).to.deep
        .equal(sortedTitles);
    });
    
  });

});

