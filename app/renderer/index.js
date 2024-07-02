// Importing the electron module
const { ipcRenderer } = require('electron');

// DOM elements
const products = document.querySelector('#products');

// Functions
function createProductTemplate(product) {
    return `
        <div class="col-sm-4 p-2">
            <div class="card text-center">
               <div class="card-header">
                    <h5 class="card-title">${product.name}</h5>
               </div>
               <div class="card-body">
                    <p class="card-text">Description: ${product.description}</p>
                    <hr>
                    <p class="card-text">Price: $${product.price}</p>
               </div>
               <div class="card-footer">
                    <button class="btn btn-danger btn-sm">Delete</button>
               </div>
            </div>
        </div>
    `;
}

function addProduct(product) {
    const newProductTemplate = createProductTemplate(product);
    products.innerHTML += newProductTemplate;
}

// Event listeners
ipcRenderer.on('new-product', (e, newProduct) => {
    addProduct(newProduct);
});

ipcRenderer.on('remove-all-products', () => {
    products.innerHTML = '';
});

products.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-danger')) {
        e.target.parentElement.parentElement.parentElement.remove();
    }
});