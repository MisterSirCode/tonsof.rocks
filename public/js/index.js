const { isMainThread } = require("worker_threads");

let alist = document.querySelectorAll('.navigation a');
let frame = document.querySelector('.contentFrame');
let cover = document.querySelector('.contentCover');
let isLoaded = true;
let pageLoading = false;

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

for (var el = 0; el < alist.length; el++) {
    let cel = alist[el];
    cel.addEventListener('click', (ev) => {
        loadPage(cel.innerText);
    });
}

frame.addEventListener('load', () => {
    endCover();
})

function loadPage(name) {
    if (pageLoading) return;
    startCover();
    pageLoading = true;
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        frame.innerHTML = this.responseXML.documentElement.innerHTML;
        let imgsLoded = 0;
        let imgs = frame.querySelectorAll('img');
        let totalImgs = imgs.length;
        for (i in imgs) {
            imgs[i].addEventListener("load", (e) => {
                imgsLoded++;
                if (imgsLoded == totalImgs) {
                    endCover();
                    pageLoading = false;
                }
            });
        }
    };
    delay(125).then(() => {
        location.hash = name;
        xhr.open('get', `./pages/${name}.html`);
        xhr.responseType = 'document';
        xhr.send();
    });
}

function startCover() {
    for (var el = 0; el < alist.length; el++) {
        let cel = alist[el];
        cel.classList.add('noclick');
    }
    cover.classList.add('visible');
}

function endCover() {
    for (var el = 0; el < alist.length; el++) {
        let cel = alist[el];
        cel.classList.remove('noclick');
    }
    cover.classList.remove('visible');
}