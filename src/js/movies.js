import ExternalServices from "./ExternalServices.mjs"
import MovieList from "./MovieList.mjs";
import { loadHeaderFooter, preloadBasicStyling } from "./utils.mjs";

loadHeaderFooter();
preloadBasicStyling("movies");

const apiPath = `${import.meta.env.VITE_MOVIE_API_URL}`
const dataSource = new ExternalServices(apiPath);
const element = document.querySelector(".movies-detail");
const movieList = new MovieList(dataSource, element);
movieList.loadMoviesPage("Harry Potter");
