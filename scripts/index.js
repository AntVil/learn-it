/**
 * @type {[CardId]}
 */
let stared;

document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
});

window.onload = async () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./service-worker.js");
    }

    stared = JSON.parse(localStorage.getItem("learn-it-stared") ?? "[]")

    /**
     * @type {[RawCard]}
     */
    const cardsResponse = await (await fetch("cards.json")).json();
    cards = cardsResponse.map(r => {
        let c = structuredClone(r);
        c.stared = stared.includes(c.id);
        return c;
    });

    initializeSwipeCard();
    initializeNavigation(cards);
}

/**
 *
 * @param {Card} card
 */
function toggleStar(card) {
    card.stared = !card.stared;
    let index = stared.findIndex(s => s === card.id);
    if(index === -1) {
        stared.push(card.id);
    } else {
        stared.splice(index, 1);
    }

    localStorage.setItem("learn-it-stared", JSON.stringify(stared));
}
