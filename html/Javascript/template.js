const webLinks = {
    "home": ["", "Home", false],
    "projects": ["projects", "Projects", true],
    "mods": ["mods", "Mods", true],
    "art": ["art", "Art", true],
    "portfolio": ["portfolio", "Portfolio", true],
    "contact": ["contact", "Contact", true],
    "deepworld": ["deepworld", "Deepworld", true]
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
                linkElement.href = `${socket}Pages/${currentWebLink[0]}${currentWebLink[2] ? ".html" : ""}`;
        linkElement.innerText = currentWebLink[1];
        listElement.appendChild(linkElement);
        document.querySelector(element).appendChild(listElement);
    }
}
