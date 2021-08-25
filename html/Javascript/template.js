const webLinks = {
    "home": ["", "Home"],
    "projects": ["projects", "Projects", true, true],
    "mods": ["mods", "Mods", true, true],
    "art": ["art", "Art", true, true],
    "portfolio": ["portfolio", "Portfolio", true, true],
    "contact": ["contact", "Contact", true, true],
    "deepworld": ["deepworld", "Deepworld", true, true]
};
const rewriteLinksOn = false;

function loadWebLinks(element, socket, currentPage) {
    for (var i = 0; i < Object.keys(webLinks).length; ++i) {
        const currentWebLink = webLinks[Object.keys(webLinks)[i]];
        const listElement = document.createElement("li");
        listElement.classList.add("nav-item");
        const linkElement = document.createElement("a");
        linkElement.classList.add("nav-link"
        );
        if (Object.keys(webLinks)[i] != currentPage)
            if (rewriteLinksOn)
                linkElement.href = `${socket}${currentWebLink[0]}`;
            else
                linkElement.href = `${socket}${currentWebLink[2] ? "Pages" : ""}/${currentWebLink[0]}${currentWebLink[3] ? ".html" : ""}`;
        linkElement.innerText = currentWebLink[1];
        listElement.appendChild(linkElement);
        document.querySelector(element).appendChild(listElement);
    }
}
