let alist = document.querySelectorAll('.navigation a');
let frame = document.querySelector('.contentFrame');
let cover = document.querySelector('.contentCover');
let curpage = "";
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

function loadPage(name) {
    if (pageLoading) return;
    document.title = "Loading...";
    startCover();
    pageLoading = true;
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        frame.innerHTML = this.responseXML.documentElement.innerHTML;
        let imgsLoded = 0;
        let imgs = frame.querySelectorAll('img');
        let totalImgs = imgs.length;
        if (totalImgs == 0) {
            endCover();
            pageLoading = false;
        } else {
            for (let i = 0; i < totalImgs; i++) {
                imgs[i].addEventListener("load", (e) => {
                    imgsLoded++;
                    if (imgsLoded == totalImgs) {
                        endCover();
                        pageLoading = false;
                    }
                });
            }
        }
    };
    delay(125).then(() => {
        location.hash = name;
        xhr.open('get', `./pages/${name}.html`);
        xhr.responseType = 'document';
        xhr.send();
        curpage = name;
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
    document.title = document.querySelector("div.article.centered").getAttribute("_title");
    for (var el = 0; el < alist.length; el++) {
        let cel = alist[el];
        cel.classList.remove('noclick');
    }
    cover.classList.remove('visible');
}