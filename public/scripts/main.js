let copyright = 'Copyright © Tyler S (2023) - sv0.0.1';
let pages = ['home', 'art', 'projects'];
let loc = pages[0];
let linkrefs = [];
let pageLoading = false;
let innerPage = document.querySelector('.inlayPage');
let preloaded = false;

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

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
            if (loc == el.dataset.linkpage) return;
            location.hash = loc = el.dataset.linkpage;
            refreshLinks();
            fadeOut();
            delay(100).then(() => {
                swapPage(loc).then(() => {
                    refreshLinks();
                    fadeIn();
                });
            });
        });
    });
}

function fadeIn() {
    innerPage.classList.remove('hidden');
}

function fadeOut() {
    innerPage.classList.add('hidden');
}

function swapPage(path) {
    return new Promise(resolve => {
        if (pageLoading) return;
        pageLoading = true;
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
            innerPage.innerHTML = this.responseXML.documentElement.innerHTML;
            let imgsLoded = 0;
            let imgs = innerPage.querySelectorAll('img');
            let totalImgs = imgs.length;
            if (totalImgs == 0) {
                pageLoading = false;
                resolve(true);
            } else {
                for (let i = 0; i < totalImgs; i++) {
                    imgs[i].addEventListener("load", (e) => {
                        imgsLoded++;
                        if (imgsLoded == totalImgs) {
                            pageLoading = false;
                            resolve(true);
                        }
                    });
                }
            }
        };
        xhr.open('get', `./pages/${path}.html`);
        xhr.responseType = 'document';
        xhr.send();
    });
}

window.onload = async () => {
    document.querySelector('.copyright').innerText = copyright;
    if (location.hash)
        loc = location.hash.replace('#', '').toLowerCase();
    delay(100).then(() => {
        swapPage(loc).then(() => {
            drawLinkNavi();
            refreshLinks();
            addLinkFunctionality();
            fadeIn();
        });
    });
};