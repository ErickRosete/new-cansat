window.onload = function () {
    var sensors = JSON.parse(sessionStorage.getItem('sensors'));
    if (sensors) {
        if (!sensors.camera) {
            document.getElementById("vis-camara").style.display="none";
            document.getElementById("card-camara").style.display="none";
            document.getElementById("sensor-camara").style.display="none";
        }
        if (!sensors.co2) {
            document.getElementById("vis-co2").style.display="none";
            document.getElementById("card-co2").style.display="none";
            document.getElementById("sensor-co2").style.display="none";
        }
        if (!sensors.height) {
            document.getElementById("vis-altitud").style.display="none";
            document.getElementById("card-altitud").style.display="none";
            document.getElementById("sensor-altitud").style.display="none";
        }
        if (!sensors.humidity) {
            document.getElementById("vis-humedad").style.display="none";
            document.getElementById("card-humedad").style.display="none";
            document.getElementById("sensor-humedad").style.display="none";
        }
        if (!sensors.location) {
            document.getElementById("vis-ubicacion").style.display="none";
            document.getElementById("card-ubicacion").style.display="none";
            document.getElementById("sensor-ubicacion").style.display="none";
        }
        if (!sensors.pressure) {
            document.getElementById("vis-presion").style.display="none";
            document.getElementById("card-presion").style.display="none";
            document.getElementById("sensor-presion").style.display="none";
        }
        if (!sensors.temperature) {
            document.getElementById("vis-temperatura").style.display="none";
            document.getElementById("card-temperatura").style.display="none";
            document.getElementById("sensor-temperatura").style.display="none";
        }
        if (!sensors.time) {
            document.getElementById("vis-tiempo").style.display="none";
            document.getElementById("card-tiempo").style.display="none";
            document.getElementById("sensor-tiempo").style.display="none";
        }
        if (!sensors.uvRay) {
            document.getElementById("vis-rayosuv").style.display="none";
            document.getElementById("card-rayosuv").style.display="none";
            document.getElementById("sensor-rayosuv").style.display="none";
        }

    }
};