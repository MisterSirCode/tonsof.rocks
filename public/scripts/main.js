let copyright = 'Copyright © Tyler S (2023) - sv0.0.1';
let pages = ['home', 'art', 'projects'];

function drawLinkNavi() {
    let parent = document.querySelector('.navCollection');
    for (let p = 0; p < pages.length; p++) {
        let el = document.createElement('div');
        let innerEl = document.createElement('a');
        el.className = 'navLink';
        innerEl.className = 'navSubLink';
        innerEl.innerText = pages[p][0].toUpperCase() + pages[p].substring(1);
        el.appendChild(innerEl);
        parent.appendChild(el);
    }
}

window.onload = () => {
    document.querySelector('.copyright').innerText = copyright;
    drawLinkNavi();
};