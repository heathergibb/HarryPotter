import ExternalServices from "./ExternalServices.mjs";
import HouseDetails from "./HouseDetails.mjs";
import { loadHeaderFooter, getURLParam } from "./utils.mjs";

loadHeaderFooter();

// get the house name from the url
const houseName = getURLParam("house"); 
// create the api path for the selected house
const apiPath = `${import.meta.env.VITE_POTTER_API_URL}/house/${houseName}`;
const dataSource = new ExternalServices(apiPath);
const element = document.querySelector(".character-list");
const house = new HouseDetails(houseName, dataSource, element);

house.loadHousePage();




