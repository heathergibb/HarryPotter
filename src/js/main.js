import { initPage, getLocalStorage, setLocalStorage } from "./utils.mjs";

initPage();
personalizeWelcome(getLocalStorage("username"));
createDialogEvents();

function personalizeWelcome(name) {
    const welcome = document.getElementById("home-welcome");

    // if a name exists in localStorage,
    // create a personalize Welcome to the page
    if (name !== "" && name !== null) {
        welcome.innerHTML = `Welcome ${name}!`;
    } else {
        welcome.innerHTML = "Welcome to Hogwarts!";
    }
}

function createDialogEvents() {
    const headerDoor = document.getElementById("header-door");
    const dialog = document.getElementById("personalize-dialog");
    const closeDialog = document.getElementById("close-modal");
    const submitButton = document.getElementById("submit");

    // when the dialog is opened prefill the field with localStorage data
    headerDoor.addEventListener("click", () => {
        const name = getLocalStorage("username") || "";
        const color = getLocalStorage("color") || "";

        const username = document.getElementById("username");
        const userColor = document.getElementById("user-color");

        //prefill the name
        if (name) {
            username.value = name;
        } 
        //prefill select the color
        if (color) {
            userColor.value = color;
        }

        dialog.showModal();
        username.focus();
    });
        
    // when the user clicks outside the dialog, close the dialog
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });

    // when the user clicks the "X", close the dialog
    closeDialog.addEventListener("click", () => {dialog.close()});

    // when the user clicks submit, save the data to localStorage, 
    //update the welcome message and close the dialog
    submitButton.addEventListener("click", () => {
        event.preventDefault(); //prevent the page from being refreshed

        //remove any whitespace from name
        const username = document.getElementById("username").value.trim(); 
        const userColor = document.getElementById("user-color");

        //save name and color choice to localStorage
        setLocalStorage("username", username);
        setLocalStorage("color", userColor.value);
        
        //update the Welcome message
        personalizeWelcome(username);

        dialog.close();
    });
}
