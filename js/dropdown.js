(function ($) {

    $.DropDown = function (toggle, ul) {
        var self = this;
        this.toggle = $(toggle);
        this.opts = $(ul).children('li');
        this.hideOpts();
        this.height = 45;

        this.toggle.on('mousedown', function (event) {
            self.opened ? self.close() : self.open();
            return false;
        });

        this.opts.on('click', function () {
            if (self.opened) {
                var opt = $(this);
//                self.options.onOptionSelect( opt );
//                self.inputEl.val(opt.data('value' ));
//                self.selectlabel.html( opt.html() );
//                $(this)
                self.close();
                //TODO: something here
                console.log(this);
            }
        });
    }

    $.DropDown.prototype.hideOpts = function () {
        this.opts.each(function (i) {
            $(this).css({
                opacity: 0,
                marginLeft: -100,
                top: ( i + 1 ) * self.height
            });
        });
    }

    /**
     * Open
     */
    $.DropDown.prototype.open = function () {
        this.toggle.toggleClass('active');
        this.opts.each(function (i) {
            $(this).css({
                opacity: 1,
                top: self.height,
                marginLeft: 0,
                transitionDelay: (i * 100) + 'ms'
            });
        });
        this.opened = true;
    };

    /**
     * Close
     */
    $.DropDown.prototype.close = function () {
        var self = this;
        this.toggle.toggleClass('active');
        this.opts.each(function (i) {
            $(this).css({ 'transition-delay': ((self.opts.length - i) * 10) + 'ms'});
        });
        this.hideOpts();
        this.opened = false;
    }

    $.fn.dropdown = function (ul) {
        return new $.DropDown( this, ul );
    };
}($))