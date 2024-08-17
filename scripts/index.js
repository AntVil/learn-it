/** @type {[CardId]}
 */
let staredCards;

document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
});

window.onload = async () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./service-worker.js");
    }

    staredCards = JSON.parse(localStorage.getItem("learn-it-stared") || "[]")

    /**
     * @type {[RawCard]}
     */
    const cardsResponse = await (await fetch("cards.json")).json();
    const cards = cardsResponse.map(r => {
        const c = structuredClone(r);
        c.isStared = staredCards.includes(c.id);
        return c;
    });

    cleanStaredCardsUsing(cards);

    initializeSwipeCard();
    initializeNavigation(cards);
}

/**
 * @param {Card} card
 */
function toggleStar(card) {
    card.isStared = !card.isStared;
    const index = staredCards.findIndex(s => s === card.id);
    if(index === -1) {
        staredCards.push(card.id);
    } else {
        staredCards.splice(index, 1);
    }

    localStorage.setItem("learn-it-stared", JSON.stringify(staredCards));
}

/**
 * @param {[Card]} cards
 */
function cleanStaredCardsUsing(cards) {
    const cardIds = cards.map(c => c.id);

    staredCards.filter(c => cardIds.includes(c));

    localStorage.setItem("learn-it-stared", JSON.stringify(staredCards));
}
