// Header fixed effect
(() => {
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();

        if (scrollTop > 250) {
            $('.navbar-borop').addClass('navbar-fixed');
        }

        if (scrollTop <= 46)
            $('.navbar-borop').removeClass('navbar-fixed');
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

