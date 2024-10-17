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

        // createCharacterCards();
        // customizeDisplay();
    }
}
