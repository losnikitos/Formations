$(function () {

    new Formation('4-4-2').populateIn($("#field"));

    $(".placeHolder").draggable({ containment: "parent"});

    $(".placeHolder").droppable({
        hoverClass: "hover",
        drop: function (event, ui) {
            $(this).addClass("highlight");
        }
    });

    $(".player").draggable();
});

var Formation = function (name) {
    this.positions = [];

    if (name = "4-4-2") {
        this.positions.push(new Place('ST', {x: 15, y: 20}));
        this.positions.push(new Place('ST', {x: 35, y: 20}));

        this.positions.push(new Place('LM', {x: 10, y: 40}));
        this.positions.push(new Place('RM', {x: 40, y: 40}));

        this.positions.push(new Place('CM', {x: 20, y: 50}));
        this.positions.push(new Place('CM', {x: 30, y: 50}));

        this.positions.push(new Place('FB', {x: 10, y: 70}));
        this.positions.push(new Place('FB', {x: 40, y: 70}));

        this.positions.push(new Place('CB', {x: 20, y: 75}));
        this.positions.push(new Place('CB', {x: 30, y: 75}));

        this.positions.push(new Place('K', {x: 25, y: 90}));
    }

    this.populateIn = function (container) {
        this.positions.forEach(function (pos) {
            container.append(pos.asHTML());
        });
    }
}

var Place = function (name, position) {
    this.name = name;
    this.x = position.x;
    this.y = position.y;

    var scaleX = 313;
    var scaleY = 500;

    this.asHTML = function () {
        var placeHolder = $('<div/>');
        placeHolder.addClass('placeHolder');
        placeHolder.css("left", this.x / 50 * scaleX - 20);
        placeHolder.css("top", this.y / 100 * scaleY - 20);

        var placeIcon = $('<div/>');
        placeIcon.html(this.name);
        placeIcon.addClass('placeIcon');


        placeIcon.appendTo(placeHolder);

        return placeHolder;
    }
}