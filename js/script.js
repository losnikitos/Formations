$(function () {
    field = new Field($(".field"));
    field.addPlaces();
    field.places.forEach(function (place) {
        place.becomeDraggable();
        place.becomeDroppable()
    });

    var formations = new Formations();

    $(".formationsList").append(formations.render());
    var defaultFormation = new Formations().get('4-4-2');
    defaultFormation.apply(field);

    $(".slate.formations").dropdown(".formationsList");

    var team = new Team;
    team.init(function () {
        $(".playersList")
            .append(team.render())
            .accordion({heightStyle: "content"})
            .droppable({
                activeClass: "hover",
                accept: ".hasPlayer",
                drop: function (ev, ui) {
                    draggingPlace.releasePlayer();
                }
            })

        $(".slate").css({top: '-5px'});
    });
});