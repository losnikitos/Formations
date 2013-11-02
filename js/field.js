/**
 * Поле, умеет пересчитывать координаты
 * @param elem
 * @constructor
 */
var Field = function(elem)
{
    this.fieldElement = elem;

    var fieldWidth = 50, fieldLength = 100;
    var fieldCenter = {x:fieldWidth/2,y:fieldLength/2};

    // Координаты на картинке, в пикселях
    var screenWidth = 208*2, screenHeight = 190*2;
    var screenCenter = {x: 335, y:269};


    // Коэффициенты
    var screenScew = 0.2;
    var k = {x: screenWidth/fieldWidth, y:screenHeight/fieldLength};

    this.screenToField = function(position)
    {

    }

    /**
     * Переводим координаты на поле 50x100 в координаты на экране с перспективой
     * @param position
     * @returns {{x: (number|string), y: *}}
     */
    this.fieldToScreen = function(position)
    {
        //переходим в координаты от центра
        var fromcenter = {x: position.x - fieldCenter.x, y: position.y - fieldCenter.y};

        //перспектива
        fromcenter.x += fromcenter.y * screenScew;

        //переходим в координаты на экране от центра
        var onscreen = {x:fromcenter.x * k.x, y:fromcenter.y * k.y};

        return {x: onscreen.x + screenCenter.x, y: onscreen.y + screenCenter.y};
    }

    this.getRole = function(position)
    {
        var x = position.x, y=position.y;

        if(y<19) return 'ST';
        if(y>89) return 'GK';

        if(x<14)
        {
            //left...
            if(y<37) return 'LF';
            if(y>63) return 'LB';
            return 'LM';
        }

        if(x>36)
        {
            //right...
            if(y<37) return 'RF';
            if(y>63) return 'RB';
            return 'RM';
        }

        //center
        if(y<31) return 'CF';
        if(y<43) return 'AM';
        if(y<58) return 'CM';
        if(y<68) return 'DM';
        return 'CB';
    }

    this.buildFormation = function(formation)
    {
        formation.positions.forEach(function(pos){
            var role = this.getRole(pos);
            var position = new Position(role,pos);

            var positionOnScreen = this.fieldToScreen(pos);

            var placeHolder = position.asHTML();
            placeHolder.css("left", positionOnScreen.x-30);
            placeHolder.css("top", positionOnScreen.y-30);

            this.fieldElement.append(placeHolder);
        });
    }
}


