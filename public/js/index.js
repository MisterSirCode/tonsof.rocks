let alist = document.querySelectorAll('a');
let frame = document.querySelector('.contentFrame');
let cover = document.querySelector('.contentCover');
let isLoaded = true;

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
    startCover();
    delay(250).then(() => {
        frame.src = `./pages/${name}.html`;
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