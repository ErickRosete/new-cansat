$(function () {
    const Swal = require('sweetalert2')

    $(".cont-option").draggable({
        containment: 'document',
        revert: "invalid",
        helper: 'clone',
        connectToSortable: "#target",
    });

    $("#target").droppable({
        hoverClass: 'onHover',
        accept: '.cont-option',
        drop: (event, ui) => {
            const droppedItem = $(ui.draggable);
            droppedItem.removeClass("cont-option");
            droppedItem.addClass("target-option");

            //make sensor container droppable when dropped to target
            if (droppedItem.hasClass('option-sensor')) {
                droppedItem.css('height', 'auto');
                droppedItem.find(".sensor-container").droppable({
                    hoverClass: 'onHover',
                    accept: '.sensor-option',
                    drop: droppedSensorHandler,
                })
            }
        }
    })

    $(".sensor-option").draggable({
        containment: 'document',
        revert: "invalid",
        helper: 'clone',
    });

    $("#target").sortable({
        revert: true,
        cancel: ".sensor-container"
    });

    $("#trash").droppable({
        accept: '.target-option',
        over: (event, ui) => {
            $(event.target).find('img').attr('src', '../assets/trash-open.svg')
        },
        out: (event, ui) => {
            $(event.target).find('img').attr('src', '../assets/trash-close.svg')
        },
        drop: (event, ui) => {
            //Sensor deleted
            const parent = $(ui.draggable).parent();
            if (parent.hasClass('sensor-container')) {
                const childrenNumber = parent.children().length;
                if (childrenNumber > 7) {
                    parent.siblings("img").attr("src", "../assets/Sensoresx3.svg")
                } else if (childrenNumber > 4) {
                    parent.siblings("img").attr("src", "../assets/Sensoresx2.svg")
                } else {
                    parent.siblings("img").attr("src", "../assets/Sensoresx1.svg")
                }
            }

            $(ui.draggable).remove();
            $(event.target).find('img').attr('src', '../assets/trash-close.svg')
        }
    })

    $('#trash').hover(function () {
        $(this).find('img').attr('src', function (i, src) {
            return src.replace('trash-close.svg', 'trash-open.svg')
        })
    }, function () {
        $(this).find('img').attr('src', function (i, src) {
            return src.replace('trash-open.svg', 'trash-close.svg')
        })
    })

    droppedSensorHandler = (event, ui) => {
        const sensorsCont = $(event.target);
        const childrenNumber = sensorsCont.children().length;

        if (childrenNumber > 8) {
            alert("No necesitas tantos sensores!")
        }
        else {
            if (childrenNumber > 5) {
                sensorsCont.siblings("img").attr("src", "../assets/Sensoresx3.svg")
            } else if (childrenNumber > 2) {
                sensorsCont.siblings("img").attr("src", "../assets/Sensoresx2.svg")
            } else {
                sensorsCont.siblings("img").attr("src", "../assets/Sensoresx1.svg")
            }

            const droppedItem = $(ui.draggable).clone();
            droppedItem.removeClass("sensor-option");
            droppedItem.addClass("target-option");
            sensorsCont.append(droppedItem)

            //make it draggable
            droppedItem.draggable({
                containment: 'document',
                revert: "invalid",
            });
        }
    }

    checkSequence = () => {
        const sequence = $('#target').children();
        if (sequence.length == 4) {
            if (sequence.hasClass('option-sensor') && sequence.hasClass('option-telecom')
                && sequence.hasClass('option-power') && sequence.hasClass('option-computer')) {
                const sensors = $(sequence).filter('.option-sensor').find('.sensor')
                if (sensors.length > 0) {
                    return true;
                }
            }
        }
        return false;
    }

    changeToPage = (route) => {
        const electron = require('electron');
        const { ipcRenderer } = electron;
        ipcRenderer.send("router", route);
    }

    showSuccess = () => {
        Swal.fire({
            title: 'Excelente trabajo',
            type: 'success',
            showConfirmButton: false,
            timer: 2000,
            onClose: changeToPage.bind(this, "visualizer")
        },
        )
    }

    saveSensorList = () => {
        const sensors = $('#target').children('.option-sensor').find('.sensor');
        const sensorList = {
            temperature: sensors.hasClass('temperature'),
            pressure: sensors.hasClass('pressure'),
            humidity: sensors.hasClass('humidity'),
            height: sensors.hasClass('height'),
            time: sensors.hasClass('time'),
            co2: sensors.hasClass('co2'),
            uvRay: sensors.hasClass('uv-ray'),
            camera: sensors.hasClass('camera'),
            location: sensors.hasClass('location')
        }
        console.log(sensorList);
    }

    $("#play").click(function () {
        const correct = checkSequence();
        if (correct) {
            saveSensorList();
            // showSuccess()
        } else {
            alert("Ups, parece que no es el orden correcto")
        }
    });
});