let swipeCards;
let cardSwipe;
let swipeCardElement1;
let swipeCardElement2;
let nextSwipeCard;
let completedCards;
let progressElement;

function initializeSwipeCard() {
    cardSwipe = document.getElementById("card-swipe").nextElementSibling.children[1];
    progressElement = cardSwipe.nextElementSibling;
    swipeCardElement1 = createCard();
    swipeCardElement2 = createCard();
    cardSwipe.replaceChildren(
        swipeCardElement1,
        swipeCardElement2
    )

    cardSwipe.addEventListener("touchstart", () => {
        motionCompleted = false;
    }, { passive: true });
    cardSwipe.addEventListener("touchend", () => {
        motionCompleted = true;
    }, { passive: true });

    cardSwipe.addEventListener("scroll", (e) => {
        if (cardSwipe.scrollLeft > window.innerWidth / 2 && motionCompleted) {
            // hijack scroll
            cardSwipe.style.overflowX = "hidden";
            cardSwipe.scrollLeft = 0;
            motionCompleted = false;

            toNextSwipeCard();

            setTimeout(() => {
                // give back
                cardSwipe.style.overflowX = "scroll";
            }, 0);
        }
    }, { passive: true });
}

/**
 *
 * @param {[Card]} cards
 */
function openCardSwipe(cards) {
    completedCards = 0;
    progressElement.style.setProperty("--completed-count", completedCards);
    swipeCards = cards;

    const cardSwipeContainer = document.getElementById("card-swipe").nextElementSibling;
    cardSwipeContainer.children[0].setAttribute("data-folder", swipeCards[0].folder);

    let currentSwipeCard = swipeCards[Math.floor(Math.random() * swipeCards.length)];
    nextSwipeCard = swipeCards[Math.floor(Math.random() * swipeCards.length)];

    fillCard(swipeCardElement1, currentSwipeCard);
    fillCard(swipeCardElement2, nextSwipeCard);
}

function toNextSwipeCard() {
    fillCard(swipeCardElement1, nextSwipeCard);

    nextSwipeCard = swipeCards[Math.floor(Math.random() * swipeCards.length)];
    completedCards++;
    progressElement.style.setProperty("--completed-count", completedCards);

    fillCard(swipeCardElement2, nextSwipeCard);
}
