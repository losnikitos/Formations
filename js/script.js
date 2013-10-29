/**
 * Created by Nikita on 29/10/13.
 */
$(function () {
    $(".player").draggable({ containment: ".container"});

    var f = new Formation('4-4-2');
    f.populateIn($("#field"));
});

var Formation = function (name) {
    this.positions = [];

    if (name = "4-4-2") {
        this.positions.push(new Place('CF', {x: 15, y: 20}));
        this.positions.push(new Place('CF', {x: 35, y: 20}));

        this.positions.push(new Place('SM', {x: 10, y: 40}));
        this.positions.push(new Place('SM', {x: 40, y: 40}));

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
        var d = $('<div/>');
        d.addClass('place');
        d.html(this.name);
        d.css("left", this.x / 50 * scaleX -15);
        d.css("top", this.y / 100 * scaleY -15);
        return d;
    }
}