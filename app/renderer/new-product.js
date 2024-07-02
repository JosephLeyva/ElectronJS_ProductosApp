// Import the ipcRenderer module
const { ipcRenderer } = require('electron');

// DOM Elements
const form = document.querySelector('form');

// Event Listeners
form.addEventListener('submit', (e) => {
    const nameProduct = document.querySelector('#name').value;
    const priceProduct = document.querySelector('#price').value;
    const descriptionProduct = document.querySelector('#description').value;

    ipcRenderer.send('new-product', {
        name: nameProduct,
        price: priceProduct,
        description: descriptionProduct
    });
    e.preventDefault();
});