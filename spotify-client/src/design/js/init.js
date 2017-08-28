$(document).ready(function () {
    $(".loader").fadeOut("slow");;
});
// Typify
(function () {
    'use strict';

    var typify = new Typify('.typed', {
        strings: ["una agencia digital.", "un grupo de desarrolladores.", "tus socios digitales.", "borop. ^1000"],
        typeSpeed: 60,
        backSpeed: 30,
        startDelay: 200,
        fadeOutDelay: 900,
        loop: true
    });
})();

// Word rotator
(function () {
    'use strict';

    $(".rotating").Rotator({
        animation: "zoomIn",
        separator: "|",
        speed: 2000,
    });
})();

// Particles
(function () {
    'use strict';

    particlesJS.load('particles-js', 'js/particles.json', function () { });
})();

// Showcase
(function () {
    'use strict';

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {
        hasClass = function (elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function (elem, c) {
            elem.classList.add(c);
        };
        removeClass = function (elem, c) {
            elem.classList.remove(c);
        };
    }
    else {
        hasClass = function (elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function (elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function (elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }

    var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

    // transport
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(classie);
    } else {
        // browser global
        window.classie = classie;
    }

    new Slideshow($('#slideshow'));

    var wrap = $('.showcase-wrapper'),
        mockup = $('.mockup'),
        mockupWidth = mockup.offsetWidth;

    scaleMockup();

    function scaleMockup() {
        var wrapWidth = wrap.offsetWidth,
            val = wrapWidth / mockupWidth;

        mockup.style.transform = 'scale3d(' + val + ', ' + val + ', 1)';
    }

    window.addEventListener('resize', resizeHandler);

    function resizeHandler() {
        function delayed() {
            resize();
            resizeTimeout = null;
        }

        if (typeof resizeTimeout != 'undefined') {
            clearTimeout(resizeTimeout);
        }

        resizeTimeout = setTimeout(delayed, 50);
    }

    function resize() {
        scaleMockup();
    }
})();