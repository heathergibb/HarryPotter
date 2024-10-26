import { renderListWithTemplate, customizeHeaderFooter, getStyleData } from "./utils.mjs";

export default class MovieList {
    constructor(dataSource, element) {
        this.dataSource = dataSource;
        this.movieIds = [];
        this.element = element;
    }

    async loadMoviesPage(search) {
        // search for movies by search parameter, return an array of movie ids
        this.movieIds = await this.dataSource.getMovieIdsBySearch(search, "movie");

        // using an array of movie ids, create an array of movie details for each movie id
        const movieList = await Promise.all(this.movieIds.map((id) => this.dataSource.getMovieDataById(id)));

        // build the page using the movie list array data
        renderListWithTemplate(movieCardTemplate, this.element, movieList, "afterbegin", false);
        
        // load customized styling based on data source
        this.customizeDisplay();
    }

    async customizeDisplay() {
        const styleData = await getStyleData("movies");
        const title = document.querySelector(".title");
        customizeHeaderFooter(styleData);

        // style title section
        title.style.color = styleData.Style.Title.FontColor;
        title.style.textShadow = styleData.Style.Title.Shadow;
        title.style.backgroundColor = styleData.Style.Title.Background;
    }
}

function movieCardTemplate(movie) {
    let template;
    template = `<div class="movie-detail-card">`
    template += `<h2 class="detail-title">${movie.title}</h2>`
    // if the movie tagline doesn't exist, don't include it in the html
    template += (movie.tagline != null && movie.tagline !== "") ? `<h3 class="tagline">${movie.tagline}</h3>` : ``
    template += `<div class="detail-container">`;
    template += `<img class="detail-img" src="https://image.tmdb.org/t/p/original/${movie.poster_path}" loading="lazy" `
    template += `alt="poster for ${movie.title}" width="300">`
    template += `<table class="details-table">`;
    template += `<tr><td>Release Date: </td><td>${movie.release_date}</td></tr>`
    template += `<tr><td>Runtime: </td><td>${movie.runtime} mins</td></tr>`
    template += `<tr><td>Budget: </td><td>$${(new Intl.NumberFormat("en-US").format(movie.budget))}</td></tr>`
    template += `<tr><td>Revenue: </td><td>$${(new Intl.NumberFormat("en-US").format(movie.revenue))}</td></tr>`
    template += `<tr><td colspan="2">${movie.overview}</td></tr>`;
    // if the movie homepage doesn't exist, don't include it in the html
    template += (movie.homepage != null && movie.homepage !== "") ? `<tr><td colspan="2"><a class="homepage-link" href="${movie.homepage}">${movie.homepage}</a></td></tr>` : `` ;
    template += `</table>`
    template += `</div></div>`
    return template;
}