import ExternalServices from "./ExternalServices.mjs";
import { getURLParam, loadHeaderFooter } from "./utils.mjs";
import CharacterDetails from "./CharacterDetails.mjs";

loadHeaderFooter();

//get character id from the url
const charId = getURLParam("id");

//create the api path for the character data
const apiPath = import.meta.env.VITE_POTTER_API_URL;
const dataSource = new ExternalServices(apiPath);
const character = new CharacterDetails(charId, dataSource);
character.loadCharacterPage();