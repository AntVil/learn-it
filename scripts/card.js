const cardObjectSymbol = Symbol("card object");

/**
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
    cardStarToggle.setAttribute("aria-label", "card showing back");
    cardSideToggle.setAttribute("autocomplete", "off");

    cardStarToggle.classList.add("star-toggle");
    cardStarToggle.setAttribute("type", "checkbox");
    cardStarToggle.setAttribute("aria-label", "card is starred");
    cardStarToggle.setAttribute("autocomplete", "off");
    cardStarToggle.addEventListener("click", () => {
        toggleStar(cardElement[cardObjectSymbol]);
    });

    cardElement.replaceChildren(cardSideToggle, cardFront, cardBack, cardStarToggle);

    return cardElement;
}

/**
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

    cardElement[cardObjectSymbol] = card;

    cardElement.children[1].innerText = card.front;
    cardElement.children[2].innerText = backContent;
    cardElement.children[3].checked = card.isStared;
}
