// ------------------------------------- Real API call - testing ---------------------------------------//

describe("Real API call - testing", () => {
  
  beforeEach(() => {
    // Assign
    cy.visit("http://localhost:5173");
  });
  
  it("searches for movies and displays results", () => {

    // Act
    cy.get("input#searchText").type("fame");
    cy.get("button#search").click();

    //Assert
    cy.get("#movie-container .movie h3").should("have.length.greaterThan", 0);
  });

  it("Should response when input is empty", () => {
    // Assign

    // Act
    cy.get("input#searchText").clear();
    cy.get("button#search").click();

    //Assert
    cy.get("#movie-container").should("contain", "Inga sökresultat att visa");
   
  });

  it("Should response when input contains a space", () => {
    // Assign

    // Act
    cy.get("input#searchText").type(" ")
    cy.get("button#search").click();

    //Assert
    cy.get("#movie-container").should("contain", "Inga sökresultat att visa");
   
  });


  
  it("Should response when search is not found", () => {
    // Assign
  
    // Act
    cy.get("input#searchText").type("gfadfg")
    cy.get("button#search").click();

    //Assert
    cy.get("#movie-container").should("contain", "Inga sökresultat att visa");
   
  });

  it("searches for movies and sorts results in descending order", () => {
    
    // Act
    cy.get("input#searchText").type("ghost");
    cy.get("button#search").click();

    // Assert
    cy.get("#movie-container .movie").should("have.length.greaterThan", 0);
    cy.get("button#sortDesc").click();

    cy.get("#movie-container .movie h3").should(($titles) => {
    const titles = $titles.map((i, el) => Cypress.$(el).text().trim()).get();
    const sortedTitles = [...titles].sort((b, a) => a.localeCompare(a));
    expect(titles).to.deep.equal(sortedTitles);
    });
  });

  it("searches for movies and sorts results in ascending order", () => {
    
    // Act
    cy.get("input#searchText").type("ghost");
    cy.get("button#search").click();

    cy.get("#movie-container .movie").should("have.length.greaterThan", 0)
    cy.get("button#sortAsc").click();
    cy.wait(3000);

    // Assert
    cy.get("#movie-container .movie h3").should(($titles) => {
    const titles = $titles.map((i, el) => Cypress.$(el).text().trim()).get();
    const sortedTitles = [...titles].sort((a, b) => b.localeCompare(b));
    expect(titles).to.deep.equal(sortedTitles);
    });
  });
});

// ------------------------------------- Mocked API call - testing ---------------------------------------//
describe("Mocked API call testing", () => {
  
  beforeEach(() => {
    // Assign
    cy.visit("http://localhost:5173");
  });
  
  it("searches for movies and shows results", () => {
    cy.intercept("GET", "http://omdbapi.com/*", {
      statusCode: 200,
      body: {
        Search: [
          { Title: "Ghostbusters2", Year: "2012", Type: "movie", Poster: "url2" },
          { Title: "Ghostbusters1", Year: "2011", Type: "movie", Poster: "url1" },
          { Title: "Ghostbusters3", Year: "2013", Type: "movie", Poster: "url3" },  
        ],
      },
    }).as("getMovies");
    
    // Act
    cy.get("input#searchText").type("ghost");
    cy.get("button#search").click();

    //Assert
    cy.get("#movie-container")
    .should("have.length.greaterThan", 0);
  });

  it("Should response when input is empty", () => {
    cy.intercept("GET", "http://omdbapi.com/*", {
      statusCode: 200,
      body: {
        Search: [],
      },
    }).as("getMovies");
    
    // Act
    cy.get("input#searchText").clear();
    cy.get("button#search").click();

    //Assert
    cy.get("#movie-container").should("contain", "Inga sökresultat att visa");
  });

  it("Should response when input contains a space", () => {
    cy.intercept("GET", "http://omdbapi.com/*", {
      statusCode: 200,
      body: {
        Search: [],
      },
    }).as("getMovies");
    
    // Act
    cy.get("input#searchText").type(" ")
    cy.get("button#search").click();

    //Assert
    cy.get("#movie-container").should("contain", "Inga sökresultat att visa");
  });
  
  it("Should response when search is not found", () => {
    cy.intercept("GET", "http://omdbapi.com/*", {
      statusCode: 200,
      body: {
        Search: [],
      },
    }).as("getMovies");

    // Act
    cy.get("input#searchText").type("gfadfg")
    cy.get("button#search").click();

    //Assert
    cy.get("#movie-container").should("contain", "Inga sökresultat att visa");
   
  });

  it("searches for movies and sorts results in descending order", () => {
    
    cy.intercept("GET", "http://omdbapi.com/*", {
      statusCode: 200,
      body: {
        Search: [
          { Title: "Ghostbusters2", Year: "2012", Type: "movie", Poster: "url2" },
          { Title: "Ghostbusters1", Year: "2011", Type: "movie", Poster: "url1" },
          { Title: "Ghostbusters3", Year: "2013", Type: "movie", Poster: "url3" }, 
        ],
      },
    }).as("getMovies");

    cy.get("input#searchText").type("ghost");
    cy.get("button#search").click();
    cy.wait("@getMovies");

    cy.get("#movie-container .movie").should("have.length.greaterThan", 0);
    cy.get("button#sortDesc").click();

    cy.get("#movie-container .movie h3").should(($titles) => {
    const titles = $titles.map((i, el) => Cypress.$(el).text().trim()).get();
    const sortedTitles = [...titles].sort((b, a) => a.localeCompare(a));
    expect(titles).to.deep.equal(sortedTitles);
    });
  });

  it("searches for movies and sorts results in ascending order", () => {
    
    cy.intercept("GET", "http://omdbapi.com/*", {
      statusCode: 200,
      body: {
        Search: [
          { Title: "Ghostbusters2", Year: "2012", Type: "movie", Poster: "url2" },
          { Title: "Ghostbusters1", Year: "2011", Type: "movie", Poster: "url1" },
          { Title: "Ghostbusters3", Year: "2013", Type: "movie", Poster: "url3" },
        ],
      },
    }).as("getMovies");

    cy.get("input#searchText").type("ghost");
    cy.get("button#search").click();
    cy.wait("@getMovies");

    cy.get("#movie-container .movie").should("have.length.greaterThan", 0);
    cy.get("button#sortAsc").click();

    cy.get("#movie-container .movie h3").should(($titles) => {
    const titles = $titles.map((i, el) => Cypress.$(el).text().trim()).get();
    const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));
    expect(titles).to.deep.equal(sortedTitles);
    });
  });
  
  it("Should display an error message when the server returns a 500 status code", () => {
    cy.intercept("GET", "http://omdbapi.com/*", {
      statusCode: 500,
      body: "Internal Server Error"
    }).as("getMoviesError");

    cy.get("form#searchForm").within(() => {
      cy.get("input#searchText").type("Ghost");
      cy.get("button#search").click();
    });

    cy.wait("@getMoviesError");

    cy.get("#movie-container").should("contain", "Inga sökresultat att visa");
  });

});
