/* Missions page */

const todoList = document.getElementById("todo-list");
const completedList = document.getElementById("completed-list");


/* Load saved missions */

const savedAdventures = localStorage.getItem("adventures");

let adventures = [];

if (savedAdventures !== null) {
    adventures = JSON.parse(savedAdventures);
}

/* Create mission cards */

adventures.forEach(function(adventure) {

    const newCard = document.createElement("div");
    newCard.classList.add("todo-card");

    const type = document.createElement("p");
    type.classList.add("todo-type");
    type.textContent = adventure.type;

    const text = document.createElement("p");
    text.classList.add("todo-text");
    text.textContent = adventure.text;


    /* Done checkbox */

    const doneLabel = document.createElement("label");
    doneLabel.classList.add("done-check");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = adventure.completed;

    const doneText = document.createElement("span");
    doneText.textContent = "DONE";


    /* Completed stamp */

    const stamp = document.createElement("img");
    stamp.src = "images/Stamp.png";
    stamp.alt = "Completed";
    stamp.classList.add("stamp-placeholder");

    if (adventure.completed) {
        stamp.classList.add("stamp-show");
    }

    /* Move card between TO DO and COMPLETED */

    checkbox.addEventListener("change", function() {

        adventure.completed = checkbox.checked;

        localStorage.setItem(
            "adventures",
            JSON.stringify(adventures)
        );

        if (checkbox.checked) {

            stamp.classList.add("stamp-show");

            setTimeout(function() {

                newCard.classList.add("leaving");

                setTimeout(function() {

                    completedList.prepend(newCard);

                    newCard.classList.remove("leaving");
                    newCard.classList.add("arriving");

                }, 350);

            }, 800);

        } else {

            stamp.classList.remove("stamp-show");
            newCard.classList.remove("arriving");

            todoList.prepend(newCard);
        }
    });

    /* Build card */

    doneLabel.appendChild(checkbox);
    doneLabel.appendChild(doneText);

    newCard.appendChild(type);
    newCard.appendChild(text);
    newCard.appendChild(doneLabel);
    newCard.appendChild(stamp);

    /* Place card in the correct section */

    if (adventure.completed) {
        completedList.prepend(newCard);
    } else {
        todoList.prepend(newCard);
    }

});