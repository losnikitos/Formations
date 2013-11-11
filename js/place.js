function Place(id, position) {
    this.id = id;
    this.onField = position;
    this.onScreen = {x: 0, y: 0};
    /**
     * Размер иконки-футболки в пикселях
     * @type {number}
     */
    var size = 60;

    /**
     * Точка, по которой считаются координаты
     * @type {{x: number, y: number}}
     */
    var anchor = {x: 30, y: 50}

    this.render = function () {
        this.elem = $('<div/>');
        this.elem.addClass('placeHolder');
        this.elem.attr("id", id);


        this.elem.css({"left": this.field.screenCenter.x - anchor.x, "top": this.field.screenCenter.x - anchor.y});

        var placeIcon = $('<div/>');
        placeIcon.html(this.name);
        placeIcon.addClass('placeIcon');

        this.elem.append(placeIcon);
    };

    /**
     * Встаем на нужное место (todo: с анимацией), когда загружаем расстановку
     * @param newPosition
     */
    this.moveTo = function (positionOnField) {
        this.onField = positionOnField;
        this.onScreen = this.field.fieldToScreen(positionOnField);
        this.elem.animate({"left": this.onScreen.x - anchor.x, "top": this.onScreen.y - anchor.y}, 500, "easeOutCubic");
        this.updateLabel();
    }

    /**
     * Обновляем элемент-представление
     */
    this.updateLabel = function () {
        this.name = this.field.getRole(this.onField);
        this.elem.html(this.name);
        this.elem.zIndex(Math.round(this.onField.y));
    }

    /**
     * Нас перетаскивают мышкой, а мы пересчитываем позицию на поле и роль.
     */
    this.onDrag = function (screenPosition) {
        var anchorPosition = {x: screenPosition.x + anchor.x, y: screenPosition.y + anchor.y};
        this.onScreen = anchorPosition;
        this.onField = this.field.screenToField(anchorPosition);
        this.updateLabel();
        $("#info").html(Math.round(this.onField.x) + ',' + Math.round(this.onField.y));
    }
}