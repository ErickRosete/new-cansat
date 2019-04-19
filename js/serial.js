const SerialPort = require('serialport')
const {StringStream} = require('scramjet');
var ports=[]
const exists = portName => SerialPort.list().then(ports => ports.some(port => port.comName === portName ));

const escaneoPuertos=async ()=>{
    await SerialPort.list().then((puertos)=>{
        // console.log(puertos[0].comName)
        if(puertos.length>0)
        ports.push(puertos[0].comName)
    })
}

const main=async()=>{
    if(!test){
        console.log("====Serial.js inicializado")
        await escaneoPuertos();
        console.log("=====Puertos:")
        console.log(ports)
        //ABRIENDO PUERTO SERIAL CONECTADO
        if(ports.length>0){
            console.log(ports[0])
            const port = new SerialPort(ports[0], { baudRate: 9600,autoOpen: false })
            port.open(function (err) {
                if (err) {
                    return console.log('Error opening port: ', err.message)
                }
            })
            port.on('open', () => console.log('open'));
            port.pipe(new StringStream) // pipe the stream to scramjet StringStream
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
}

main();
