import ExternalServices from "./ExternalServices.mjs";
import HouseDetails from "./HouseDetails.mjs";
import { loadHeaderFooter, getURLParam, preloadBasicStyling } from "./utils.mjs";

loadHeaderFooter();
const houseName = getURLParam("house"); 
// preload background image and some styling
preloadBasicStyling(houseName);
main();

async function main() {
    const house = await initHouseDetails();
    house.loadHousePage();
}

async function initHouseDetails() {
    // create the api path for the selected house
    const apiPath = `${import.meta.env.VITE_POTTER_API_URL}/house/${houseName}`;
    const dataSource = new ExternalServices(apiPath);
    const characterList = await dataSource.getData();
    const element = document.querySelector(".character-list");
    return new HouseDetails(houseName, characterList, element);
}





