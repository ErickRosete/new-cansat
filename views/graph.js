console.log("hi");

const electron=require('electron');
    const {ipcRenderer}=electron;
    var temp=[];
    var pressure=[];
    var height=[];
    var gyrox=[];
    var gyroy=[];
    var gyroz=[];
    var accx=[];
    var accy=[];
    var accz=[];
    var pitch=[];
    var roll=[];
    var yaw=[];
    var magnet=[];
    var mq135=[];
    var temp2=[];
    var humidity=[];
    var uvsensor=[];

    ipcRenderer.on("Datos",(event,datos)=>{
    //    console.log(event);
        temp.push(Number(datos.split(',')[0].slice(1,)));
        pressure.push(Number(datos.split(',')[1].slice(1,)));
        height.push(Number(datos.split(',')[2].slice(1,)));
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
        uvsensor.push(Number(datos.split(',')[16].slice(1,)));
*/
        console.log(temp);
        console.log(pressure);
        console.log(height);
    })

    function getData(){

        //seleccionar variable a graficar

        console.log(temp);
        console.log(temp[temp.length-1]);
        return temp[temp.length-1];
    }

    Plotly.plot( 'chart', [{
    y: [getData()], 
    type: 'line'
    }]);

    var cnt = 0;

    setInterval(function(){
        Plotly.extendTraces('chart',{ y:[[getData()]]}, [0]);
        cnt++;

        if(cnt > 15) {
            Plotly.relayout('chart',{
                xaxis: {
                    range: [cnt-15,cnt]
                }
            });
        }
    },200);
