function populateTutorList (tutors) {
    var tutorList = document.getElementById("tutorList");

    for (var i = 0; i < tutors.length; i++) {
        // Create card with tutor name
        var newContainer = document.createElement("div");
        newContainer.classList.add("tutorCard");
        var newSpan = document.createElement("span");
        newSpan.classList.add("tutorCardSpan");
        var newText = document.createTextNode(tutors[i].name);
        newSpan.appendChild(newText);
        newContainer.appendChild(newSpan);

        // Create and add edit button to card
        var editButton = document.createElement("button");
        editButton.classList.add("tutorCardButton");
        var editText = document.createTextNode("Edit");
        editButton.appendChild(editText);

        // Create and add delete button to card
        var deleteButton = document.createElement("button");
        deleteButton.classList.add("tutorCardButton");
        var deleteText = document.createTextNode("Delete");
        deleteButton.appendChild(deleteText);

        // Add buttons to card
        var buttonWrapper = document.createElement("div");
        buttonWrapper.classList.add("buttonWrapper");
        buttonWrapper.appendChild(editButton);
        buttonWrapper.appendChild(deleteButton);
        newContainer.appendChild(buttonWrapper);

        // Add card to tutor list
        tutorList.appendChild(newContainer);
    }
}

function main () {
    populateTutorsArray(populateTutorList);
}