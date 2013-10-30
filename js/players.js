var Team = function () {
    this.populateIn = function (ul) {

        $.getJSON("data/players.json", function (data) {
            data.forEach(function (player) {
                    var li = $('<li/>');
                    li.html(player.name);
                    li.addClass('player');
                    ul.append(li);
                }
            )
        })
    }
}