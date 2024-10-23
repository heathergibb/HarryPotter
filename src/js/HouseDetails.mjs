import ExternalServices from "./ExternalServices.mjs";
import { renderListWithTemplate, handleNoImage, customizeHeaderFooter } from "./utils.mjs";

export default class HouseDetails {
    constructor(houseName, dataSource, element) {
        this.houseName = houseName.toLowerCase();
        this.dataSource = dataSource;
        this.element = element;
    }

    async loadHousePage() {
        const title = document.querySelector(".title");
        title.textContent = `Welcome to ${this.houseName.charAt(0).toUpperCase() + this.houseName.slice(1)}!`;
        
        const characterList = await this.dataSource.getData();
  
        renderListWithTemplate(characterCardTemplate, this.element, characterList, "afterbegin", false);
        this.customizeDisplay();
    }
    async preloadStyle() {
        // set background image
        const body = document.body.style;
        body.backgroundImage = `url("/images/${this.houseName}/background.webp")`;

        const title = document.querySelector(".title");
        title.style.backgroundImage = `url("/images/${this.houseName}/title.webp")`;
    }

    async customizeDisplay() {
        // get the style information from json file        
        const service = new ExternalServices("/json/style.json");
        const data = await service.getData();
        // get style choices for this house
        const styleData = data.find(item => item.Id.toLowerCase() === this.houseName.toLowerCase());
        const title = document.querySelector(".title");
        const cards = document.querySelectorAll(".card");

        // style title section
        title.style.color = styleData.Style.Title.FontColor;
        title.style.textShadow = styleData.Style.Title.Shadow;
        title.style.backgroundColor = styleData.Style.Title.Background;

        // alter nav and footer colors
        customizeHeaderFooter(styleData);
            
        // style character cards
        cards.forEach((card) => {
            card.style.backgroundColor = styleData.Style.Card.Background;
            card.style.borderColor = styleData.Style.Card.Border;    

            const cardHeader = card.querySelector(".card-header");
            cardHeader.style.color = styleData.Style.Card.Text;
            const cardImage = card.querySelector(".card-image");
            cardImage.style.borderColor = styleData.Style.Card.Border;
        });
    }
}

function characterCardTemplate(character) {
    const image = handleNoImage(character.image);

    let template
    template = `<div class="card">`
    template += `<a class="card-link" href="/character/index.html?id=${character.id}">`
    template += `<h2 class="card-header">${character.name}</h2>`
    template += `<img class="card-image" src="${image}" loading=lazy" `
    template += `alt="image of ${character.name}" width="150" height="300">`
    template += `</a>`
    template += `</div>`
    return template;
}