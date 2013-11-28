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

        $(".player").draggable({ revert: "invalid", helper: function( event ) {
            return $(this).find("img").clone().css({width: '50px',height:'50px'});
//            return $(this).find("img").clone();
        } });

        $(".slate").css({top: '-5px'});

    });

//
//    $(".placeHolder").droppable({
//        hoverClass: "hover",
//        accept: ".player",
//        drop: function (ev, ui) {
//            $(ui.draggable).detach().css({top: -40, left: 0}).appendTo(this);
//        }
//    });


});