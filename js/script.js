$(function () {


    field = new Field($("#field"));
    formations = new Formations();


    $("#formations").append(formations.render());
    var defaultFormation = new Formations().get('4-4-2');
    defaultFormation.apply(field);

    $("#formations .toggle").dropdown(".list");

    var team = new Team;
    team.init(function () {
        $("#playersList").append(team.render());
        $(".playersListsss").accordion();

    });


//    $( '#cd-dropdown' ).dropdown( {
//        gutter : 0,
////        stack : true,
//        delay : 100,
//        slidingIn : 100
//    } );


//
//    $(".placeHolder").draggable(
//        {   containment: "parent",
//            start: function (event, ui) {
//                console.log(this);
//                field.draggingNow = field.places[$(this).attr("id")];
//            },
//            drag: function (event, ui) {
//                field.draggingNow.onDrag({x:ui.position.left,y:ui.position.top});
//            },
//            stop: function(event, ui)
//            {
//                console.log(field.draggingNow.id)
//            }
//
//        });

//    $(".placeHolder").droppable({
//        hoverClass: "hover",
//        accept: ".player",
//        drop: function (ev, ui) {
//            $(ui.draggable).detach().css({top: -40, left: 0}).appendTo(this);
//        }
//    });

    $(".player").draggable({ revert: "invalid" });


});