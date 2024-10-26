import { renderListWithTemplate, handleNoImage, customizeHeaderFooter, getStyleData, getLocalStorage } from "./utils.mjs";

export default class PageDetails {
    constructor(pageName, characterList, element) {
        this.pageName = pageName.toLowerCase();
        this.characterList = characterList;
        this.element = element;
    }

    async loadPage() {
        // create the customized title based on the selected page
        let titleVariable = this.pageName;
        // if the page is "favorites", get the username from localStorage
        // and use it in the title
        if (titleVariable.toLowerCase() === "favorites") {
            let name = getLocalStorage("username");
            titleVariable = (name == "" || name == null) ? titleVariable : `${name}'s ${titleVariable}`;
        }
        
        const title = document.querySelector(".title");
        title.textContent = `Welcome to ${titleVariable.charAt(0).toUpperCase() + titleVariable.slice(1)}!`;
        
        // load the page with the dynamically created template
        renderListWithTemplate(characterCardTemplate, this.element, this.characterList, "afterbegin", false);
        this.customizeDisplay(); //load custom colors and styling
    }

    async customizeDisplay() {
        let styleId = this.pageName;
        //if this is the favorites page, select the styleId/category
        //from the localStorage.
        if (this.pageName.toLowerCase() === "favorites") {
            const color = getLocalStorage("color");
            //if no color saved to localStorage, default to brown
            styleId = (color == "" || color == null) ? "brown" : color;
        }
        let styleData = await getStyleData(styleId);
        if (!styleData) {
            styleData = await getStyleData("default");
        }
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