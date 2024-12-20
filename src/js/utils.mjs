import ExternalServices from "./ExternalServices.mjs";

// get paramater from url
export function getURLParam(param) {
  const searchParam = new URLSearchParams(window.location.search);
  return searchParam.get(param);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }   
  
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

//check if a character has been selected as a favorite
export function isFavorite(charId) {
  const favList = getLocalStorage("favArray") || [];
  const result = favList.find((data) => data.id == charId);
  return result ? true : false;
}

//render the html from given data
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn); 
  if (clear) {
    parentElement.innerHTML = "";
  } 
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

//return the html for a partial i.e. header or footer
export async function loadPartial(path) {
  const html = await fetch(path).then(response => response.text());
  return html;
}

//if no character image in the api then display a generic image
export function handleNoImage(imagePath) {
  return (imagePath == "" || imagePath == null) ? "/images/no-image.webp" : imagePath;
}
 export async function initPage() {
  loadHeaderFooter();
  preloadFonts();
 }

//load the header and footer partails
export async function loadHeaderFooter() {
  const headerPartial = await loadPartial("../partials/header.html");
  const headerElement = document.getElementById("header");
  headerElement.innerHTML = headerPartial;

  const footerPartial = await loadPartial("../partials/footer.html");
  const footerElement = document.getElementById("footer");
  footerElement.innerHTML = footerPartial;

  addNavEventListeners();
}

export async function preloadFonts() {
  // Preconnect to Google Fonts
  const preconnect1 = document.createElement("link");
  preconnect1.rel = "preconnect";
  preconnect1.href = "https://fonts.googleapis.com";
  document.head.appendChild(preconnect1);

  const preconnect2 = document.createElement("link");
  preconnect2.rel = "preconnect";
  preconnect2.href = "https://fonts.gstatic.com";
  preconnect2.crossOrigin = "anonymous"; 
  document.head.appendChild(preconnect2);

  // Link to the fonts stylesheet
  const fontLink = document.createElement("link");
  fontLink.href = "https://fonts.googleapis.com/css2?family=Averia+Libre:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Cinzel:wght@400..900&family=DM+Serif+Display:ital@0;1&display=swap";
  fontLink.rel = "stylesheet";
  document.head.appendChild(fontLink);
}

export async function addNavEventListeners() {
  const housesBtn = document.querySelector("#dropdown");
  const houseLinks = document.querySelector(".dropdown-content");

  houseLinks.style.display = "none";

  housesBtn.addEventListener("click", () => {
      if (houseLinks.style.display === "block") {
          houseLinks.style.display = "none";
      } else {
          houseLinks.style.display = "block";
      }

  });

  window.addEventListener("click", (event) => {
      if (!housesBtn.contains(event.target) && !houseLinks.contains(event.target)) {
          houseLinks.style.display = "none";
      }
  })  
}

export async function customizeHeaderFooter(styleData) {
  const headerNav = document.querySelector("#header-nav");
  const headerLinks = document.querySelectorAll(".header-link");
  const dropdown = document.querySelector(".dropdown-content");
  const dropdownLinks = document.querySelectorAll(".dropdown-link");
  const footer = document.querySelector("footer");
  
  headerNav.style.backgroundColor = styleData.Style.Nav.BackgroundColor;
  headerNav.style.borderColor = styleData.Style.Nav.BorderColor;
  headerLinks.forEach(link => {
      link.style.color = styleData.Style.Nav.FontColor;
  });
  dropdown.style.backgroundColor = styleData.Style.Nav.BackgroundColor;
  dropdown.style.borderColor = styleData.Style.Nav.BorderColor;
  dropdownLinks.forEach(link => {
      link.style.color = styleData.Style.Nav.FontColor;
  })

  // alter footer colors
  footer.style.backgroundColor = styleData.Style.Nav.BackgroundColor;
  footer.style.borderColor = styleData.Style.Nav.BorderColor;
  footer.style.color = styleData.Style.Nav.FontColor;
}

export async function preloadBasicStyling(page) {
    // set background image
    const body = document.body.style;
    body.backgroundImage = `url("/images/${page}/background.webp")`;

    const title = document.querySelector(".title");
    title.style.backgroundImage = `url("/images/${page}/title.webp")`;
}

export async function getStyleData(styleId) {
  // get the style information from json file        
  const service = new ExternalServices("/json/style.json");
  const data = await service.getData();
  return data.find(item => item.Id.toLowerCase() === styleId.toLowerCase());
}
