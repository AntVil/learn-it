document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
});

window.onload = async () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./service-worker.js");
    }

    /**
     * @type {[RawCard]}
     */
    const cardsResponse = await (await fetch("cards.json")).json();
    cards = cardsResponse.map(r => {
        let c = structuredClone(r);
        c.stared = false;
        return c;
    });

    initializeSwipeCard();
    initializeNavigation(cards);
}
