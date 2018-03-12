import { ipcRenderer, remote } from 'electron';
const { Menu, MenuItem, dialog } = remote;

let currentFile = null;
let isSaved = true;
let txtEditors = document.getElementsByTagName('textarea');

document.title = "Notepad - Untitled";

const contextMenuTemplate=[
    { role: 'undo' },
    { role: 'redo' },
    { type: 'separator' },
    { role: 'cut' },
    { role: 'copy' },
    { role: 'paste' },
    { role: 'delete' },
    { type: 'separator' },
    { role: 'selectall' }
];
const contextMenu=Menu.buildFromTemplate(contextMenuTemplate);

for (let i = 0; i < txtEditors.length; i++) {
    let it = txtEditors[i];
    console.log(it);
    it.addEventListener('contextmenu', (e)=>{
        e.preventDefault();
        contextMenu.popup(remote.getCurrentWindow());
    });

    it. oninput=(e)=>{
        if(isSaved) document.title += " *";
        isSaved=false;
    };
}


ipcRenderer.on('action', (event, arg) => {
    switch(arg){
        // case 'new':
        //     askSaveIfNeed();
        //     currentFile=null;
        //     txtEditor.value='';
        //     document.title = "Notepad - Untitled";
        //     //remote.getCurrentWindow().setTitle("Notepad - Untitled *");
        //     isSaved=true;
        //     break;
        case 'open':
            askSaveIfNeed();
            const files = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
                filters: [
                    { name: "Text Files", extensions: ['txt', 'js', 'html', 'md'] },
                    { name: 'All Files', extensions: ['*'] } ],
                properties: ['openFile']
            });
            if(files){
                currentFile=files[0];
                const txtRead=readText(currentFile);
                txtEditor.value=txtRead;
                document.title = "Notepad - " + currentFile;
                isSaved=true;
            }
            break;
        case 'save':
            saveCurrentDoc();
            break;
        case 'exiting':
            askSaveIfNeed();
            ipcRenderer.sendSync('reqaction', 'exit');
            break;
    }
});

function readText(file){
    const fs = require('fs');
    return fs.readFileSync(file, 'utf8');
}
function saveText(text, file){
    const fs = require('fs');
    fs.writeFileSync(file, text);
}

function saveCurrentDoc(){
    if(!currentFile){
        const file = remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
            filters: [
                { name: "Text Files", extensions: ['txt', 'js', 'html', 'md'] },
                { name: 'All Files', extensions: ['*'] } ]
        });
        if(file) currentFile=file;
    }
    if(currentFile){
        const txtSave=txtEditor.value;
        saveText(txtSave, currentFile);
        isSaved=true;
        document.title = "Notepad - " + currentFile;
    }
}

function askSaveIfNeed(){
    if(isSaved) return;
    const response=dialog.showMessageBox(remote.getCurrentWindow(), {
        message: 'Do you want to save the current document?',
        type: 'question',
        buttons: [ 'Yes', 'No' ]
    });
    if(response==0) saveCurrentDoc();
}

