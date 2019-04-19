const electron = require("electron");
const { ipcRenderer } = electron;

let loadedCharts=false;
var test=false;

//inicializaciones de diccionario je je para graficas
const sensorData = {
  A: {
    titulo: "Temperatura",
    datos: [],
    yaxis: {
      title: 'C',
    }
  },
  B: {
    titulo: "Presión",
    datos: [],
    yaxis: {
      title: 'psi',
    }
  },
  C: {
    titulo: "Humedad",
    datos: [],
    yaxis: {
      title: 'something',
    }
  },
  D: {
    titulo: "Altura",
    datos: [],
    yaxis: {
      title: 'metros',
    }
  },
  E: {
    titulo: "CO2",
    datos: [],
    yaxis: {
      title: 'partículas',
    }
  },
  F: {
    titulo: "Tiempo",
    datos: [],
    yaxis: {
      title: 'hola',
    }
  },
  G: {
    titulo: "UV",
    datos: [],
    yaxis: {
      title: 'UV',
    }
  },
  H: {
    titulo: "Ubicación",
    datos: [],
    yaxis: {
      title: 'hola',
    }
  }
};

function updateChart(letter){
  if(loadedCharts){
   const len=sensorData[letter].datos.length
   const lastElement=sensorData[letter].datos[len-1]
   Plotly.extendTraces(sensorData[letter].titulo, { y: [[lastElement]] }, [0]);
    if (len> 15) {
      Plotly.relayout(sensorData[letter].titulo, {
        xaxis: {
          range: [len - 15, len]
        },
      });
    }
  }
}

console.log("sensorData.datos");
console.log(sensorData['A'].datos);
console.log("aversiescierto");
console.log(sensorData['A'].datos[sensorData['D'].datos.length-1]);

//recepcion de datos del back end. simbolo + para convertir a numeros
ipcRenderer.on("Datos", (event, datos) => {
  //codigo patrocinado por erick
  if(test){
    const dataArray = datos.split(",");
    for (let data of dataArray) {
      const letter = data.slice(0, 1);
      const value = data.slice(1);
      if(sensorData[letter] && Number(value)>0){
        console.log(sensorData[letter])
        sensorData[letter].datos.push(value)
        updateChart(letter);
      }
    }
  }
});

//aqui se genera el objeto de plotly y se le pone el 0 en el 0
function chartInit(){
  for(let sensor in sensorData){
    var layout = {
      title: sensorData[sensor].titulo,
      font: { size: 18 },
      yaxis: {
        title: 'metros',
      },
    };
  
    Plotly.plot(
      sensorData[sensor].titulo,
      [{ y: [0], type: "line" }],
      layout,
      { responsive: true }
    );
  }
  loadedCharts=true;
}

//=========================main code en visualizer.js=================//



//Altura

function getData(){
  return Math.random();
}

Plotly.plot( 'AlturaTest', [{
  y: [1, getData()], 
  type: 'bar'
  }]);
  
  var cnt = 0;

  setInterval(function(){
    var alturamax=100;
    var trace1 = {
      x: [0.5,1],
      y: [alturamax, sensorData['A'].datos[sensorData['D'].datos.length-1]],
      width: [0.1, 1],
//      color: ['rgba(204,204,204,1)', transparent],
      name: 'Rest of world',
      marker: {
        color: 'rgb(154,205,50)',
        opacity: [0,1],
    },
      type: 'bar'
    };
  
    var data = [trace1];
    
    var layout = {
      title: 'Altura',
      autosize: true,
      yaxis: {
        title: 'metros',
        tickmode: 'line',
        automargin: true,
        zeroline: false,
        showgrid: false,
        titlefont: { size:18 },
      },
      xaxis: {
          automargin: true,
          titlefont: { size:18 },
          zeroline: false,
          showline: false,
          showgrid: false,
          showticklabels: false
        },
    //    paper_bgcolor: 'transparent',
    //    plot_bgcolor: 'transparent'
    };
    
    Plotly.newPlot('Altura', data, layout, {displayModeBar: false});
},200);