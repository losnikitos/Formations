/**
 * Библиотека расстановок
 * @constructor
 */
var Formations = function () {
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
        )
    ];

    this.get = function (name) {
        return $.grep(formations, function (e) {
            return e.name == name;
        });
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

    this.populateIn = function (container) {
        this.positions.forEach(function (pos) {



            container.append(pos.asHTML());
        });
    }
};