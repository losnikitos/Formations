var Position = function (field, name, coordinates) {
    this.field = field;
    this.name = name;

    this.onField = coordinates;
    this.onScreen = field.fieldToScreen(coordinates);

    /**
     * Делаем DOM-элемент
     * @returns {*|jQuery|HTMLElement}
     */
    this.render = function () {
        var placeHolder = $('<div/>');
        placeHolder.addClass('placeHolder');

        var placeIcon = $('<div/>');
        placeIcon.html(this.name);
        placeIcon.addClass('placeIcon');

        placeIcon.appendTo(placeHolder);

        return placeHolder;
    }

    /**
     * Встаем на нужное место (todo: с анимацией), когда загружаем расстановку
     * @param newPosition
     */
    this.moveOnField = function(newPosition)
    {

    }

    /**
     * Нас перетаскивают мышкой, а мы пересчитываем позицию на поле и роль.
     */
    this.onDrag = function()
    {
        
    }
}