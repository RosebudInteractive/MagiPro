$(function() {
    var $B = $('body'),
        $D = $(document),
        $W = $(window);

    $W.on('scroll', function () {
        var top = $(this).scrollTop();

        setMenu();

        if ($('.js-tab-controls-wrap').length) {
            setControls(top);
        }
    });

    function setMenu() {
        var header = $('.js-header');

        if ($W.scrollTop() > 0) {
            header.addClass('_fixed');
        } else {
            header.removeClass('_fixed');
        }
    }


    if ($('.js-tab-controls-wrap').length) {
        var offset = $('.js-tab-controls-wrap').offset().top;
    }

    function setControls(top) {
        var elem = $('.js-tab-controls-wrap'),
            headerH = parseFloat($('.js-header').height());

        if (top+headerH+52 > offset && !elem.is('._fixed')) {
            elem.addClass("_fixed");
        } else if (top+headerH+52 <= offset){
            elem.removeClass("_fixed");
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

    var tabControls = $('.js-tab-controls li');
    var tabs = $('.js-tabs li');
    tabControls.on('click', function() {
        tabControls.removeClass('current');
        tabs.removeClass('current');
        $(this).addClass('current');

        var n = $(this).index();

        $(tabs).each(function() {
            var i = $(this).index();
            if (i == n) {
                $(this).addClass('current');
            }
        })
    })
});







