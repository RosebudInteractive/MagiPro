$(function() {
    var $B = $('body'),
        $D = $(document),
        $W = $(window);

    $W.on('scroll', function () {
        setMenu();
    });

    function setMenu() {
        var header = $('.js-header');

        if ($W.scrollTop() > 0) {
            header.addClass('_fixed');
        } else {
            header.removeClass('_fixed');
        }
    }

    var course = $('.js-course');

    course.on('contextmenu', function (e) {
        var context = $(this).find('.js-context');

        e.preventDefault();

        if ($('.js-context.show').length) {
            hideContext();
        }

        context.addClass('show');
    });

    $D.on('click', hideContext);

    function hideContext() {
        var context = $('.js-context');

        context.removeClass('show');
    }
});







