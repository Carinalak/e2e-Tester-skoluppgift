describe('Movie search and sort', () => {

  // Assign
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('searches for movies and sorts results', () => {

    // Act
    cy.get("input#searchText").type("ghost");
    cy.get("button#search").click();

    //Assert
    cy.get('#movie-container')
    .should("have.length", 1)
  });


  it('should sort movies correctly after searching', () => {

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

