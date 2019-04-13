const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;
const ipcMain = electron.ipcMain;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({ width: 960, height: 600, fullscreen: false });
  mainWindow.loadFile("./views/playground.html");
  mainWindow.on("closed", () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function showProgramWindow() {
  mainWindow.loadFile("./views/playground.html");
}

function showMonitorWindow() {
  mainWindow.loadFile("./views/visualizer.html");
}

ipcMain.on("todo:add", (event, todo) => {
  console.log(todo);
  mainWindow.webContents.send("todo:add", todo);
  addWindow.close();
});

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
