Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
}

Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key));
}

class DynamicElementTable {
    constructor(api, table, data) {
        this.api = api;
        this.table = table;
        this.data = data;
        console.log(data);
    }

    createTable() {
        let w = 18;
        let h = 10;
        this.table.innerHTML = '';
        let tableBody = document.createElement('tbody');
        let elsPos = [];
        for (let yf = 0; yf < h; yf++) {
            elsPos[yf] = [];
            for (let xf = 0; xf < w; xf++) {
                elsPos[yf][xf] = [];
            }
        }
        for (let e = 0; e < 118; e++) {
            let el = this.api.elements[e];
            if (el[4]) {
                let y = el[4][0];
                let x = el[4][1];
                if (elsPos[y])
                    if (elsPos[y][x])
                        elsPos[y][x] = el;
            }
        }
        for (let y = 0; y < h; y++) {
            let tr = document.createElement('tr');
            tableBody.appendChild(tr);
            for (let x = 0; x < w; x++) {
                let td = document.createElement('td');
                let el = elsPos[y][x];
                if (el[1]) {
                    let container = document.createElement('div');
                    container.className = 'acon';
                    let number = document.createElement('div');
                    number.className = 'anum';
                    let symbol = document.createElement('div');
                    symbol.className = 'asym';
                    let name = document.createElement('div');
                    name.className = 'aname';
                    number.innerText = el[0];
                    symbol.innerText = el[1];
                    let nameText = Array.isArray(el[2]) ? el[2][0] : el[2];
                    name.innerText = nameText;
                    if (nameText.length > 9)
                        name.classList.add('squish');
                    td.classList.add(el[5]);
                    td.classList.add(`id${el[0]}`);
                    container.appendChild(number);
                    container.appendChild(symbol);
                    container.appendChild(name);
                    if (this.data[el[0]] == true) {
                        td.classList.add('have');
                    } 
                    if (el[6])
                        td.classList.add('impossible');
                    else {
                        container.addEventListener('click', () => {
                            this.toggleElement(el[0]);
                        });
                    }
                    td.appendChild(container);
                }
                tr.appendChild(td);
            }
        }
        this.table.appendChild(tableBody);
    }

    toggleElement(id) {
        let el = document.querySelector(`.id${id}`);
        if (el.classList.contains('have')) {
            el.classList.remove('have');
            this.data[id] = false;
        } else {
            el.classList.add('have');
            this.data[id] = true;
        }
        localStorage.setObj('tableData', this.data);
    }
}

// API

