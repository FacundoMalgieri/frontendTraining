
// Word rotator
(function() {
    $(".rotating").Rotator({
        animation: "zoomIn",
        separator: "|",
        speed: 2000,
    });
})();

// Hero scroll animation
(function() {
    $(document).on('click', '.mouse-icon', function(e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $('.welcome').offset().top - 130
        }, 'slow', 'swing', function() {});	
    });
})();