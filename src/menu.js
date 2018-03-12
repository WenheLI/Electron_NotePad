const { BrowserWindow, shell  } = require('electron');

const template = [{},
    {
        label: 'File',
        submenu: [],
    },
    {
        label: 'Edit',
        submenu: [{
            label: 'Undo',
            accelerator: 'CmdOrCtrl+Z',
            role: 'undo',
        }, {
            label: 'Redo',
            accelerator: 'Shift+CmdOrCtrl+Z',
            role: 'redo',
        }, {
            label: 'Cut',
            accelerator: 'CmdOrCtrl+X',
            role: 'cut',
        }, {
            label: 'Copy',
            accelerator: 'CmdOrCtrl+C',
            role: 'copy',
        }, {
            label: 'Paste',
            accelerator: 'CmdOrCtrl+V',
            role: 'paste',
        }, {
            label: 'Select All',
            accelerator: 'CmdOrCtrl+A',
            role: 'selectall',
        }],
    }, {
        label: 'View',
        submenu: [{
            label: 'Reload',
            accelerator: 'CmdOrCtrl+R',
            click: (item, focusedWindow) => {
                if (focusedWindow) {
                    // on reload, start fresh and close any old
                    // open secondary windows
                    if (focusedWindow.id === 1) {
                        BrowserWindow.getAllWindows().forEach((win) => {
                            if (win.id > 1) win.close();
                        });
                    }
                    focusedWindow.reload();
                }
            },
        }, {
            label: 'Toggle Full Screen',
            accelerator: (() => {
                if (process.platform === 'darwin') {
                    return 'Ctrl+Command+F';
                }
                return 'F11';
            })(),
            click: (item, focusedWindow) => {
                if (focusedWindow) {
                    focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                }
            },
        }, {
            type: 'separator',
        }],
    }, {
        label: 'Help',
        role: 'help',
        submenu: [{
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize',
        }, {
            label: 'Close',
            accelerator: 'CmdOrCtrl+W',
            role: 'close',
        }, {
            type: 'separator',
        },
            {
                label: 'Learn More',
                click: () => {
                    shell.openExternal('http://steins.xin');
                },
            },
        ],
    }];

export {template}
