/**
 * Поле, умеет пересчитывать координаты
 * @param elem
 * @constructor
 */
function Field(elem) {
    this.elem = elem;
    this.places = [];



    var fieldWidth = 50, fieldLength = 100;
    var fieldCenter = {x: fieldWidth / 2, y: fieldLength / 2};

    // Координаты на картинке, в пикселях
    var screenWidth = 450, screenHeight = 300;
    this.screenCenter = {x: 480, y: 320};

    // Коэффициенты
    var screenSkew = 0.004;
    var k = {x: screenWidth / fieldWidth, y: screenHeight / fieldLength};

    for(var i = 0; i<11; i++)
    {
        var place = new Place({x:25,y:50});
        place.putInto(this);
        this.places.push(place);
    }


    this.screenToField = function (screenposition) {
        //переходим в координаты от центра экрана
        var fromscreencenter = {x: screenposition.x - this.screenCenter.x, y: screenposition.y - this.screenCenter.y};

        // переходим в координаты на поле
        var infield = {x: fromscreencenter.x / k.x, y: fromscreencenter.y / k.y};

        //отменяем перспективу
        infield.x /= (1 + infield.y * screenSkew);

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
        fromcenter.x *= (1 + fromcenter.y * screenSkew);

        //переходим в координаты на экране от центра
        var onscreen = {x: fromcenter.x * k.x, y: fromcenter.y * k.y};

        return {x: onscreen.x + this.screenCenter.x, y: onscreen.y + this.screenCenter.y};
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