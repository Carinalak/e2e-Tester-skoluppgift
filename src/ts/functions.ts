import { IMovie } from "./models/Movie";

export const movieSort = (movies: IMovie[], desc: boolean = true) => {
  return movies.sort((a: IMovie, b: IMovie) => {
    if (desc) {
      if (a.Title > b.Title) return -1;
      if (a.Title < b.Title) return 1;
      return 0;
    } else {
      if (a.Title > b.Title) return 1;
      if (a.Title < b.Title) return -1;
      return 0;
    }
  });
};

/* // Gammal - var tvungen att vända på det så att det skulle funka :-)

export const movieSort = (movies: IMovie[], desc: boolean = true) => {
  return movies.sort((a: IMovie, b: IMovie) => {
    if (desc) {
      if (a.Title > b.Title) return 1;
      if (a.Title < b.Title) return -1;

      return 0;
    } else {
      if (a.Title > b.Title) return -1;
      if (a.Title < b.Title) return 1;

      return 0;
    }
  });
};
*/
