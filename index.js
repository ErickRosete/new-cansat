const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;
const ipcMain = electron.ipcMain;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 960,
    height: 600,
    fullscreen: false
  });
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

//BAROMETRO-GIROSCOPIO-ACELEROMETRO-MAGNETROMETRO-MQ135,DHT11,SENSORUV
//TEMP,PRESS,ALTITUDE,GIRSOCOPIOX,Y,Z,ACELERACIONX-G123,Y,Z,PITCH,ROLL,YAW,MAGNETOMETER,MQ135,TEMPERATURE,HUMIDITY,UVSENSOR
// "A123,B234,C123,D123,E123,F123,G123,H123,I123,J123,K123,L123,M123,N123,O123,P123,Q123"
setInterval(function() {
  console.log("intervalo");
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
  console.log(cadena);
  mainWindow.webContents.send("Datos", cadena);
  // mainWindow.webContents.send("Datos", "A"+r[0]+",B"+r[1]+",C"+r[2]);
}, 1000);

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
