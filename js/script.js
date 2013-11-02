$(function () {
    var defaultFormation = new Formations().get('4-4-2');

    new Team().populateIn($("#playersList"));

    var field = new Field($("#field"));
    field.buildFormation(defaultFormation);




    $(".placeHolder").draggable({ containment: "parent"});

    $(".placeHolder").droppable({
        hoverClass: "hover",
        accept: ".player",
        drop: function (ev, ui) {
            $(ui.draggable).detach().css({top: -40, left: 0}).appendTo(this);
        }
    });

    $(".player").draggable({ revert: "invalid" });


});