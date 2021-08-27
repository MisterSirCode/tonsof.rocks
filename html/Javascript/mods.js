const modLinks = {
    "Terraria Mods": ["", ""]
};

function loadWebLinks(element, socket, currentPage) {
    for (var i = 0; i < Object.keys(modLinks).length; ++i) {
        const currentWebLink = modLinks[Object.keys(modLinks)[i]];
        const listElement = document.createElement("li");
        listElement.classList.add("nav-item");
        const linkElement = document.createElement("a");
        linkElement.classList.add("nav-link"
        );
        if (Object.keys(webLinks)[i] != currentPage)
            if (rewriteLinksOn)
                linkElement.href = `${socket}${currentWebLink[0]}`;
            else
                linkElement.href = `${socket}${currentWebLink[2] ? "Pages/" : ""}${currentWebLink[0]}${currentWebLink[3] ? ".html" : ""}`;
        linkElement.innerText = currentWebLink[1];
        listElement.appendChild(linkElement);
        document.querySelector(element).appendChild(listElement);
    }
}
