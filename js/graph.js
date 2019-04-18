const electron = require("electron");
const { ipcRenderer } = electron;
var temp = [];
var pressure = [];
var height = [];
var gyrox = [];
var gyroy = [];
var gyroz = [];
var accx = [];
var accy = [];
var accz = [];
var pitch = [];
var roll = [];
var yaw = [];
var magnet = [];
var mq135 = [];
var temp2 = [];
var humidity = [];
var uvsensor = [];

ipcRenderer.on("Datos", (event, datos) => {
  //    console.log(event);
  const dataArray = datos.split(",");
  temp.push(+dataArray[0].slice(1));
  pressure.push(+dataArray[1].slice(1));
  height.push(+dataArray[2].slice(1));
  humidity.push(+dataArray[15].slice(1));
  uvsensor.push(+dataArray[16].slice(1));
  // console.log("actualizando arrays")
  // console.log(arr)
  /*     gyrox.push(Number(datos.split(',')[3].slice(1,)));
         gyroy.push(Number(datos.split(',')[4].slice(1,)));
         gyroz.push(Number(datos.split(',')[5].slice(1,)));
         accx.push(Number(datos.split(',')[6].slice(1,)));
         accy.push(Number(datos.split(',')[7].slice(1,)));
         accz.push(Number(datos.split(',')[8].slice(1,)));
         pitch.push(Number(datos.split(',')[9].slice(1,)));
         roll.push(Number(datos.split(',')[10].slice(1,)));
         yaw.push(Number(datos.split(',')[11].slice(1,)));
         magnet.push(Number(datos.split(',')[12].slice(1,)));
         mq135.push(Number(datos.split(',')[13].slice(1,)));
         temp2.push(Number(datos.split(',')[14].slice(1,)));
        humidity.push(Number(datos.split(',')[15].slice(1,)));
 */
  // console.log(temp);
  // console.log(pressure);
  // console.log(height);
});

//funcion para la obtencion del ultimo dato de arrays
function getData(plottedVar) {
  //seleccionar variable a graficar
  // console.log(temp);
  // console.log(plottedVar[plottedVar.length - 1]);
  if (plottedVar[plottedVar.length - 1]) {
    return plottedVar[plottedVar.length - 1];
  } else {
    return 0;
  }
}

//inicializaciones de variables para graficas
const arr = [];
const arrgraph = [...Array(8).keys()];
var cnt = [];
for (i of arrgraph) {
  cnt.push(0);
}
arr.push(temp);
arr.push(pressure);
arr.push(humidity);
arr.push(height);
arr.push(height) /*tiempo*/;
arr.push(height) /*co2*/;
arr.push(uvsensor) /*uv*/;
arr.push(uvsensor); //ubicacion

//inicializando con el primer dato las graficas(debe ser 0 en el tiempo 0)
for (let i of arrgraph) {
  // console.log(i+1)
  // console.log(arr[i])
  Plotly.plot(
    "chart" + Number(i + 1),
    [{ y: [getData(arr[i])], type: "line" }],
    { responsive: true }
  );
}

//actualizacion dinamica en base a array
setInterval(function() {
  // console.log("==argraph")
  // console.log(arrgraph)
  for (let i of arrgraph) {
    // console.log(`grafica ${i}`)
    // console.log(arr[i])
    // console.log([[getData(arr[i])]])
    // console.log(`datos ${cnt[i]}`)
    Plotly.extendTraces("chart" + Number(i + 1), { y: [[getData(arr[i])]] }, [
      0
    ]);
    cnt[i]++;
    if (cnt[i] > 15) {
      Plotly.relayout("chart" + Number(i + 1), {
        xaxis: {
          range: [cnt[i] - 15, cnt[i]]
        }
      });
    }
  }
}, 500);
