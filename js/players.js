var Team = function () {

    var positions = {
        goalkeeper: 'Вратари',
        striker: 'Нападающие',
        midfielder: 'Полузащитники',
        defender: 'Защитники'
    };

    this.groups = {};


    this.init = function (callback) {
        var self = this;
        $.getJSON("data/players.json", function (data) {
            data.forEach(function (player) {
                if(!self.groups[player.position]) self.groups[player.position] = [];
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
            this.groups[pos].forEach(function(p){
                var player = $('<div class="player"/>').html(p.firstName + ' ');
                var lastname = $('<span class="lastname"/>').html(p.lastName);
                var image = $('<img/>').attr('src', "img/players/" + p.img);
                content.append(player.append(lastname).prepend(image));
            });
            res.push(content);
        }
        return res;
    }
}
