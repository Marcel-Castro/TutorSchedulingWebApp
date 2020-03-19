// Set "focus" to specified card element
function setCardFocus (card, tutorOrCard) {
    var cardList = document.getElementsByClassName(tutorOrCard + "Card");

    // Delete "focus" of all other course cards
    for (var j = 0; j < cardList.length; j++) {
        cardList[j].classList.remove("cardSelected");
    }
    // Add "focus" to the card
    card.classList.add("cardSelected");
}