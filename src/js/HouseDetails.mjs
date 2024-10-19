import ExternalServices from "./ExternalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export default class HouseDetails {
    constructor(houseName, dataSource, element) {
        this.houseName = houseName;
        this.dataSource = dataSource;
        this.element = element;
    }

    async loadHousePage() {
        const title = document.querySelector(".title");
        title.textContent = `Welcome to ${this.houseName.charAt(0).toUpperCase() + this.houseName.slice(1)}!`;
        
        const characterList = await this.dataSource.getData();
        console.log(characterList);

        renderListWithTemplate(characterCardTemplate, this.element, characterList, "afterbegin", false);
        this.customizeDisplay();
    }

    async customizeDisplay() {
        // get the style information from json file        
        const service = new ExternalServices("/json/style.json");
        const data = await service.getData();
        // get style choices for this house
        const styleData = data.find(item => item.House.toLowerCase() === this.houseName.toLowerCase());

        const body = document.body.style;
        const cards = document.querySelectorAll(".card");
        
        console.log(styleData);

        // set background image
        body.backgroundImage = `url("/images/${this.houseName}/background.png")`;

        // style character cards
        cards.forEach((card) => {
            card.style.backgroundColor = styleData.Colors.CardBackground;
            card.style.borderColor = styleData.Colors.CardBorder;    

            // const cardHeader = document.querySelector(".card-header");
            // const cardImage = document.querySelector(".card-image");
        });
        

        


    }
}

function characterCardTemplate(character) {
    let image = character.image;
    if (image == "" || image == null) {
        image = "/images/no-image.webp";
    }

    let template
    template = `<div class="card">`
    template += `<a class="card-link" href="/character/index.html?id=${character.id}">`
    template += `<h2 class="card-header">${character.name}</h2>`
    template += `<img class="card-image" src="${image}"`
    template += `alt="image of ${character.name}" width="150">`
    template += `</a>`
    template += `</div>`
    return template;
}