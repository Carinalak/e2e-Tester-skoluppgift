import { movieSort } from "./functions";
import { IMovie } from "./models/Movie";
import { getData } from "./services/movieService";


let movies: IMovie[] = [];

export const init = () => {
  let form = document.getElementById("searchForm") as HTMLFormElement;
  form.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();
    handleSubmit();
  });
};

let sortAscButton = document.getElementById("sortAsc") as HTMLButtonElement;
sortAscButton.addEventListener("click", () => {
  sortMovies(false);
});

let sortDescButton = document.getElementById("sortDesc") as HTMLButtonElement;
sortDescButton.addEventListener("click", () => {
  sortMovies(true);
});

export async function handleSubmit() {
  let searchText = (document.getElementById("searchText") as HTMLInputElement)
    .value;

  let container: HTMLDivElement = document.getElementById(
    "movie-container"
  ) as HTMLDivElement;
  container.innerHTML = "";

  try {
    movies = await getData(searchText);

    if (movies.length > 0) {
      createHtml(movies, container);
    } else {
      displayNoResult(container);
    }
  } catch {
    displayNoResult(container);
  }
}

// ------------------------ Sort movies ---------------------- //

export const sortMovies = (desc: boolean) => {
  movies = movieSort(movies, desc);
  createHtml(movies, document.getElementById("movie-container") as HTMLDivElement);
};

// ------------------------------------------------------------- //-

export const createHtml = (movies: IMovie[], container: HTMLDivElement) => {
  container.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    let movie = document.createElement("div");
    let title = document.createElement("h3");
    let img = document.createElement("img");

    movie.classList.add("movie");
    title.innerHTML = movies[i].Title;
    img.src = movies[i].Poster;
    img.alt = movies[i].Title;

    movie.appendChild(title);
    movie.appendChild(img);

    container.appendChild(movie);
  }
};

export const displayNoResult = (container: HTMLDivElement) => {
  let noMessage = document.createElement("p");

  noMessage.innerHTML = "Inga sökresultat att visa";

  container.appendChild(noMessage);
};
