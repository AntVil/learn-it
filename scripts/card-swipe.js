let swipeCards;
let swipeFolderElement;
let swipeCardElement1;
let swipeCardElement2;
let nextSwipeCard;
let completedCardsCount;
let progressElement;

function initializeSwipeCard() {
    let container = document.getElementById("card-swipe").nextElementSibling;
    swipeFolderElement = container.children[0].children[1];
    let cardContainer = container.children[1];
    progressElement = cardContainer.nextElementSibling;
    swipeCardElement1 = createCard();
    swipeCardElement2 = createCard();
    cardContainer.replaceChildren(
        swipeCardElement1,
        swipeCardElement2
    )

    cardContainer.addEventListener("touchstart", () => {
        motionCompleted = false;
    }, { passive: true });
    cardContainer.addEventListener("touchend", () => {
        motionCompleted = true;
    }, { passive: true });

    cardContainer.addEventListener("scroll", (e) => {
        if (cardContainer.scrollLeft > window.innerWidth / 2 && motionCompleted) {
            // hijack scroll
            cardContainer.style.overflowX = "hidden";
            cardContainer.scrollLeft = 0;
            motionCompleted = false;

            toNextSwipeCard();

            setTimeout(() => {
                // give back
                cardContainer.style.overflowX = "scroll";
            }, 0);
        }
    }, { passive: true });
}

/**
 *
 * @param {[Card]} cards
 */
function openCardSwipe(cards) {
    completedCardsCount = 0;
    progressElement.style.setProperty("--completed-count", completedCardsCount);
    swipeCards = cards;

    swipeFolderElement.innerText = cards[0].folder;

    let currentSwipeCard = swipeCards[Math.floor(Math.random() * swipeCards.length)];
    nextSwipeCard = swipeCards[Math.floor(Math.random() * swipeCards.length)];

    fillCard(swipeCardElement1, currentSwipeCard);
    fillCard(swipeCardElement2, nextSwipeCard);
}

function toNextSwipeCard() {
    fillCard(swipeCardElement1, nextSwipeCard);

    nextSwipeCard = swipeCards[Math.floor(Math.random() * swipeCards.length)];
    completedCardsCount++;
    progressElement.style.setProperty("--completed-count", completedCardsCount);

    fillCard(swipeCardElement2, nextSwipeCard);
}
