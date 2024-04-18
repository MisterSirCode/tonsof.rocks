document.querySelector('.startCode').addEventListener('input', (el) => {
    let strings = el.data.split(' + I ');
    strings[1] = strings[1].substring(1, strings[1].length - 1);
    let fixed = [];
    strings.forEach(string => {
        fixed.push(
            string.replace(/Im\[(\w)\]/g, '$1.y')
            .replace(/Re\[(\w)\]/g, '$1.x')
            .replace(/(\w\.\w)\^2/g, '($1 * $1)')
            .replace(/(\w|\d)\s(\w|\d)/g, `$1 * $2`)
            .replace(/(\d)\s/g, '$1.0 ')
            );
    });
    document.querySelector('.endCode').textContent = `vec2(${fixed[0]}, ${fixed[1]})`;
});