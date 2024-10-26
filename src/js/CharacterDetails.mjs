import { handleNoImage, customizeHeaderFooter, isFavorite, setLocalStorage, getLocalStorage, getStyleData } from "./utils.mjs";

export default class CharacterDetails {
    constructor(charId, dataSource) {
        this.charId = charId;
        this.data = [];
        this.dataSource = dataSource;
    }

    async loadCharacterPage() {
        // get character data from api
        const characters = await this.dataSource.getData();
        // filter character data to selected character
        this.data = characters.find((character) => character.id === this.charId);

        // build the character page using this element and template
        const element = document.querySelector(".detail-card");
        const templateHTML = characterDetailTemplate(this.data);
        element.insertAdjacentHTML("afterbegin", templateHTML);

        // customize colors and backgrounds based on page
        this.customizeDisplay();

        //add an event listener on the favorites button
        this.addFavButtonListener();

    }

    async customizeDisplay() {
        const page = this.data.house.toLowerCase();
        // set background image
        const body = document.body.style;
        body.backgroundImage = `url("/images/${page}/background.webp")`;   

        const styleData = await getStyleData(page);
        const title = document.querySelector(".detail-title");
        const image = document.querySelector(".detail-img");
        const details = document.querySelector(".detail-container");
        const card = document.querySelector(".detail-card");
        const favButton = document.querySelector(".fav-button");

        // alter nav and footer colors
        customizeHeaderFooter(styleData);

        // style card
        card.style.backgroundColor = styleData.Style.Card.Background;
        card.style.borderColor = styleData.Style.Card.Border;    

        favButton.style.color = styleData.Style.Card.Text;
        title.style.color = styleData.Style.Card.Text;
        image.style.borderColor = styleData.Style.Card.Border;

        details.style.color = styleData.Style.Card.Text;
    }

    async addFavButtonListener() {
        document.querySelector(".fav-button").addEventListener("click", () => {
            toggleFavorite(this.data);
        })
    }
}

function toggleFavorite(charData) {
    const favButton = document.querySelector(".fav-button");

    // get the current favorites array or make an empty one
    const favList = getLocalStorage("favArray") || [];

    // if the character is not already in the array, add them
    if (!favList.some(item => item.id === charData.id)) {
        favList.push(charData);
        setLocalStorage("favArray", favList);
        favButton.innerHTML = "&#9733;"
    } else {
        //if the character is already in the array, take them out
        const updatedFavList = favList.filter(item => item.id !== charData.id);
        setLocalStorage("favArray", updatedFavList);
        favButton.innerHTML = "&#x2606;"
    }
}

function characterDetailTemplate(data) {
    // if the character exists in the favorites array, set to filled star, otherwise set to unfilled
    // &#9733; = filled  &#x2606; = unfilled
    const favIcon = isFavorite(data.id) ? "&#9733;" : "&#x2606;";
    let template 
    template = `<h1 class=detail-title>${data.name}</h1>`;
    template += `<button class="fav-button">${favIcon}</button>`
    template += `<div class="detail-container">`;
    template += `<img class="detail-img" src="${handleNoImage(data.image)}" width="300" alt="image of ${data.name}">`;
    template += `<table class="details-table">`;
    // if the alternate name array has data then list them on the table
    if (data.alternate_names.length > 0) {
        template += `<tr><td class="details-label">Alternate Names:</td><td>${data.alternate_names[0]}</td></tr>`;
        // make a new table row for each alternate name
        for (let i = 1; i < data.alternate_names.length; i++) {
            template += `<tr><td></td><td>${data.alternate_names[i]}</td></tr>`;
        }
    }
    template += `<tr><td class="details-label">Gender: </td><td>${handleEmptyString(toTitleCase(data.gender))}</td></tr>`;
    template += `<tr><td class="details-label">Date of Birth: </td><td>${data.dateOfBirth}</td></tr>`;
    template += `<tr><td class="details-label">Ancestry: </td><td>${handleEmptyString(toTitleCase(data.ancestry))}</td></tr>`;
    // if there is wand data, include it on separate rows for each data point
    if (data.wand.length) {
        template += `<tr><td class="details-label">Wand:</td>`
            // if the data is empty, don't add a new table row
            template += (data.wand.wood == null || data.wand.wood.trim() === "") ? "" : `<td>${data.wand.wood}</td></tr>`;
            template += (data.wand.core == null || data.wand.core.trim() === "") ? "" : `<tr><td></td><td>${data.wand.core}</td></tr>`;
            template += (data.wand.length == null) ? "" : `<tr><td></td><td>${data.wand.length} inches</td></tr>`;
    } else {
        template += `<tr><td class="details-label">Wand:</td><td>Unknown</td></tr>`;
    }

    template += `<tr><td class="details-label">Patronus: </td><td>${handleEmptyString(toTitleCase(data.patronus))}</td></tr>`;
    template += `<tr><td class="details-label">Status: </td><td>${returnLifeStatus(data.alive)}</td></tr>`;
    template += `<tr><td class="details-label">Actor: </td><td>${handleEmptyString(toTitleCase(data.actor))}</td></tr>`;
    template += `</table>`
    template += `</div>`
    return template;
}

function toTitleCase(string) {
    if (!string) return string;

    // Capitalize the first letter of each word
    return string
        .toLowerCase()
        .split(" ") 
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
        .join(" "); 
}

function handleEmptyString(string) {
    return (string.trim() === "" || string == null) ? "Unknown" : string;
}

function returnLifeStatus(isAlive) {
    return (isAlive) ? "Living" : "Deceased";
}

