/**
 * Библиотека расстановок
 * @constructor
 */
var Formations = function (field) {
    var formations = [
        new Formation('4-4-2',
            [
                {x: 15, y: 20}, //ST
                {x: 35, y: 20}, //ST

                {x: 10, y: 40}, //LM
                {x: 40, y: 40}, //RM

                {x: 20, y: 50}, //CM
                {x: 30, y: 50}, //CM

                {x: 10, y: 70}, //LB
                {x: 40, y: 70}, //RB

                {x: 20, y: 75}, //CB
                {x: 30, y: 75}, //CB

                {x: 25, y: 90}  //GK
            ]
        ),
        new Formation('4-3-3',
            [
                {x: 5, y: 10},  //Left Winger
                {x: 45, y: 10}, //Right Winger
                {x: 25, y: 5},  //CF

                {x: 15, y: 45}, //CM
                {x: 25, y: 50}, //CM
                {x: 35, y: 45}, //CM

                {x: 10, y: 70}, //FB
                {x: 40, y: 70}, //FB

                {x: 20, y: 75}, //CB
                {x: 30, y: 75}, //CB

                {x: 25, y: 90}  //GK
            ]
        ),
        new Formation('4-4-2 diamond',
            [
                {x: 20, y: 5}, //CF
                {x: 30, y: 5}, //CF

                {x: 25, y: 30}, //Offensive Midfielder
                {x: 10, y: 45}, //LSM
                {x: 40, y: 45}, //RSM
                {x: 25, y: 55}, //Defensive Midfielder

                {x: 10, y: 70}, //FB
                {x: 40, y: 70}, //FB

                {x: 20, y: 75}, //CB
                {x: 30, y: 75}, //CB

                {x: 25, y: 90}  //GK
            ]
        )
    ];

    this.get = function (name) {
        return $.grep(formations, function (e) {
            return e.name == name;
        })[0];
    };

    this.render = function () {
        return formations.map(function (formation) {
            var b = $('<li/>');
            b.html(formation.name);
            b.click(function () {
                formation.apply(field)
            })
            return b;
        })
    }
}

/**
 * Расстановка
 * @param name
 * @param positions
 * @constructor
 */
var Formation = function (name, positions) {
    this.name = name;
    this.positions = positions;

    /**
     * Применяем расстановку
     * @param field
     */
    this.apply = function (field) {
        for (var i = 0; i < 11; i++) {
            var pos = this.positions[i];
            var place = field.places[i];

            place.moveTo(pos);
        }
    }
};