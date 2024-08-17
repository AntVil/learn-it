/**
 *
 * @param {[Card]} cards
 */
function openCardList(cards) {
    const cardListContainer = document.getElementById("card-list").nextElementSibling;
    cardListContainer.children[0].setAttribute("data-folder", cards[0].folder);
    const cardList = cardListContainer.children[1];

    const cardElements = cards.map(card => {
        let cardElement = createCard();
        fillCard(cardElement, card);
        return cardElement;
    });

    cardList.replaceChildren(...cardElements);
}
