let el = document.querySelector('.startCode');
el.addEventListener('input', (elm) => {
    let strings = elm.target.value
        .replace(/ \+ (\d) i /g, 'i$1 * ')
        .replace(/Im\[(\w)\]/g, '$1.y')
        .replace(/Im\((\w)\)/g, '$1.y')
        .replace(/Re\[(\w)\]/g, '$1.x')
        .replace(/Re\((\w)\)/g, '$1.x')
        .replace(/(\w\.\w)\^2/g, '$1 * $1')
        .replace(/(\w|\d)\s(\w|\d)/g, `$1 * $2`)
        .replace(/([0xy\)])\s(\w|\d|\()/g, '$1 * $2')
        .replace(/arg\((\w)\)/g, 'atan($1.y, $1.x)')
        .replace(/(\d)\s/g, '$1.0 ')
    console.log(strings);
    let fixed = strings.split('i');
    document.querySelector('.endCode').textContent = (`        z = vec2(${fixed[0]},\n        ${fixed[1]});`).replace(/c + | + c/g, '');
});