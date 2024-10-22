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

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn); 
  if (clear) {
    parentElement.innerHTML = "";
  } 
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export async function loadPartial(path) {
  const html = await fetch(path).then(response => response.text());
  return html;
}

export function handleNoImage(imagePath) {
  return (imagePath == "" || imagePath == null) ? "/images/no-image.webp" : imagePath;
}

export async function loadHeaderFooter() {
  const headerPartial = await loadPartial("../partials/header.html");
  const headerElement = document.getElementById("header");
  headerElement.innerHTML = headerPartial;

  const footerPartial = await loadPartial("../partials/footer.html");
  const footerElement = document.getElementById("footer");
  footerElement.innerHTML = footerPartial;

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
  fontLink.href = "https://fonts.googleapis.com/css2?family=Bigelow+Rules&family=DM+Serif+Display:ital@0;1&display=swap";
  fontLink.rel = "stylesheet";
  document.head.appendChild(fontLink);
}

