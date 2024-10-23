import HouseDetails from "./HouseDetails.mjs";
import { getLocalStorage, loadHeaderFooter, preloadBasicStyling } from "./utils.mjs";

loadHeaderFooter();

const pageName = "favorites";
preloadBasicStyling(pageName);

const characterList = getLocalStorage("favArray") || [];
const element = document.querySelector(".character-list");
const house = new HouseDetails(pageName, characterList, element);
house.loadHousePage();