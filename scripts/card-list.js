const CARD_LIST_BUFFER_SIZE = 3;

/**
 * @param {[Card]} cards
 */
function openCardList(cards) {
    const cardListContainer = document.getElementById("card-list").nextElementSibling;
    cardListContainer.children[0].children[1].innerText = cards[0].folder;
    const cardList = cardListContainer.children[1];
    cardList.scrollLeft = 0;

    // dynamically insert card when user is close (prevent huge DOM)
    const cardElements = [];
    for(let i=0;i<cards.length;i++) {
        const cardElement = createCard();
        fillCard(cardElement, cards[i]);
        cardElement.style.setProperty("grid-column", `${i + 1} / span 1`);
        cardElements.push(cardElement);
    }

    cardList.style.setProperty("--card-count", cards.length);

    let currentIndex1 = 0;
    let currentIndex2 = Math.min(CARD_LIST_BUFFER_SIZE, cardElements.length);

    cardList.addEventListener("scroll", () => {
        let midIndex = Math.floor(cardList.scrollLeft / window.innerWidth);
        let index1 = Math.max(midIndex - CARD_LIST_BUFFER_SIZE, 0);
        let index2 = Math.min(midIndex + CARD_LIST_BUFFER_SIZE, cardElements.length);

        if(currentIndex1 === index1 && currentIndex2 === index2) {
            // nothing to do (skip)
            return;
        }

        currentIndex1 = index1;
        currentIndex2 = index2;

        cardList.replaceChildren(
            ...(cardElements.slice(currentIndex1, currentIndex2))
        );
    }, { passive: true})

    cardList.replaceChildren(
        ...(cardElements.slice(currentIndex1, currentIndex2))
    );
}
