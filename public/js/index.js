let alist = document.querySelectorAll('a');
let frame = document.querySelector('.contentFrame');

for (var el = 0; el < alist.length; el++) {
    let cel = alist[el];
    cel.addEventListener('click', (ev) => {
        frame.src = `./pages/${cel.innerText}.html`;
    });
}