// Typify
(function() {
    var typify = new Typify('.typed', {
        strings: ["a digital agency.", "a group of developers.", "your digital partners", "borop. ^1000"],
        typeSpeed: 60,
        backSpeed: 30,
        startDelay: 200,
        fadeOutDelay: 900,
        loop: true
    });
})();

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