function Place(position) {
    this.onField = position;
    this.onScreen = {x: 0, y: 0};

    /**
     * Точка-центр дива. В onScreen лежат ее координаты
     * @type {{x: number, y: number}}
     */
    var anchor = {x: 30, y: 50}

    this.putInto = function (field) {
        this.field = field;
        this.elem = $('<div class="placeHolder"/>');

        this.elem.css({
            "left": this.field.screenCenter.x - anchor.x,
            "top": this.field.screenCenter.x - anchor.y});

        var placeIcon = $('<div class="placeIcon"/>');
        placeIcon.html(this.name);

        this.elem.append(placeIcon);

        field.elem.append(this.elem);

        var place = this; // для замыкания
        this.elem.draggable({
            containment: "parent",
            drag: function(event, ui) {place.onDrag(event,ui)}});

        this.elem.droppable({
            accept: ".placeIcon",
            activeClass: "active"
        })
    };

    /**
     * Встаем на нужное место (todo: с анимацией), когда загружаем расстановку
     * @param newPosition
     */
    this.moveTo = function (positionOnField) {
        this.onField = positionOnField;
        this.onScreen = this.field.fieldToScreen(positionOnField);
        this.elem.animate({
            "left": this.onScreen.x - anchor.x,
            "top": this.onScreen.y - anchor.y}, 500, "easeOutCubic");
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
     * @param screenPosition Приходит из колбека при перетаскивании, содержит координаты левого верхнего угла дива
     */
    this.onDrag = function (event, ui) {
        var screenPosition = ui.position;
        var anchorPosition = {x: screenPosition.left + anchor.x, y: screenPosition.top + anchor.y};
        this.onScreen = anchorPosition;
        this.onField = this.field.screenToField(anchorPosition);
        this.updateLabel();
        $("#info").html(Math.round(this.onField.x) + ',' + Math.round(this.onField.y));
    }
}