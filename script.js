let currentFolder;
let folderElement;
let main;
let button1;
let button2;
let motionCompleted = false;
let completed = 0;
let progressElement;

document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
});

window.onload = async () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./service-worker.js");
    }

    folderElement = document.getElementById("folder");
    main = document.getElementsByTagName("main")[0];
    button1 = main.children[0];
    button2 = main.children[1];
    progressElement = document.getElementById("progress");

    const cards = await (await fetch("cards.json")).json();

    const nav = document.getElementsByTagName("nav")[0];
    const folders = [...new Set(cards.map(card => card.folder))].sort();

    for (let folder of folders) {
        let button = document.createElement("label");
        button.innerText = folder;
        button.setAttribute("for", "navigation-toggle");
        button.onclick = () => {
            openFolder(folder, cards.filter(card => card.folder === folder));
        }
        nav.appendChild(button);
    }

    main.addEventListener("touchstart", () => {
        motionCompleted = false;
    }, { passive: true });
    main.addEventListener("touchend", () => {
        motionCompleted = true;
    }, { passive: true });

    main.addEventListener("scroll", (e) => {
        if (main.scrollLeft > window.innerWidth / 2 && motionCompleted) {
            // hijack scroll
            main.style.overflowX = "hidden";
            main.scrollLeft = 0;
            motionCompleted = false;

            next();

            setTimeout(() => {
                // give back
                main.style.overflowX = "scroll";
            }, 0);
        }
    }, { passive: true });
}

function openFolder(folderName, folder) {
    currentFolder = folder;
    folderElement.innerText = folderName;
    button1.classList.remove("flip");

    setCard(button1);
    setCard(button2);
}

function flip() {
    button1.classList.toggle("flip");
}

function next() {
    button1.classList.remove("flip");
    button1.setAttribute("data-front", button2.getAttribute("data-front"));
    button1.setAttribute("data-back", button2.getAttribute("data-back"));

    completed++;
    progressElement.style.setProperty("--completed-count", completed);

    setCard(button2);
}

function setCard(button) {
    let card = currentFolder[Math.floor(Math.random() * currentFolder.length)];
    let backContent;
    if(card.hint !== null && card.hint !== "") {
        backContent = `${card.hint}\n\n${card.back || "no content"}`;
    } else {
        backContent = card.back || "no content"
    }

    button.setAttribute("data-front", card.front || "no content");
    button.setAttribute( "data-back", backContent);
}
