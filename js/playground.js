$(function () {
    $(".cont-option").draggable({
        containment: 'document',
        revert: "invalid",
        // snap: ".target-option",
        // snapMode: "outer",
        // snapTolerance: 30,
        helper: 'clone',
        connectToSortable: "#target"
    });

    $("#target").droppable({
        hoverClass: 'onHover',
        accept: '.cont-option',
        drop: (event, ui) => {
            const droppedItem = $(ui.draggable);
            droppedItem.removeClass("cont-option");
            droppedItem.addClass("target-option");

            // const droppedItem = $(ui.draggable).clone();
            // droppedItem.removeClass("cont-option");
            // droppedItem.addClass("target-option");
            // $(event.target).append(droppedItem)
        }
    })

    $("#target").sortable({
        revert: true
    });

    $("#trash").droppable({
        accept: '.target-option',
        hoverClass: 'onHover',
        drop: (event, ui) => {
            $(ui.draggable).remove();
        }
    })

    $('#trash').hover(function () {
        $(this).find('img').attr('src', function (i, src) {
            return src.replace('trash-close.png', 'trash-open.png')
        })
    }, function () {
        $(this).find('img').attr('src', function (i, src) {
            return src.replace('trash-open.png', 'trash-close.png')
        })
    })
});