export default class ExternalServices {
    constructor (path) {
      this.path = path
    }

    async getData() {
      const response = await fetch(this.path);
      const data = await convertToJson(response);
      return data;
    }

    async getMovieIdsBySearch(searchName, searchType) {
      const response = await fetch(`${this.path}/search/${searchType}?query=${encodeURIComponent(searchName)}&include_adult=false&language=en-US&page=1`, getMovieOptions())
      const data = await convertToJson(response);
      const movieIDList = data.results.map(movie => movie.id);
      return movieIDList;
    }
    
    async getMovieDataById(movieID) {
      const response = await fetch(`${this.path}/movie/${movieID}?api_key=${import.meta.env.VITE_MOVIE_API_KEY}`);
      const data = await convertToJson(response);
      return data;
    }
  

    // async getActorData(searchName) {
    //     const response = await fetch(`${this.path}person?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&query=${encodeURIComponent(searchName)}`);
    //     const data = await convertToJson(response);
    //     return data;
    // }
}

function getMovieOptions() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_MOVIE_TOKEN}`
    }
  }
  return options;
}
function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  }