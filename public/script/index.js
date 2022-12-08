const isMobile =
    navigator.userAgent.indexOf("Mobile") !== -1 || 
    navigator.userAgent.indexOf("iPhone") !== -1 || 
    navigator.userAgent.indexOf("Android") !== -1 || 
    navigator.userAgent.indexOf("Windows Phone") !== -1 ||
    window.innerHeight > window.innerWidth;

const $ = (s) => document.querySelector(s);

if (isMobile) {
    $('artiicle').classList.add('mobile');
    $('.flexboxCollection').classList.add('mobile');
}