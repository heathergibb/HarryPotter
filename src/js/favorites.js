import HouseDetails from "./HouseDetails.mjs";
import { getLocalStorage, initPage, preloadBasicStyling } from "./utils.mjs";

initPage();

const pageName = "favorites";
preloadBasicStyling(pageName);

const characterList = getLocalStorage("favArray") || [];
const element = document.querySelector(".character-list");
const house = new HouseDetails(pageName, characterList, element);
house.loadHousePage();