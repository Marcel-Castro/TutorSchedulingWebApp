function populateTutorList (tutors) {
    var tutorList = document.getElementById("tutorList");

    for (var i = 0; i < tutors.length; i++) {
        var newContainer = document.createElement("div");
        newContainer.classList.add("tutorCard");
        var newSpan = document.createElement("span");
        newSpan.classList.add("tutorCardSpan");
        var newText = document.createTextNode(tutors[i].name);
        newSpan.appendChild(newText);
        newContainer.appendChild(newSpan);
        tutorList.appendChild(newContainer);
    }
}

function main () {
    populateTutorsArray(populateTutorList);
}