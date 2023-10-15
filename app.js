function generateRandomKey(length, includeUppercase, includeLowercase, includeNumbers) {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    let characters = '';

    if (includeUppercase) characters += uppercase;
    if (includeLowercase) characters += lowercase;
    if (includeNumbers) characters += numbers;

    if (characters === '') {
        console.error('Debe seleccionar al menos un tipo de caracter.');
        return '';
    }

    let key = '';
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * characters.length);
        key += characters[index];
    }

    return key;
}

function generateKeys() {
    const numKeys = parseInt(document.getElementById('numKeys').value, 10);
    const length = parseInt(document.getElementById('charKeys').value, 10);
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;

    if (numKeys <= 0) {
        console.error('El número de llaves debe ser mayor que cero.');
        return;
    }

    const keys = [];
    for (let i = 0; i < numKeys; i++) {
        const key = generateRandomKey(length, includeUppercase, includeLowercase, includeNumbers);
        if (key !== '') {
            keys.push(key);
        } else {
            i--;
        }
    }

    displayKeys(keys);
}


function displayKeys(keys) {
    const keysTable = document.getElementById('keysTable');
    keysTable.innerHTML = '';

    if (keys.length > 0) {
        const table = document.createElement('table');
        table.style.margin = 'auto';

        const headerRow = document.createElement('tr');
        const headerCell1 = document.createElement('th');
        const headerCell2 = document.createElement('th');
        headerCell1.textContent = 'No.';
        headerCell2.textContent = 'License Key';
        headerRow.appendChild(headerCell1);
        headerRow.appendChild(headerCell2);
        table.appendChild(headerRow);

        for (let i = 0; i < keys.length; i++) {
            const row = document.createElement('tr');
            const cell1 = document.createElement('td');
            const cell2 = document.createElement('td');
            cell1.textContent = i + 1;
            cell2.textContent = keys[i];
            row.appendChild(cell1);
            row.appendChild(cell2);
            table.appendChild(row);
        }

        keysTable.appendChild(table);
    }
}

function downloadKeys() {
    const keys = [];
    const tableRows = document.querySelectorAll('#keysTable table tr');

    tableRows.forEach(row => {
        const key = row.cells[1].textContent;
        if (key !== 'License Key') {
            keys.push(key);
        }
    });

    if (keys.length > 0) {
        const formattedKeys = keys.join('\n');
        const blob = new Blob([formattedKeys], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'license_keys.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        console.error('No hay llaves para descargar.');
    }
}

(() => {  //footer current Year
    const currentYearElement = document.getElementById("currentYear");

    const currentYearFooter = (currentYearElement) => {
        if (currentYearElement) { 
            const currentYear = new Date().getFullYear();
            currentYearElement.textContent = currentYear;
        }
    }

    currentYearFooter(currentYearElement);
})();

(() => {
    const generateKeysButton = document.querySelector('.generate-button');
    generateKeysButton.addEventListener('click', () => generateKeys());
})();
(() => {
    const generateKeysButton = document.querySelector('.download-button');
    generateKeysButton.addEventListener('click', () => downloadKeys());
})();