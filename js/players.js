var Team = function () {
    this.populateIn = function (ul) {
        $.getJSON("data/players.json", function (data)
         {
            data.forEach(function (player) {
                    var img = $('<img/>').attr("src", "img/players/melnik.jpg");
                    var div = $('<div/>').html(player.name);

                    var li = $('<li/>').addClass('player').append(img).append(div);

                    ul.append(li);
                }
            )
        })
    }
}