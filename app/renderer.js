// Importing the electron module
const { ipcRenderer } = require('electron');

// DOM elements
const products = document.querySelector('#products');

// Event listeners
ipcRenderer.on('new-product', (e, newProduct) => {
    const newProductTemplate = `
        <div class="col-sm-4 p-2">
            <div class="card text-center">
               <div class="card-header">
                    <h5 class="card-title">${newProduct.name}</h5>
               </div>
               <div class="card-body">
                    <p class="card-text">Description: ${newProduct.description}</p>
                    <hr>
                    <p class="card-text">Price: $${newProduct.price}</p>
               </div>
               <div class="card-footer">
                    <button class="btn btn-danger btn-sm">Delete</button>
               </div>
            </div>
        </div>
    `;
    products.innerHTML += newProductTemplate;
    const btns = document.querySelectorAll('.btn.btn-danger');

    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.parentElement.remove();
        });
    });
});

ipcRenderer.on('remove-all-products', () => {
    products.innerHTML = '';
});