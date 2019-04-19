const SerialPort = require('serialport')
const { StringStream } = require('scramjet');
// const exists = portName => SerialPort.list().then(ports => ports.some(port => port.comName === portName ));

const scanPorts = () =>{
    return new Promise((resolve, reject) =>{
        console.log("scanning ports")
        SerialPort.list().then((ports)=>resolve(ports))
    })
}

const openSerialPort = port => {
    return new Promise((resolve,reject)=>{
        port.open(function (err) {
            if (err) {
                console.log('Error opening port: ', err.message)
                reject(err.message);
            }
            else
            {
                resolve(port)
            }
        })
    }) 
}

const openPorts = ports => {
    return new Promise(async (resolve, reject) =>{
        console.log("opening ports")
        if(ports.length>0) {
            const openPorts = [];
            for(const port of ports) {
                try {
                    const serialPort = new SerialPort(port.comName, { baudRate: 9600, autoOpen: false })
                    // console.log(serialPort)
                    const openPort = await openSerialPort(serialPort);
                    openPorts.push(openPort)
                }
                catch(e){
                    console.log("Error" + e)
                }
            }
            resolve(openPorts);
        }
    })
}

const dataProcessing=(datos)=>{
    if(datos[0]==="A"){
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
}

const main = async () => {
    if(!test){
        console.log("==== Init Serial.j ===")
        // await escaneoPuertos();
        //ABRIENDO PUERTO SERIAL CONECTADO
        scanPorts().then((ports)=>{
            console.log(ports)
            openPorts(ports).then((portOptions)=>{;
                console.log(portOptions)
                portOptions.forEach((option)=>{
                    option.on('open', () => console.log('open', option));
                    option.pipe(new StringStream) // pipe the stream to scramjet StringStream
                        .lines('\n')                  // split per line
                        .each( (datos)=>{// send message per every line
                                // data => io.sockets.emit('message',data)
                                dataProcessing(datos)
                            }
                    );
                })
            })
        })   
    }
    else {
        test = true;
    }
}

main();