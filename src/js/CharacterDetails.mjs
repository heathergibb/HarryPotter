import { handleNoImage, customizeHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CharacterDetails {
    constructor(charId, dataSource) {
        this.charId = charId;
        this.data = [];
        this.dataSource = dataSource;
    }

    async loadCharacterPage() {
        const characters = await this.dataSource.getData();
        this.data = characters.find((character) => character.id === this.charId);

        const element = document.querySelector(".detail-card");
        const templateHTML = characterDetailTemplate(this.data);
 
        element.insertAdjacentHTML("afterbegin", templateHTML);

        this.customizeDisplay();
    }

    async customizeDisplay() {
        const house = this.data.house.toLowerCase();
        // set background image
        const body = document.body.style;
        body.backgroundImage = `url("/images/${house}/background.webp")`;   

        // get the style information from json file        
        const service = new ExternalServices("/json/style.json");
        const data = await service.getData();
        // get style choices for this house
        const styleData = data.find(item => item.Id.toLowerCase() === house);
        const title = document.querySelector(".detail-title");
        const image = document.querySelector(".detail-img");
        const details = document.querySelector(".detail-container");
        const card = document.querySelector(".detail-card");

        // alter nav and footer colors
        customizeHeaderFooter(styleData);

        // style card
        card.style.backgroundColor = styleData.Style.Card.Background;
        card.style.borderColor = styleData.Style.Card.Border;    

        title.style.color = styleData.Style.Card.Text;
        image.style.borderColor = styleData.Style.Card.Border;

        details.style.color = styleData.Style.Card.Text;
    }
}

function characterDetailTemplate(data) {
    let template 
    template = `<h1 class=detail-title>${data.name}</h1>`;
    template += `<div class="detail-container">`;
    template += `<img class="detail-img" src="${handleNoImage(data.image)}" width="300" alt="image of ${data.name}">`;
    template += `<table class="details-table">`;
    if (data.alternate_names.length > 0) {
        template += `<tr><td class="details-label">Alternate Names:</td><td>${data.alternate_names[0]}</td></tr>`;
        
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

