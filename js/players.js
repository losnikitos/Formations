var Team = function () {

    var positions = {
        striker: 'Нападающие',
        midfielder: 'Полузащитники',
        defender: 'Защитники',
        goalkeeper: 'Вратари'
    };

    this.groups = {};

    this.init = function (callback) {
        var self = this;
        $.getJSON("data/players.json", function (data) {
            data.forEach(function (player) {
                if (!self.groups[player.position]) self.groups[player.position] = [];
                self.groups[player.position].push(player);
            });
            callback.call();
        });
    };

    this.render = function () {
        var res = [];
        for (var pos in positions) {
            var header = $('<h3/>').html(positions[pos]);
            res.push(header);

            var content = $('<div/>');
            this.groups[pos].forEach(function (p) {
                content.append(new Player(p).listRepresentation);
            });
            res.push(content);
        }
        return res;
    }
}

var Player = function (p) {
    var self = this;
    this.img = p.img;
    this.firstName = p.firstName;
    this.lastName = p.lastName;
    draggingPlayer = null;

    this.image = function () {
        return $('<img/>').attr('src', "img/players/" + this.img);
    }

    this.renderForList = function () {
        var firstName = $('<div class="player"/>').html(this.firstName + ' ');
        var lastname = $('<span class="lastname"/>').html(this.lastName);
        var image = this.image();

        return firstName.append(lastname).prepend(image);
    }

    this.renderForDrag = function () {
        return self.image().addClass('playerface animate bounceIn');
    }

    this.renderForField = function () {
        var div = $('<div/>');
        div.append(self.image().addClass('playerface'));
        div.append($('<span/>').html(self.lastName));
        return div;
    }

    this.becomeDraggable = function () {
        this.listRepresentation.draggable({
            revert: "invalid",
            cursorAt: {top: 25, left: 25},
            start: function () {
                draggingPlayer = self;
            },
            stop: function () {
                draggingPlayer = null;
            },
            helper: function (event) {
                return self.renderForDrag();
            },
            zIndex: 120,
            appendTo: '.field'});
    }


    this.disable = function () {
        this.listRepresentation.addClass('disabled');
        this.listRepresentation.draggable('disable');
    }
    this.enable = function () {
        this.listRepresentation.removeClass('disabled');
        this.listRepresentation.draggable('enable');
    }

    this.listRepresentation = this.renderForList();
    this.becomeDraggable();

    this.fieldRepresentation = this.renderForField();
}
