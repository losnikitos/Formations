$(function () {
    var field = new Field($(".field"));
    var formations = new Formations(field);

    $(".formationsList").append(formations.render());
    console.log(formations.render());
    var defaultFormation = new Formations().get('4-4-2');
    defaultFormation.apply(field);

    $(".slate.formations").dropdown(".formationsList");

    var team = new Team;
    team.init(function () {
        $(".playersList")
            .append(team.render())
            .accordion({heightStyle: "content"});

        $(".player").draggable({ revert: "invalid",
            cursorAt: {
                top: 25,
                left: 25},
            helper: function (event) {
//                var url = $(this).find("img").attr('url');
//                var img = $('<img/>').attr({url: url});
                var img = $(this).find("img").clone();
                img.addClass('playerface');
                return img
            },
            zIndex: 120,
            appendTo: '.field'});

        $(".slate").css({top: '-5px'});
    });


//    $(".placeHolder").droppable({
//        hoverClass: "hover",
//        accept: ".player",
//        drop: function (ev, ui) {
//            $(ui.draggable).detach().css({top: -40, left: 0}).appendTo(this);
//        }
//    });


});