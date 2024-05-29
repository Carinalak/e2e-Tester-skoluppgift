describe('Movie search and sort', () => {
  
  beforeEach(() => {
    // Assign
    cy.visit('http://localhost:5173');
  });


  it('searches for movies and sorts results', () => {

    // Act
    cy.get("input#searchText").type("ghost");
    cy.get("button#search").click();

    //Assert
    cy.get('#movie-container')
    .should("have.length", 1)
    //.should("have.text", "ghost");
  });

  it('Should response when input is empty', () => {
    // Assign
  

    // Act
    cy.get("input#searchText").type(" ")
    cy.get("button#search").click();

    //Assert
    cy.get('#movie-container').should('contain', 'Inga sökresultat att visa');
   
  });
  
  it('Should response when search is not found', () => {
    // Assign
  

    // Act
    cy.get("input#searchText").type("gfadfg")
    cy.get("button#search").click();

    //Assert
    cy.get('#movie-container').should('contain', 'Inga sökresultat att visa');
   
  });

/*
  it('', () => {
    
    // Assign
    cy.intercept("http://crazythingsapi.com", [{ imdbID: "1", Title: "C Movie", Year: "2011", Type: "movie", Poster: "url1" },
    { imdbID: "3", Title: "B Movie", Year: "2013", Type: "movie", Poster: "url3" }]);

    // Act
    cy.get("button#search").click();

    //Assert
    cy.get('#movie-container')
    .should("have.length", 2)
   
  });
  */

});