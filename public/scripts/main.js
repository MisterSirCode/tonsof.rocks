let copyright = 'Copyright © Tyler S (2022) - SV 0.0.1';

function loadMods() {
    let body = document.body;
}

function makeLetterShadows() {
    document.querySelectorAll(".letterSh").forEach((el) => {
        let text = el.innerText;
        el.innerText = '';
        for (let i = 0; i < text.length; i++) {
            let letter = document.createElement('a');
            letter.className = 'sh';
            letter.innerText = text[i];
            el.appendChild(letter);
        }
    });
}

makeLetterShadows();