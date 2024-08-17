/**
 * @param {[Card]} cards
 */
function initializeNavigation(cards) {
    const nav = document.getElementsByTagName("nav")[0];

    const folders = getFolders(cards);

    for (const folder of folders) {
        const folderContainer = document.createElement("section");
        const folderName = document.createElement("label");
        const folderList = document.createElement("label");

        folderName.innerText = folder;
        folderName.setAttribute("for", "card-swipe");
        folderName.addEventListener("click", () => openCardSwipe(getFolderCards(folder, cards)));

        folderList.setAttribute("for", "card-list");
        folderList.addEventListener("click", () => openCardList(getFolderCards(folder, cards)));

        folderContainer.replaceChildren(folderName, folderList);

        nav.appendChild(folderContainer);
    }
}

/**
 * @param {[Card]} cards
 * @returns {[Folder]}
 */
function getFolders(cards) {
    const folders = cards.map(c => c.folder);
    return [...new Set(folders)].sort();
}

/**
 * @param {Folder} folder
 * @param {[Card]} cards
 */
function getFolderCards(folder, cards) {
    return cards.filter(c => c.folder === folder);
}
