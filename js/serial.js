const SerialPort = require('serialport')
const {StringStream} = require('scramjet');
var ports=[]
var elbueno;
const exists = portName => SerialPort.list().then(ports => ports.some(port => port.comName === portName ));

const escaneoPuertos=async ()=>{
    await SerialPort.list().then((puertos)=>{
        // console.log(puertos[0].comName)
//        console.log(puertos)
        if(puertos.length>0)
        puertos.forEach((puerto)=>{
            ports.push(puerto.comName)
        })
    })
}


const intentarAbrirPuertos=async ()=>{
    if(ports.length>0){
        console.log(ports)
        await ports.forEach(async (puerto)=>{
            const port = await new SerialPort(puerto, { baudRate: 9600,autoOpen: false })
            await port.open(function (err) {
                if (err) {
                    return console.log('Error opening port: ', err.message)
                }
                else
                {
                    console.log("Open "+puerto)
                    elbueno=port;
                }
            })
        })
    }
}

const main=async()=>{
    if(!test){
        console.log("====Serial.js inicializado")
        await escaneoPuertos();
        //ABRIENDO PUERTO SERIAL CONECTADO
        await intentarAbrirPuertos();

         
            elbueno.on('open', () => console.log('open'));
            elbueno.pipe(new StringStream) // pipe the stream to scramjet StringStream
                .lines('\n')                  // split per line
                .each( (datos)=>{// send message per every line
                        // data => io.sockets.emit('message',data)
                        console.log(`received data: ${datos}`)
                        console.log(sensorData)
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
            );
            
        }
        else{
            test=true;
        }
        
    }

main();
