import PageDetails from "./PageDetails.mjs";
import { getLocalStorage, initPage, preloadBasicStyling } from "./utils.mjs";

initPage();

const pageName = "favorites";
preloadBasicStyling(pageName);

const characterList = getLocalStorage("favArray") || [];
const element = document.querySelector(".character-list");
const page = new PageDetails(pageName, characterList, element);
page.loadPage();