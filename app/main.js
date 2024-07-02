const { app, BrowserWindow, Menu, ipcMain } = require('electron');

let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile(__dirname + '/views/index.html');
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
    mainWindow.on('closed', () => {
        app.quit();
    });

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);
});

function createNewProductWindow() {
    newProductWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: 'Add New Product',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    newProductWindow.loadFile(__dirname + '/views/new-product.html');
    newProductWindow.on('closed', () => {
        newProductWindow = null;
    });
    newProductWindow.once('ready-to-show', () => {
        newProductWindow.show();
    });
    newProductWindow.setMenu(null); // Hide the menu from the new window
}

ipcMain.on('new-product', (e, newProduct) => {
    mainWindow.webContents.send('new-product', newProduct);
    newProductWindow.close();
});

const templateMenu = [
    {
        'label': 'File',
        'submenu': [
            {
                'label': 'New Product',
                'accelerator': process.platform == 'darwin' ? 'command+N' : 'Ctrl+N',
                'click'() {
                    // console.log('New Product');
                    createNewProductWindow();
                },
            },
            {
                'label': 'Remove All Products',
                'accelerator': process.platform == 'darwin' ? 'command+Z' : 'Ctrl+Z',
                'click'() {
                    mainWindow.webContents.send('remove-all-products');
                }
            },
            {
                'label': 'Exit',
                'accelerator': process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
                'click'() {
                    app.quit();
                }
            }
        ]
    },

];

// Add the name of the app in the menu bar on macOS
if (process.platform === 'darwin') {
    templateMenu.unshift({
        label: app.getName(),
    });
}

// If we are in development mode, we add the developer tools to the menu
if (process.env.NODE_ENV !== 'production') {
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/Hide Dev Tools',
                accelerator: 'Ctrl+D',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload',
            }
        ]
    });
}