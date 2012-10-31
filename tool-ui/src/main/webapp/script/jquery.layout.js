if (typeof jQuery !== 'undefined') (function($) {

// Layout manager.
$.plugin('layout', {

'init': function() {
    return this.liveInit(function() {
        var $layout = $(this);
        $layout.bind('resize.layout', function() {

            var getFlex = function($section) {
                return parseFloat($section.attr('data-flex')) || 1;
            };

            var resize = function($section) {
                var $flexibles = $section.find('> [data-flex]');

                if ($section.is('.horizontal')) {
                    var flexiblesWidth = $section.width();
                    $section.find('> :not([data-flex])').each(function() {
                        flexiblesWidth -= $(this).outerWidth(true);
                    });

                    var flexSum = 0;
                    $flexibles.each(function() {
                        flexSum += getFlex($(this));
                    });

                    $flexibles.each(function() {
                        var $child = $(this);
                        resize($child);
                        $child.width(flexiblesWidth * getFlex($child) / flexSum - $child.outerWidth(true) + $child.width());
                    });

                } else {
                    $flexibles.each(function() {
                        resize($(this));
                    });
                }
            };

            resize($(this));
        });

        $layout.resize();
        $layout.resize();

        // Recalculate everything on window resize.
        $(window).bind('resize.layout', $.throttle(100, function() {
            $layout.resize();
            $layout.resize();
        }));
    });
}

});

})(jQuery);