$(function () {
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
            $(event.target).find('img').attr('src', '../assets/trash-open.png')
        },
        out: (event, ui) => {
            $(event.target).find('img').attr('src', '../assets/trash-close.png')
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
            $(event.target).find('img').attr('src', '../assets/trash-close.png')
        }
    })

<<<<<<< HEAD
=======
    $('#trash').hover(function () {
        $(this).find('img').attr('src', function (i, src) {
            return src.replace('trash-close.png', 'trash-open.png')
        })
    }, function () {
        $(this).find('img').attr('src', function (i, src) {
            return src.replace('trash-open.png', 'trash-close.png')
        })
    })

>>>>>>> 30b22f52dda20c64a5eef8c2ff65f298a173a7e0
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

    // $('#trash').hover(function () {

    // }, function () {
    //     $(this).find('img').attr('src', function (i, src) {
    //         return src.replace('trash-open.png', 'trash-close.png')
    //     })
    // })
});