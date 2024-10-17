import ExternalServices from "./ExternalServices.mjs"
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

//testing functionality
async function getActorData(name) {
    const dataSource = new ExternalServices("movie");
    const result = await dataSource.getActorData(name);
    console.log(result);
}
getActorData("Emma Watson");