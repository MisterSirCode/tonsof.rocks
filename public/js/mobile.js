function mobile() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform) 
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    || navigator.userAgent.includes("Android");
}

if (mobile()) document.querySelectorAll('body, body *').forEach(element => { element.classList.add('mobile') });