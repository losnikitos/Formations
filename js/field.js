/**
 * Поле, умеет пересчитывать координаты
 * @param elem
 * @constructor
 */
function Field(elem) {
    this.elem = elem;
    this.places = [];

    this.addPlace = function(place)
    {
        this.places.push(place)
        place.field = this;
        place.render();
        elem.append(place.elem);
    }

    for(var i = 0; i<11; i++)
        this.addPlace(new Place({x:25,y:50}));

    var fieldWidth = 50, fieldLength = 100;
    var fieldCenter = {x: fieldWidth / 2, y: fieldLength / 2};

    // Координаты на картинке, в пикселях
    var screenWidth = 208 * 2, screenHeight = 190 * 2;
    var screenCenter = {x: 335, y: 269};

    // Коэффициенты
    var screenScew = 0.02;
    var k = {x: screenWidth / fieldWidth, y: screenHeight / fieldLength};

    this.screenToField = function (screenposition) {
        //переходим в координаты от центра экрана
        var fromscreencenter = {x: screenposition.x - screenCenter.x, y: screenposition.y - screenCenter.y};

        // переходим в координаты на поле
        var infield = {x: fromscreencenter.x / k.x, y: fromscreencenter.y / k.y};

        //отменяем перспективу
        infield.x /= (1 + infield.y * screenScew);

        return {x: infield.x + fieldCenter.x, y: infield.y + fieldCenter.y};
    }

    /**
     * Переводим координаты на поле 50x100 в координаты на экране с перспективой
     * @param position
     * @returns {{x: (number|string), y: *}}
     */
    this.fieldToScreen = function (position) {
        //переходим в координаты от центра
        var fromcenter = {x: position.x - fieldCenter.x, y: position.y - fieldCenter.y};

        //перспектива
        fromcenter.x *= (1 + fromcenter.y * screenScew);

        //переходим в координаты на экране от центра
        var onscreen = {x: fromcenter.x * k.x, y: fromcenter.y * k.y};

        return {x: onscreen.x + screenCenter.x, y: onscreen.y + screenCenter.y};
    }

    this.getRole = function (position) {
        var x = position.x, y = position.y;

        if (y < 19) return 'ST';
        if (y > 89) return 'GK';

        if (x < 14) {
            //left...
            if (y < 37) return 'LF';
            if (y > 63) return 'LB';
            return 'LM';
        }

        if (x > 36) {
            //right...
            if (y < 37) return 'RF';
            if (y > 63) return 'RB';
            return 'RM';
        }

        //center
        if (y < 31) return 'CF';
        if (y < 43) return 'AM';
        if (y < 58) return 'CM';
        if (y < 68) return 'DM';
        return 'CB';
    }
}