/**
 * Generates a random key with the specified length and character types.
 * @param {number} length - The length of the key.
 * @param {boolean} includeUppercase - If it should include uppercase letters.
 * @param {boolean} includeLowercase - If it should include lowercase letters.
 * @param {boolean} includeNumbers - If it should include numbers.
 * @returns {string} The generated random key.
 * @throws {Error} If no character type is selected.
 */
// Generates a random key of the specified length, including the specified types of characters.
function generateRandomKey(length, includeUppercase, includeLowercase, includeNumbers) {
    // Create a string containing the characters to use when generating the key.
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    let characters = '';

    if (includeUppercase) characters += uppercase;
    if (includeLowercase) characters += lowercase;
    if (includeNumbers) characters += numbers;

    // Generate the key.
    let key = '';
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * characters.length);
        key += characters[index];
    }

    return key;
}

/**
 * Valida el formulario y habilita o deshabilita el botón de generación de claves en consecuencia.
 * @returns {boolean} Verdadero si el formulario es válido, falso de lo contrario.
 */

/*This code validates the form to ensure that the user has entered valid values for the number of
keys and the length of the keys. It also ensures that the length of the keys is between 6 and 20
and that the number of keys is between 1 and 10.*/
function validarFormulario() {
    const numKeys = parseInt(document.getElementById('numKeys').value, 10);
    const length = parseInt(document.getElementById('charKeys').value, 10);

    if (isNaN(length) || isNaN(numKeys)) {
        alert('Debes introducir valores válidos.');
        disableGenerateButton();
        return false;
    }
    if (length < 6 || length > 20) {
        alert("El número de caracteres debe ser mayor o igual a 6 y menor que 20.");
        disableGenerateButton();
        return false;
    }
    if (numKeys < 1 || numKeys > 10) {
        alert('El número de llaves debe ser mayor que 0 y menor que 10.');
        disableGenerateButton();
        return false;
    }

    enableGenerateButton();
    return true;
}

// This code disables the generate button so that the user cannot click it.
function disableGenerateButton() {
    const generateButton = document.querySelector('.generate-button');
    if (generateButton) {
        generateButton.disabled = true;
        console.log('disabled button');
    } else {
        console.error('generateButton not found');
    }
}

function enableGenerateButton() {
    const generateButton = document.querySelector('.generate-button');
    if (generateButton) {
        generateButton.disabled = false;
        console.log('enabled button');
    } else {
        console.error('generateButton not found');
    }
}

function generateKeys() { //Genera las llaves
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;

    if (validarFormulario() === false) return;

    if (includeLowercase === false && includeUppercase === false && includeNumbers === false) {
        const keysTable = document.getElementById('keysTable');
        keysTable.innerHTML = '';

        keysTable.textContent = 'Debe seleccionar al menos un tipo de caracter.';
        return;
    }

    const numKeys = parseInt(document.getElementById('numKeys').value, 10);
    const length = parseInt(document.getElementById('charKeys').value, 10);
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


function displayKeys(keys) { //Muestra las llaves
    const keysTable = document.getElementById('keysTable');
    keysTable.innerHTML = '';

    if (keys.length > 0) { //Si hay llaves, se muestran en una tabla
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
        } //Se recorre el array de llaves y se muestran en la tabla

        keysTable.appendChild(table);
    }
    else {
        keysTable.textContent = 'No hay llaves para mostrar.';
        return;
    }
}

function downloadKeys() { //Descarga las llaves
    const keys = [];
    const tableRows = document.querySelectorAll('#keysTable table tr');

    tableRows.forEach(row => { //Se recorre la tabla y se obtienen las llaves
        const key = row.cells[1].textContent;
        if (key !== 'License Key') {
            keys.push(key);
        }
    });

    if (keys.length > 0) { //Se crea un archivo con las llaves
        const formattedKeys = keys.join('\n');
        const blob = new Blob([formattedKeys], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'license_keys.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        alert('No hay llaves para descargar.');
    }
}


// IIFE to initialize the app.

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

(() => { //Generar llaves
    const generateKeysButton = document.querySelector('.generate-button');
    generateKeysButton.addEventListener('click', () => {
        generateKeys();
    });
})();

(() => { //Descargar llaves
    const generateKeysButton = document.querySelector('.download-button');
    generateKeysButton.addEventListener('click', () => downloadKeys());
})(); 

(() => { //Validar formulario
    const numKeys = document.getElementById("numKeys");
    const charKeys = document.getElementById("charKeys");
    let timeout;

    function debounce(func, delay) {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
    }

    function onInput() {
        debounce(() => {
            validarFormulario();
        }, 300);
    }

    numKeys.addEventListener('input', onInput);
    charKeys.addEventListener('input', onInput);
})();