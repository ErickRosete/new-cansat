window.onload = function () {
    chartInit();
    //hide sensors
    var sensors = JSON.parse(sessionStorage.getItem('sensors'));
    if (sensors) {
        for (const sensorName in sensors) {
            if (!sensors[sensorName]) {
                hideSensor(divNames[sensorName]);
            }
        }
    }
    //show all
    document.getElementById("content").style.opacity = 1;
};

const hideSensor = (name) => {
    document.getElementById(`vis-${name}`).style.display = "none";
    document.getElementById(`card-${name}`).style.display = "none";
    document.getElementById(`sensor-${name}`).style.display = "none";
}

//additional object to map sensor names to div names
const divNames = {
    camera: "camara",
    co2: "co2",
    height: "altitud",
    humidity: "humedad",
    location: "ubicacion",
    pressure: "presion",
    temperature: "temperatura",
    time: "tiempo",
    uvRay: "rayosuv"
}