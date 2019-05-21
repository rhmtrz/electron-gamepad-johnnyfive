const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const five = require('johnny-five');


let win;
let board = new five.Board();

const createWindow = () => {
	console.log('Window Opened')
	win = new BrowserWindow({width: 900, height: 600});
	
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'src/index.html'),
		protocol: 'file:',
		slashes: true,
	}))
  
  win.webContents.openDevTools();
	
	win.on('closed', () => {
		win = null;
	});
  
  board.on('ready', () => {
    let led = new five.Led(13)
    let servo3 = new five.Servo(3)
    let servo5 = new five.Servo(5)
    let servo6 = new five.Servo(6)
    
    ipcMain.on('turn-on', (event, arg) => {
      console.log('---turn-on---')
      console.log(event, arg)
      led.on()
    })
    
    ipcMain.on('turn-off', () => {
      led.off()
    })
    
    ipcMain.on('servo-to3', (event, arg) => {
      servo3.to(arg * 90 + 90);
      console.log('data is: ', arg)
    });
    
    ipcMain.on('servo-to5', (event, arg) => {
      servo5.to(arg * 90 + 90);
      console.log('data is: ', arg)
    });
    
    ipcMain.on('servo-to6', (event, arg) => {
      servo6.to(arg * 90 + 90);
      console.log('data is: ', arg)
    });
  })
}

app.on('ready', createWindow)
