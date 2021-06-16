const webLinks = {
    "home": ["", "Home"],
    "projects": ["projects", "Projects"],
    "mods": ["mods", "Mods"],
    "art": ["art", "Art"],
    "portfolio": ["portfolio", "Portfolio"],
    "contact": ["contact", "Contact"],
    "deepworld": ["deepworld", "Deepworld"]
};

function loadWebLinks(element, socket, currentPage) {
    for (var i = 0; i < Object.keys(webLinks).length; ++i) {
        const currentWebLink = webLinks[Object.keys(webLinks)[i]];
        const listElement = document.createElement("li");
        listElement.classList.add("nav-item");
        const linkElement = document.createElement("a");
        linkElement.classList.add("nav-link");
        if (Object.keys(webLinks)[i] != currentPage)
            linkElement.href = socket + currentWebLink[0];
        linkElement.innerText = currentWebLink[1];
        listElement.appendChild(linkElement);
        document.querySelector(element).appendChild(listElement);
    }
}
