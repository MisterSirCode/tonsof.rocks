const webLinks = {
    "home": ["", "Home"],
    "projects": ["projects", "Projects", true, true],
    "mods": ["mods", "Mods", true, true],
    "portfolio": ["portfolio", "Portfolio", true, true],
    "contact": ["contact", "Contact", true, true],
    "art": [true, "https://sircode.artstation.com/projects", "Artstation"]
};
const rewriteLinksOn = false;

const copyrightLines = [
    "Copyright © 2022",
    "Owned and Distributed by Taylor Schneider",
    "Hosted with love by Google Firebase"
]

function loadWebLinks(element, socket, currentPage) {
    for (var i = 0; i < Object.keys(webLinks).length; ++i) {
        const currentWebLink = webLinks[Object.keys(webLinks)[i]];
        const listElement = document.createElement("li");
        listElement.classList.add("nav-item");
        const linkElement = document.createElement("a");
        linkElement.classList.add("nav-link");
        if (typeof currentWebLink[0] == "boolean") {
            linkElement.target = "_blank";
            linkElement.href = currentWebLink[1];
            linkElement.innerText = currentWebLink[2];
        } else {
            if (Object.keys(webLinks)[i] != currentPage)
                if (rewriteLinksOn)
                    linkElement.href = `${socket}${currentWebLink[0]}`;
                else
                    linkElement.href = `${socket}${currentWebLink[2] ? "Pages/" : ""}${currentWebLink[0]}${currentWebLink[3] ? ".html" : ""}`;
            linkElement.innerText = currentWebLink[1];
        }
        listElement.appendChild(linkElement);
        document.querySelector(element).appendChild(listElement);
    }
}

function loadCopyright(element) {
    let sel = document.querySelector(element);
    copyrightLines.forEach((e) => {
        const elm = document.createElement("div");
        elm.classList.add("footer-copyright");
        elm.classList.add("text-center");
        elm.innerText = e;
        sel.appendChild(elm);
    });
}
