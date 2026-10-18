const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const BotConfig = require('./BotConfig');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    title: 'TFYM Control Center'
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handlers for Bot Control
ipcMain.on('update-settings', (event, settings) => {
  console.log('Updating bot settings:', settings);
  BotConfig.set('training.myUsername', settings.myUsername);
  BotConfig.set('training.mode', settings.trainMode);
});

ipcMain.on('get-bot-status', (event) => {
  event.reply('bot-status-reply', {
    status: 'Active',
    training: BotConfig.get('training.enabled'),
    sniffing: true,
    messagesCaptured: 0 // This would be wired to the actual sniffer count
  });
});

