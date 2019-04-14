window.onload = function () {
    var sensors = JSON.parse(sessionStorage.getItem('sensors'));
    if (sensors) {
        if (!sensors.camera) {
            const uvRay = document.getElementById("vis-camera");
            uvRay.style.display = "none"
        }
        if (!sensors.co2) {
            const co2 = document.getElementById("vis-co2");
            co2.style.display = "none"
        }
        if (!sensors.height) {
            const height = document.getElementById("vis-altura");
            height.style.display = "none"
        }
        if (!sensors.humidity) {
            const humidity = document.getElementById("vis-humedad");
            humidity.style.display = "none"
        }
        if (!sensors.location) {
            const location = document.getElementById("vis-location");
            location.style.display = "none"
        }
        if (!sensors.pressure) {
            const pressure = document.getElementById("vis-presion");
            pressure.style.display = "none"
        }
        if (!sensors.temperature) {
            const temperature = document.getElementById("vis-temperatura");
            temperature.style.display = "none"
        }
        if (!sensors.time) {
            const time = document.getElementById("vis-time");
            time.style.display = "none"
        }
        if (!sensors.uvRay) {
            const uvRay = document.getElementById("vis-uv-ray");
            uvRay.style.display = "none"
        }

    }
};