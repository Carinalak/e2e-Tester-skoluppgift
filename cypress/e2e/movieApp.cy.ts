describe('Movie search and sort', () => {
  
  beforeEach(() => {
    // Assign
    cy.visit('http://localhost:5173');
  });
  
  it('searches for movies and shows results', () => {

    // Act
    cy.get("input#searchText").type("ghost");
    cy.get("button#search").click();

    //Assert
    cy.get('#movie-container')
    .should("have.length", 1);

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

  it('searches for movies and sorts results in descending order', () => {
    
    cy.intercept('GET', 'http://omdbapi.com/*', {
      statusCode: 200,
      body: {
        Search: [
          { Title: 'Ghostbusters2', Year: '2012', Type: 'movie', Poster: 'url2' },
          { Title: 'Ghostbusters1', Year: '2011', Type: 'movie', Poster: 'url1' },
          { Title: 'Ghostbusters3', Year: '2013', Type: 'movie', Poster: 'url3' },
          
        ],
      },
    }).as('getMovies');

    // Act
    cy.get('input#searchText').type('ghost');
    cy.get('button#search').click();
    cy.wait('@getMovies');

    // Assert
    cy.get('#movie-container .movie').should('have.length.greaterThan', 0);

   
    cy.get('button#sortDesc').click();

    // Assert
    cy.get('#movie-container .movie h3').should(($titles) => {
    const titles = $titles.map((i, el) => Cypress.$(el).text().trim()).get();
    const sortedTitles = [...titles].sort((b, a) => a.localeCompare(a));
    expect(titles).to.deep.equal(sortedTitles);
    });
  });


  it('searches for movies and sorts results in ascending order', () => {
    
    cy.intercept('GET', 'http://omdbapi.com/*', {
      statusCode: 200,
      body: {
        Search: [
          { Title: 'Ghostbusters2', Year: '2012', Type: 'movie', Poster: 'url2' },
          { Title: 'Ghostbusters1', Year: '2011', Type: 'movie', Poster: 'url1' },
          { Title: 'Ghostbusters3', Year: '2013', Type: 'movie', Poster: 'url3' },
          
        ],
      },
    }).as('getMovies');

    // Act
    cy.get('input#searchText').type('ghost');
    cy.get('button#search').click();
    cy.wait('@getMovies');

    
    cy.get('#movie-container .movie').should('have.length.greaterThan', 0);

    
    cy.get('button#sortAsc').click();

    // Assert
    cy.get('#movie-container .movie h3').should(($titles) => {
    const titles = $titles.map((i, el) => Cypress.$(el).text().trim()).get();
    const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));
    expect(titles).to.deep.equal(sortedTitles);
    });
  });
});


  // --------------------------------- CRAZY MOVIES API --------------------------------------------------------------
/*
  it('searches for movies and displays results', () => {
    cy.intercept("http://omdbapi.com*", {
      movies: [
        { Title: "Ghostbusters2", Year: "2011", Type: "movie", Poster: "url2" },
        { Title: "Ghostbusters1", Year: "2013", Type: "movie", Poster: "url1" },
        { Title: "Ghostbusters3", Year: "2012", Type: "movie", Poster: "url3" }
      ]
    })
    // Act
    cy.get("input#searchText").type("ghost");
    cy.get("button#search").click();
    //cy.wait('@getMovies');
  
    // Assert
    cy.get('#movie-container').find('.movie').should('have.length.greaterThan', 0); 
    cy.get('#movie-container').should('have.text', 'Ghostbusters1');
    cy.get('#movie-container').should('have.text', 'Ghostbusters2');
    cy.get('#movie-container').should('have.text', 'Ghostbusters3');
  });
  });*/

  /*
  it('searches for movies and displays results from real API', () => {
    // Act
    cy.get("input#searchText").type("ghost");
    cy.get("button#search").click();

    // Wait for the real API request to complete
    cy.intercept('GET', 'http://omdbapi.com/?apikey=416ed51a&s=ghost*').as('getRealMovies');
    cy.wait('@getRealMovies');

    // Assert
    cy.get('#movie-container .movie').should('have.length', 3); // Adjust based on your real API data

  });*/
  
  


 

  

/*
  it('should get movies from API', () => {

    // Assign
    cy.intercept("http://crazymovies.com*", {
    movies:  [{ imdbID: "1", Title: "A Movie", Year: "2011", Type: "movie", Poster: "url1" },
    { imdbID: "2", Title: "B Movie", Year: "2011", Type: "movie", Poster: "url1" },
    { imdbID: "3", Title: "C Movie", Year: "2013", Type: "movie", Poster: "url3" }]

    });
    
    //cy.intercept("http://crazythingsapi.com", [{ imdbID: "1", Title: "C Movie", Year: "2011", Type: "movie", Poster: "url1" },
    //{ imdbID: "3", Title: "B Movie", Year: "2013", Type: "movie", Poster: "url3" }]);

    // Act
    cy.get("button#search").click();

    //Assert
    cy.get('#movie-container').should("have.length", 1);
   // cy.get("#title").should("have.text", "C Movie");
   
  });
  */


/*
  
  it('should get movies from API', () => {
    // Assign
    cy.intercept('GET', 'http://crazymovies.com/?query=*', {
      statusCode: 200,
      body: {
        movies: [
          { imdbID: "1", Title: "A Movie", Year: "2011", Type: "movie", Poster: "url1" },
          { imdbID: "2", Title: "B Movie", Year: "2011", Type: "movie", Poster: "url1" },
          { imdbID: "3", Title: "C Movie", Year: "2013", Type: "movie", Poster: "url3" }
        ]
      }
    }).as('getMovies');

    // Act
    cy.get("button#search").click();

    // Assert
    cy.wait('@getMovies');
    cy.get('#movie-container .movie').should("have.length", 3);
    cy.get('#movie-container h3').first().should("contain.text", "A Movie");
  });*/

