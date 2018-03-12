import { app, BrowserWindow, Menu, MenuItem, dialog, ipcMain } from 'electron';

import {template} from './menu';

let url = require('url');
let path = require("path");

let safeExit = false;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../build/index.html'), protocol: 'file:', slashes: true }));

  // mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
    let menu = Menu.buildFromTemplate(template);
    menu.items[1].submenu.append(new MenuItem({
        label: "New",
        click(){
            mainWindow.webContents.send('action', 'new');
        },
        accelerator: 'CmdOrCtrl+N'
    }));

    menu.items[1].submenu.append(new MenuItem({
        label: "Open",
        click(){
            mainWindow.webContents.send('action', 'open');
        },
        accelerator: 'CmdOrCtrl+O'
    }));

    menu.items[1].submenu.append(new MenuItem({
        label: "Save",
        click(){
            mainWindow.webContents.send('action', 'save');
        },
        accelerator: 'CmdOrCtrl+S'
    }));

    menu.items[1].submenu.append(new MenuItem({
        type: 'separator'
    }));

    menu.items[1].submenu.append(new MenuItem({
        role: 'quit'
    }));

    Menu.setApplicationMenu(menu);

  // Emitted when the window is closed.

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.on('close', (e) => {
      if (!safeExit) {
          e.preventDefault();
          mainWindow.webContents.send('action', 'exiting');
      }
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
  });
};




// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});



ipcMain.on('reqaction', (e, arg) => {
   switch (arg){
       case 'exit':
           //can save the current condition for reopening
           safeExit = true;
           app.quit();
           break;
   }
});
