const isMobile =
    navigator.userAgent.indexOf("Mobile") !== -1 || 
    navigator.userAgent.indexOf("iPhone") !== -1 || 
    navigator.userAgent.indexOf("Android") !== -1 || 
    navigator.userAgent.indexOf("Windows Phone") !== -1;

const $ = (s) => document.querySelector(s);
const article = $('article');
const collect = $('.flexboxCollection');
const links = $('.linkGrid');

function refresh() {
    if (isMobile || window.innerHeight > window.innerWidth) {
        article.classList.add('mobile');
        collect.classList.add('mobile');
        // if (window.innerWidth < 400) 
        //     links.classList.add('mobile');
    } else {
        article.classList.remove('mobile');
        collect.classList.remove('mobile');
        links.classList.remove('mobile');
    }
}

window.addEventListener('DOMContentLoaded', refresh);
window.addEventListener('resize', refresh);