function Place(position) {
    var self = this;
    this.onField = position;
    this.onScreen = {x: 0, y: 0};
    this.player = null
    draggingPlace = null;

    // Когда двигаем футболку
    this.setText = function (txt) {
        this.text.html(txt);
    }

    /**
     * Точка-центр дива. В onScreen лежат ее координаты
     * @type {{x: number, y: number}}
     */
    var anchor = {x: 30, y: 50}

    this.render = function () {
        this.elem = $('<div class="place"/>');
    }

    this.showTshirt = function () {
        this.text = $('<span/>').html(this.name);
        this.image = $('<img class="tshirt"/>');
        this.elem.empty().append([this.image, this.text]);
    }

    this.showPlayer = function (player) {
        this.text = $('<span/>').html(player.lastName);
        this.image = player.image().addClass('playerface')
        this.elem.empty().append([this.image, this.text]);
    }

    this.becomeDroppable = function () {
        this.elem.droppable({
            hoverClass: "hover",
            activeClass: "welcoming",
            over: function (event, ui) {
                ui.helper.addClass("hover");
                $(event.toElement).addClass("hover");

            },
            out: function (event, ui) {
                ui.helper.removeClass("hover");
                $(event.toElement).removeClass("hover");

            },
            drop: function (event, ui) {
                //this - div, на который кладут
                //self - js-объект Place, на который кладут

                //dragging - js-объект Place, который тащили
                //ui.helper - div, который тащили

                $(event.toElement).removeClass("hover");
                if (draggingPlace) //Тащим собрата-футболку (возможно, с игроком в ней)
                {
                    self.exchangeWith(draggingPlace);
                    $(ui.helper).removeClass("hover");
                    draggingPlace = null;
                }
                else {//Тащим игрока из списка
                    if (self.player)
                        self.player.enable();

                    self.acceptPlayer(draggingPlayer);
                    draggingPlayer = null;
                }
            }
        })
    };

    this.becomeDraggable = function () {
        this.elem.draggable({
            containment: "parent",

            start: function (event, ui) {
                self.originalPosition = self.onField;
                draggingPlace = self;
            },
            drag: function (ev, ui) {
                self.onDrag(ev, ui)
            },
            stop: function (event, ui) {
                draggingPlace = null;
            }
        });
    }

    /**
     * Встаем на нужное место (todo: с анимацией), когда загружаем расстановку
     * @param newPosition
     */
    this.moveTo = function (positionOnField) {
        this.onField = positionOnField;
        this.onScreen = field.fieldToScreen(positionOnField);
        this.elem.animate({
            "left": this.onScreen.x - anchor.x,
            "top": this.onScreen.y - anchor.y}, 500, "easeOutCubic");
        this.updateLabel();
    }

    /**
     * Обновляем элемент-представление
     */
    this.updateLabel = function () {
        if (!this.player)
            this.setText(field.getRole(this.onField));
        this.elem.zIndex(this.onField.y > 0 ? Math.round(this.onField.y) : 0);
    }

    /**
     * Нас перетаскивают мышкой, а мы пересчитываем позицию на поле и роль.
     * @param screenPosition Приходит из колбека при перетаскивании, содержит координаты левого верхнего угла дива
     */
    this.onDrag = function (event, ui) {
        var screenPosition = ui.position;
        var anchorPosition = {x: screenPosition.left + anchor.x, y: screenPosition.top + anchor.y};
        this.onScreen = anchorPosition;
        this.onField = field.screenToField(anchorPosition);
        this.updateLabel();
        $("#info").html(Math.round(this.onField.x) + ',' + Math.round(this.onField.y));
    }

    this.exchangeWith = function (dragged) {
//        debugger;
        var pos = this.onField;
        this.moveTo(dragged.originalPosition);
        dragged.moveTo(pos);
    }

    this.disappear = function () {
        this.elem.addClass("disappear");
    }

    this.acceptPlayer = function (player) {
        this.player = player;
        this.showPlayer(player);
        this.elem.addClass('hasPlayer');
        player.disable();
    }

    this.releasePlayer = function () {
        this.elem.removeClass('hasPlayer');
        this.showTshirt();
        this.moveTo(this.originalPosition);
        this.player.enable();
        self.player = null;
        this.updateLabel();
    }

    this.render();
    this.showTshirt();
}