$(function () {
    //new Team().populateIn($("#playersList"));

    field = new Field($("#field"));
    var defaultFormation = new Formations().get('4-4-2');
    defaultFormation.apply(field);

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