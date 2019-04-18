const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;
const ipcMain = electron.ipcMain;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({ width: 960, height: 600, fullscreen: false });
  mainWindow.loadFile("./views/playground.html");
  mainWindow.on("closed", () => app.quit());
  mainWindow.webContents.openDevTools();

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function showProgramWindow() {
  mainWindow.loadFile("./views/playground.html");
}

function showMonitorWindow() {
  mainWindow.loadFile("./views/visualizer.html");
}

ipcMain.on("router", (event, route) => {
  console.log(route);
  switch (route) {
    case "visualizer":
      showMonitorWindow();
      break;
    case "playground":
      showProgramWindow();
      break;
    default:
      break;
  }
});

setInterval(function(){
  var randy0=String(Math.random()).slice(0,5);
  var randy1=String(Math.random()).slice(0,5);
  var randy2=String(Math.random()).slice(0,5);
//  console.log(randy0);
  mainWindow.webContents.send("Datos", "A"+randy0+",B"+randy1+",C"+randy2);
},1000);

const menuTemplate = [
  {
    label: "CanSat",
    submenu: [
      {
        label: "Programar",
        click() {
          showProgramWindow();
        }
      },
      {
        label: "Visualizar",
        click() {
          showMonitorWindow();
        }
      },
      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

//ios
if (process.platform === "darwin") {
  menuTemplate.unshift({});
}

//dev tools
if (process.env.NODE_ENV !== "production") {
  menuTemplate.push({
    label: "View",
    submenu: [
      {
        role: "reload"
      },
      {
        label: "Developer Tools",
        accelerator:
          process.platform === "darwin" ? "Command+Alt+I" : "Ctrl+Shift+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}

