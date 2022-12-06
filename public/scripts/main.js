let copyright = 'Copyright © Tyler S (2023) - sv0.0.1';
let pages = ['home', 'art', 'projects'];
let loc = pages[0];
let linkrefs = [];

function drawLinkNavi() {
    let parent = document.querySelector('.navCollection');
    for (let p = 0; p < pages.length; p++) {
        let el = document.createElement('div');
        let innerEl = document.createElement('a');
        el.className = 'navLink';
        innerEl.className = 'navSubLink';
        innerEl.dataset.linkpage = pages[p];
        innerEl.innerText = pages[p][0].toUpperCase() + pages[p].substring(1);
        el.appendChild(innerEl);
        linkrefs.push(innerEl);
        parent.appendChild(el);
    }
}

function refreshLinks() {
    let links = document.querySelectorAll('.navSubLink');
    links.forEach((el) => {
        if (el.dataset.linkpage == loc)
            el.classList.add('active');
        else
            el.classList.remove('active');
    });
}

function addLinkFunctionality() {
    let links = document.querySelectorAll('.navSubLink');
    links.forEach((el) => {
        el.addEventListener('click', () => {
            location.hash = loc = el.dataset.linkpage;
            refreshLinks();
        });
    });
}

window.onload = () => {
    document.querySelector('.copyright').innerText = copyright;
    if (location.hash)
        loc = location.hash.replace('#', '').toLowerCase();
    drawLinkNavi();
    refreshLinks();
    addLinkFunctionality();
};