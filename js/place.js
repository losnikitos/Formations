function Place(position) {
    this.onField = position;
    this.onScreen = {x: 0, y: 0};
    /**
     * Размер иконки-футболки в пикселях
     * @type {number}
     */
    var size= 60;

    this.render = function () {
        this.elem = $('<div/>');
        this.elem.addClass('placeHolder');

        var placeIcon = $('<div/>');
        placeIcon.html(this.name);
        placeIcon.addClass('placeIcon');

        this.elem.append(placeIcon);
    };

    /**
     * Встаем на нужное место (todo: с анимацией), когда загружаем расстановку
     * @param newPosition
     */
    this.moveTo = function (position) {
        this.onField = position;
        this.onScreen = this.field.fieldToScreen(position);
        this.name = this.field.getRole(position);
        this.updateView();
    }

    /**
     * Обновляем элемент-представление
     */
    this.updateView = function () {
        this.elem.css({"left": this.onScreen.x - size/2, "top": this.onScreen.y-size/2});
        this.elem.html(this.name);
    }

    /**
     * Нас перетаскивают мышкой, а мы пересчитываем позицию на поле и роль.
     * todo: написать
     */
    this.onDrag = function () {

    }
}