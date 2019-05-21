const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');


let win;

const createWindow = () => {
	console.log('Window Opened')
	win = new BrowserWindow({});
	
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'src/index.html'),
		protocol: 'file:',
		slashes: true,
	}))
	
	win.on('closed', () => {
		win = null;
	})
}

app.on('ready', createWindow)
