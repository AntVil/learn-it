/**
 *
 * @param {[Card]} cards
 */
function openCardList(cards) {
    const cardListContainer = document.getElementById("card-list").nextElementSibling;
    cardListContainer.children[0].children[1].innerText = cards[0].folder;
    const cardList = cardListContainer.children[1];
    cardList.scrollLeft = 0;

    const cardElements = cards.map(card => {
        let cardElement = createCard();
        fillCard(cardElement, card);
        return cardElement;
    });

    cardList.replaceChildren(...cardElements);
}
