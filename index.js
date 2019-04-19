const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;
const ipcMain = electron.ipcMain;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 960,
    height: 600,
    fullscreen: false,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  mainWindow.loadFile("./views/playground.html");

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

  if (process.env.NODE_ENV !== "production") {
    startDevelopmentEnvironment();
  } else {
    startProductionEnvironment();
  }

});

function showProgramWindow() {
  mainWindow.loadFile("./views/playground.html");
}

function showMonitorWindow() {
  mainWindow.loadFile("./views/visualizer.html");
}

function showMonitorWindow2() {
  mainWindow.loadFile("./views/visualizer2.html");
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

function sendTestData() {
  return setInterval(function () {
    // console.log("intervalo");
    const alphabet = "ABCDEFGHIJKLMNOPQ".split("");
    let cadena = "";
    // alfabeto + numero aleatorio
    for (let i = 0; i < alphabet.length; i++) {
      if (i > 0) {
        cadena += ",";
      }
      cadena += alphabet[i];
      cadena += String(Math.random() * 100).slice(0, 3);
    }
    // console.log(cadena);
    mainWindow.webContents.send("Datos", cadena);
  }, 1000);
}

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
        label: "Serial Info",
        click() {
          showMonitorWindow2();
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

const startDevelopmentEnvironment = () => {
  const interval = sendTestData();
  mainWindow.on("closed", () => {
    app.quit();
    clearInterval(interval)
  });
}

const startProductionEnvironment = () => {
  mainWindow.on("closed", () => {
    app.quit();
  });
}
