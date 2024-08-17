/**
 *
 * @returns {HTMLElement}
 */
function createCard() {
    const cardElement = document.createElement("label");
    const cardSideToggle = document.createElement("input");
    const cardStarToggle = document.createElement("input");
    const cardFront = document.createElement("article");
    const cardBack = document.createElement("article");

    cardElement.classList.add("card");

    cardSideToggle.classList.add("side-toggle");
    cardSideToggle.setAttribute("type", "checkbox");
    cardSideToggle.setAttribute("autocomplete", "off");

    cardStarToggle.classList.add("star-toggle");
    cardStarToggle.setAttribute("type", "checkbox");
    cardStarToggle.setAttribute("autocomplete", "off");

    cardElement.replaceChildren(cardSideToggle, cardStarToggle, cardFront, cardBack);

    return cardElement;
}

/**
 *
 * @param {HTMLElement} cardElement
 * @param {Card} card
 */
function fillCard(cardElement, card) {
    let backContent;
    if(card.hint !== null && card.hint !== "") {
        backContent = `${card.hint}\n\n${card.back || "no content"}`;
    } else {
        backContent = card.back || "no content"
    }

    cardElement.children[1].checked = card.stared;
    cardElement.children[2].innerText = card.front;
    cardElement.children[3].innerText = backContent;
}