const _ = {
    'elements': [
        [1, 'h', 'hydrogen', '1.008', [0, 0], 'rnmet', false, 0],
        [2, 'he', 'helium', '4.0026', [0, 17], 'ngas', false, 0],
        [3, 'li', 'lithium', '6.94', [1, 0], 'amet', false, 0],
        [4, 'be', 'beryllium', '9.0122', [1, 1], 'aemet', false, 0],
        [5, 'b', 'boron', '10.81', [1, 12], 'metld', false, 0],
        [6, 'c', 'carbon', '12.011', [1, 13], 'rnmet', false, 0],
        [7, 'n', 'nitrogen', '14.007', [1, 14], 'rnmet', false, 0],
        [8, 'o', 'oxygen', '15.999', [1, 15], 'rnmet', false, 0],
        [9, 'f', 'flourine', '18.998', [1, 16], 'rnmet', false, 0],
        [10, 'ne', 'neon', '20.180', [1, 17], 'ngas', false, 0],
        [11, 'na', ['sodium', 'natrium'], '22.990', [2, 0], 'amet', false, 0],
        [12, 'mg', 'magnesium', '24.305', [2, 1], 'aemet', false, 0],
        [13, 'al', 'aluminum', '26.982', [2, 12], 'ptmet', false, 0],
        [14, 'si', 'silicon', '28.085', [2, 13], 'metld', false, 0],
        [15, 'p', 'phosphorous', '30.974', [2, 14], 'rnmet', false, 0],
        [16, 's', 'sulfur', '32.06', [2, 15], 'rnmet', false, 0],
        [17, 'cl', 'chlorine', '35.45', [2, 16], 'rnmet', false, 0],
        [18, 'ar', 'argon', '39.948', [2, 17], 'ngas', false, 0],
        [19, 'k', ['potassium', 'kalium'], '39.098', [3, 0], 'amet', false, 0],
        [20, 'ca', 'calcium', '40.078', [3, 1], 'aemet', false, 0],
        [21, 'sc', 'scandium', '44.956', [3, 2], 'tmet', false, 0],
        [22, 'ti', 'titanium', '47.867', [3, 3], 'tmet', false, 0],
        [23, 'v', 'vanadium', '50.942', [3, 4], 'tmet', false, 0],
        [24, 'cr', 'chromium', '51.996', [3, 5], 'tmet', false, 0],
        [25, 'mn', 'manganese', '54.938', [3, 6], 'tmet', false, 0],
        [26, 'fe', ['iron', 'ferrum'], '55.845', [3, 7], 'tmet', false, 0],
        [27, 'co', 'cobalt', '58.933', [3, 8], 'tmet', false, 0],
        [28, 'ni', 'nickel', '58.693', [3, 9], 'tmet', false, 0],
        [29, 'cu', ['copper', 'cuprum'], '63.546', [3, 10], 'tmet', false, 0],
        [30, 'zn', 'zinc', '65.38', [3, 11], 'tmet', false, 0],
        [31, 'ga', 'gallium', '', [3, 12], 'ptmet', false, 0],
        [32, 'ge', 'germanium', '', [3, 13], 'metld', false, 0],
        [33, 'as', 'arsenic', '', [3, 14], 'metld', false, 0],
        [34, 'se', 'selenium', '', [3, 15], 'rnmet', false, 0],
        [35, 'br', 'bromine', '', [3, 16], 'rnmet', false, 0],
        [36, 'kr', 'krypton', '', [3, 17], 'ngas', false, 0],
        [37, 'rb', 'rubidium', '', [4, 0], 'amet', false, 0],
        [38, 'sr', 'strontium', '', [4, 1], 'aemet', false, 0],
        [39, 'y', 'yttrium', '', [4, 2], 'tmet', false, 0],
        [40, 'zr', 'zirconium', '', [4, 3], 'tmet', false, 0],
        [41, 'nb', 'niobium', '', [4, 4], 'tmet', false, 0],
        [42, 'mo', 'molybdenum', '', [4, 5], 'tmet', false, 0],
        [43, 'tc', 'tecnetium', '', [4, 6], 'tmet', false, 0],
        [44, 'ru', 'ruthentium', '', [4, 7], 'tmet', false, 0],
        [45, 'rh', 'rhodium', '', [4, 8], 'tmet', false, 0],
        [46, 'pd', 'palladium', '', [4, 9], 'tmet', false, 0],
        [47, 'ag', ['silver', 'argentum'], '', [4, 10], 'tmet', false, 0],
        [48, 'cd', 'cadmium', '', [4, 11], 'tmet', false, 0],
        [49, 'in', 'indium', '', [4, 12], 'ptmet', false, 0],
        [50, 'sn', ['tin', 'stannum'], '', [4, 13], 'ptmet', false, 0],
        [51, 'sb', ['antimony', 'stibium'], '', [4, 14], 'metld', false, 0],
        [52, 'te', 'tellurium', '', [4, 15], 'metld', false, 0],
        [53, 'i', 'iodine', '', [4, 16], 'rnmet', false, 0],
        [54, 'xe', 'xenon', '', [4, 17], 'ngas', false, 0],
        [55, 'cs', 'caesium', '', [5, 0], 'amet', false, 0],
        [56, 'ba', 'barium', '', [5, 1], 'aemet', false, 0],
        [57, 'la', 'lanthanum', '', [8, 3], 'lan', false, 0],
        [58, 'ce', 'cerium', '', [8, 4], 'lan', false, 0],
        [59, 'pr', 'praseodymium', '', [8, 5], 'lan', false, 0],
        [60, 'nd', 'neodymium', '', [8, 6], 'lan', false, 0],
        [61, 'pm', 'promethium', '', [8, 7], 'lan', false, 0],
        [62, 'sm', 'samarium', '', [8, 8], 'lan', false, 0],
        [63, 'eu', 'europium', '', [8, 9], 'lan', false, 0],
        [64, 'gd', 'gadolinium', '', [8, 10], 'lan', false, 0],
        [65, 'tb', 'terbium', '', [8, 11], 'lan', false, 0],
        [66, 'dy', 'dysprosium', '', [8, 12], 'lan', false, 0],
        [67, 'ho', 'holmium', '', [8, 13], 'lan', false, 0],
        [68, 'er', 'erbium', '', [8, 14], 'lan', false, 0],
        [69, 'tm', 'thulium', '', [8, 15], 'lan', false, 0],
        [70, 'yb', 'ytterbium', '', [8, 16], 'lan', false, 0],
        [71, 'lu', 'lutetium', '', [8, 17], 'lan', false, 0],
        [72, 'hf', 'hafnium', '', [5, 3], 'tmet', false, 0],
        [73, 'ta', 'tantalum', '', [5, 4], 'tmet', false, 0],
        [74, 'w', ['tungsten', 'wolfram'], '', [5, 5], 'tmet', false, 0],
        [75, 're', 'rhenium', '', [5, 6], 'tmet', false, 0],
        [76, 'os', 'osmium', '', [5, 7], 'tmet', false, 0],
        [77, 'ir', 'iridium', '', [5, 8], 'tmet', false, 0],
        [78, 'pt', 'platinum', '', [5, 9], 'tmet', false, 0],
        [79, 'au', ['gold', 'aurum'], '', [5, 10], 'tmet', false, 0],
        [80, 'hg', ['mercury', 'hydrargyrum'], '', [5, 11], 'tmet', false, 0],
        [81, 'tl', 'thallium', '', [5, 12], 'ptmet', false, 0],
        [82, 'pb', ['lead', 'plumbum'], '', [5, 13], 'ptmet', false, 0],
        [83, 'bi', 'bismuth', '', [5, 14], 'ptmet', false, 0],
        [84, 'po', 'polonium', '', [5, 15], 'ptmet', false, 0],
        [85, 'at', 'astatine', '', [5, 16], 'metld', false, 0],
        [86, 'rn', 'radon', '', [5, 17], 'ngas', false, 0],
        [87, 'fr', 'francium', '', [6, 0], 'amet', true, 0],
        [88, 'ra', 'radium', '', [6, 1], 'aemet', false, 0],
        [89, 'ac', 'actinium', '', [9, 3], 'act', false, 0],
        [90, 'th', 'thorium', '', [9, 4], 'act', false, 0],
        [91, 'pa', 'protactinium', '', [9, 5], 'act', false, 0],
        [92, 'u', 'uranium', '', [9, 6], 'act', false, 0],
        [93, 'np', 'neptunium', '', [9, 7], 'act', false, 0],
        [94, 'pu', 'plutonium', '', [9, 8], 'act', false, 0],
        [95, 'am', 'americium', '', [9, 9], 'act', true, 0],
        [96, 'cm', 'curium', '', [9, 10], 'act', true, 0],
        [97, 'bk', 'berkelium', '', [9, 11], 'act', true, 0],
        [98, 'cf', 'californium', '', [9, 12], 'act', true, 0],
        [99, 'es', 'einsteinium', '', [9, 13], 'act', true, 0],
        [100, 'fm', 'fermium', '', [9, 14], 'act', true, 0],
        [101, 'md', 'mendelevium', '', [9, 15], 'act', true, 0],
        [102, 'no', 'nobelium', '', [9, 16], 'act', true, 0],
        [103, 'lr', 'lawrencium', '', [9, 17], 'act', true, 0],
        [104, 'rf', 'rutherfordium', '', [6, 3], 'tmet', true, 0],
        [105, 'db', 'dubnium', '', [6, 4], 'tmet', true, 0],
        [106, 'sg', 'seaborgium', '', [6, 5], 'tmet', true, 0],
        [107, 'bh', 'bohrium', '', [6, 6], 'tmet', true, 0],
        [108, 'hs', 'hassium', '', [6, 7], 'tmet', true, 0],
        [109, 'mt', 'meitnerium', '', [6, 8], 'unkn', true, 0],
        [110, 'ds', 'darmstadtium', '', [6, 9], 'unkn', true, 0],
        [111, 'rg', 'roentgenium', '', [6, 10], 'unkn', true, 0],
        [112, 'cn', 'copernicium', '', [6, 11], 'unkn', true, 0],
        [113, 'nh', 'nihomium', '', [6, 12], 'unkn', true, 0],
        [114, 'fl', 'flerovium', '', [6, 13], 'unkn', true, 0],
        [115, 'mc', 'moscovium', '', [6, 14], 'unkn', true, 0],
        [116, 'lv', 'livermorium', '', [6, 15], 'unkn', true, 0],
        [117, 'ts', 'tennessine', '', [6, 16], 'unkn', true, 0],
        [118, 'og', 'oganesson', '', [6, 17], 'unkn', true, 0],
    ]
};

let empty = [];

for (var i = 0; i < 118; i++) 
    empty[i] = false;

let data = localStorage.getObj('tableData') || empty;

const periodicTable = new DynamicElementTable(_, document.querySelector('table'), data);

periodicTable.createTable();