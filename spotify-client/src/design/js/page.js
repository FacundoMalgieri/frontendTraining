// Header fixed effect
(() => {
    'use strict';

    $(document).on('click', '.navbar-nav > li a', function(e) {
        e.preventDefault();
        var route = $(this).attr("href").substr(1);
        var target = $('#' + route);

        $('html, body').animate({
            scrollTop: target.offset().top - 130
        }, 1000, 'swing', function() {});	
    });

    $(window).scroll(function() {    
        var scrollTop = $(window).scrollTop();

        if (scrollTop > 250) {
            $('.navbar-borop').addClass('navbar-fixed');

            $('.wrapper section').each(function(i) {
                $(this).inViewport(function (visible) {
                    var target = $(this).attr('id') || 'unkown';

                    if (visible) {
                        $('.navbar-nav > li a.active').removeClass('active');
                        $('.navbar-nav > li a[href="#' + $(this).attr('id') + '"]').addClass('active');
                        return false;
                    }
                });
            });
        }
        
        if (scrollTop <= 46) {
            $('.navbar-borop').removeClass('navbar-fixed');
            $('.navbar-nav > li a.active').removeClass('active');
            $('.navbar-nav > li a:first').addClass('active');
        }
    });
})();

// Hero scroll animation
(() => {
    'use strict';

    $(document).on('click', '.explore', function(e) {

        $('html, body').animate({
            scrollTop: $('.welcome').offset().top - 130
        }, 'slow', 'swing', function() {});	
    });
})();

// Back to top
(() => {
    $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop();
        
        if (scrollTop > 400)
            $('.back-to-top').removeClass('hidden');
        else
            $('.back-to-top').addClass('hidden');
    });

    $('.back-to-top').on('click', function (e) {
        e.preventDefault();
        
        $(this).addClass('hidden');
        
        $('html, body').animate({
            scrollTop: 0
        }, 700);
    });
})();

// Animations
(() => {
    $(".animated").inViewport(function (visible) {
        var animation = $(this).attr('data-animation');
        var delay = $(this).attr('data-delay');

        if (visible) {
            if (delay) {
                setTimeout(() => {
                    $(this).removeClass("no-visible").addClass(animation);
                }, delay);
            } else {
                $(this).removeClass("no-visible").addClass(animation);
            }
        }
    });
})();