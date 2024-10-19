export default class ExternalServices {
    constructor (path) {
        this.path = path
    }

    // optional path argument used when the baseURL isn't complete 
    // example baseURL + "/house/gryffindor"
    async getData() {
        const response = await fetch(this.path);
        const data = await convertToJson(response);
        return data;
    }

    async getCharacterData(charId) {
        const response = await fetch(`${this.baseURL}/${charId}`);
        const data = await convertToJson(response);
        return data;
    }

    async getActorData(searchName) {
        const response = await fetch(`${this.baseURL}person?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&query=${encodeURIComponent(searchName)}`);
        const data = await convertToJson(response);
        return data;
    }
}

function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  }