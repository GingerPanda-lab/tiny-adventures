
/* ---------- DOM elements ---------- */

const notesLink = document.getElementById("notes-link");

const lookCard = document.getElementById("look-card");
const wanderCard = document.getElementById("wander-card");
const createCard = document.getElementById("create-card");

const adventureDialog = document.getElementById("adventure-dialog");
const adventureText = document.getElementById("adventure-text");
const dialogImg = document.getElementById("dialog-img");
const closeDialog = document.getElementById("close-dialog");

const createDialog = document.getElementById("create-dialog");
const closeCreate = document.getElementById("close-create");

const createDate = document.getElementById("create-date");
const createText = document.getElementById("create-text");
const createEntries = document.getElementById("create-entries");
const saveEntry = document.getElementById("save-entry");

const plane = document.querySelector(".flying-plane");


/* MISSIONS */

const lookAdventures = [
    "Find something red",
    "Find the strangest shadow",
    "Notice three different shades of green",
    "Find something tiny",
    "Find something huge",
    "Look for an unusual reflection",
    "Find something shaped like a circle",
    "Notice something old",
    "Find a pattern",
    "Find one thing that makes you smile"
];

const wanderAdventures = [
    "Take a street you usually ignore",
    "Walk until you notice something beautiful",
    "Turn left where you normally turn right",
    "Visit a place you have never entered",
    "Walk for ten minutes without a destination",
    "Follow the sound of birds",
    "Find the quietest nearby street",
    "Walk toward something green",
    "Choose a path only because it looks interesting",
    "Take a tiny detour on your way home"
];

let lookIndex = Number(localStorage.getItem("lookIndex")) || 0;
let wanderIndex = Number(localStorage.getItem("wanderIndex")) || 0;

/* ---------- LOOK mission ---------- */

lookCard.addEventListener("click", function() {

    const savedAdventures = localStorage.getItem("adventures");
    let adventures = [];

    if (savedAdventures !== null) {
        adventures = JSON.parse(savedAdventures);
    }

    const activeLook = adventures.find(function(adventure) {
        return adventure.type === "LOOK" &&
               adventure.completed === false;
    });

    if (activeLook !== undefined) {

        adventureText.textContent = activeLook.text;

    } else {

        const currentLook = lookAdventures[lookIndex];

        adventureText.textContent = currentLook;

        const newAdventure = {
            type: "LOOK",
            text: currentLook,
            completed: false
        };

        adventures.push(newAdventure);

        localStorage.setItem(
            "adventures",
            JSON.stringify(adventures)
        );

        lookIndex++;

        if (lookIndex >= lookAdventures.length) {
            lookIndex = 0;
        }

        localStorage.setItem("lookIndex", lookIndex);
    }

    adventureDialog.classList.remove("from-wander");
    adventureDialog.classList.add("from-look");

    dialogImg.src = "images/Lupa.png";
    dialogImg.alt = "Lupa";

    adventureDialog.showModal();
});


/* ---------- WANDER mission ---------- */

wanderCard.addEventListener("click", function() {

    const savedAdventures = localStorage.getItem("adventures");
    let adventures = [];

    if (savedAdventures !== null) {
        adventures = JSON.parse(savedAdventures);
    }

    const activeWander = adventures.find(function(adventure) {
        return adventure.type === "WANDER" &&
               adventure.completed === false;
    });

    if (activeWander !== undefined) {

        adventureText.textContent = activeWander.text;

    } else {

        const currentWander = wanderAdventures[wanderIndex];

        adventureText.textContent = currentWander;

        const newAdventure = {
            type: "WANDER",
            text: currentWander,
            completed: false
        };

        adventures.push(newAdventure);

        localStorage.setItem(
            "adventures",
            JSON.stringify(adventures)
        );

        wanderIndex++;

        if (wanderIndex >= wanderAdventures.length) {
            wanderIndex = 0;
        }

        localStorage.setItem("wanderIndex", wanderIndex);
    }

    adventureDialog.classList.remove("from-look");
    adventureDialog.classList.add("from-wander");

    dialogImg.src = "images/Map.png";
    dialogImg.alt = "Wander";

    adventureDialog.showModal();
});

/* ---------- Mission dialog ---------- */

closeDialog.addEventListener("click", function() {
    adventureDialog.close();
});

/* Notes open */

notesLink.addEventListener("click", function(event) {
    event.preventDefault();
    createCard.click();
});

/* Open and close Notes dialog */

createCard.addEventListener("click", function() {
    createDialog.showModal();
});

closeCreate.addEventListener("click", function() {
    createDialog.close();
});

/* Load saved notes */

const savedDiary = localStorage.getItem("diaryEntries");

let diaryEntries = [];

if (savedDiary !== null) {
    diaryEntries = JSON.parse(savedDiary);
}

/* Create one note on the page */

function renderDiaryEntry(entryObject) {

    const newEntry = document.createElement("div");
    newEntry.classList.add("entry");

    const entryDate = document.createElement("div");
    entryDate.classList.add("entry-date");
    entryDate.textContent = entryObject.date;

    const entryText = document.createElement("div");
    entryText.classList.add("entry-text");
    entryText.textContent = entryObject.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "×";
    deleteButton.classList.add("delete-entry");

    deleteButton.addEventListener("click", function() {

        const index = diaryEntries.indexOf(entryObject);

        if (index !== -1) {
            diaryEntries.splice(index, 1);

            localStorage.setItem(
                "diaryEntries",
                JSON.stringify(diaryEntries)
            );
        }

        newEntry.remove();
    });

    newEntry.appendChild(entryDate);
    newEntry.appendChild(entryText);
    newEntry.appendChild(deleteButton);

    createEntries.prepend(newEntry);
}

/* Show saved notes */

diaryEntries.forEach(function(entryObject) {
    renderDiaryEntry(entryObject);
});

/* Save a new note */

saveEntry.addEventListener("click", function() {

    if (
        createText.value.trim() === "" ||
        createDate.value.trim() === ""
    ) {
        return;
    }

    const entryObject = {
        date: createDate.value,
        text: createText.value
    };

    diaryEntries.push(entryObject);

    localStorage.setItem(
        "diaryEntries",
        JSON.stringify(diaryEntries)
    );

    renderDiaryEntry(entryObject);

    createText.value = "";
    createDate.value = "";

    createDate.focus();
});

/* FLYING PLANE */

function movePlane() {

    const randomX = Math.random() * 90;
    const randomY = Math.random() * 80;

    const randomRotate = Math.random() * 20 - 10;
    const duration = Math.random() * 4 + 4;

    const planePosition = plane.getBoundingClientRect();

    const currentX = planePosition.left;
    const newX = window.innerWidth * randomX / 100;

    let direction = 1;

    if (newX < currentX) {
        direction = -1;
    }

    plane.style.transition =
        `left ${duration}s ease-in-out,
         top ${duration}s ease-in-out,
         transform 0.4s ease`;

    plane.style.left = randomX + "%";
    plane.style.top = randomY + "%";

    plane.style.transform =
        `rotate(${randomRotate}deg) scaleX(${direction})`;

    setTimeout(movePlane, duration * 1000);
}

movePlane();