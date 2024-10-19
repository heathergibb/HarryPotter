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

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if(callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(response => response.text());
  return html;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.getElementById("header");
  renderWithTemplate(headerTemplate, headerElement);

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.getElementById("footer");
  renderWithTemplate(footerTemplate, footerElement)

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

