import ExternalServices from "./ExternalServices.mjs";
import PageDetails from "./PageDetails.mjs";
import { initPage, getURLParam, preloadBasicStyling } from "./utils.mjs";

initPage();
const pageName = getURLParam("page"); 
preloadBasicStyling(pageName);
main();

async function main() {
    const page = await initPageDetails();
    page.loadPage();
}

async function initPageDetails() {
    // create the api path for the selected page
    const apiPath = `${import.meta.env.VITE_POTTER_API_URL}/house/${pageName}`;
    const dataSource = new ExternalServices(apiPath);
    const characterList = await dataSource.getData();
    const element = document.querySelector(".character-list");
    return new PageDetails(pageName, characterList, element);
}





