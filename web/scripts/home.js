(function ($) {
    'use strict'; jQuery(document).on('ready', function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('a.page-scroll').on('click',
            function (e) {
                var anchor = $(this);
                $('html, body').stop().animate({ scrollTop: $(anchor.attr('href')).offset().top  }, 1500);
                e.preventDefault();
            });
        function scrollCalc(win) {
            if ($(win).scrollTop() > 100) { $('.main-menu').addClass('menu-animation'); } else { $('.main-menu').removeClass('menu-animation'); }
        }
        $(window).on('scroll', function () { scrollCalc(this); });
        scrollCalc(window);
        $(document).on('click', '.navbar-collapse.in', function (e) { if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') { $(this).collapse('hide'); } });
        $('.services-slider').owlCarousel({ autoPlay: false, items: 3, itemsDesktop: [1199, 3], itemsDesktopSmall: [979, 2], itemsTablet: [768, 1], pagination: true });
        $('.client-testimonial').owlCarousel({ autoPlay: false, items: 2, itemsDesktop: [1199, 2], itemsDesktopSmall: [979, 2], itemsTablet: [768, 1], pagination: true });
        $('.counter-section').on('inview', function (event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                $(this).find('.timer').each(function () { var $this = $(this); $({ Counter: 0 }).animate({ Counter: $this.text() }, { duration: 2000, easing: 'swing', step: function () { $this.text(Math.ceil(this.Counter)); } }); });
                $(this).unbind('inview');
            }
        });
        var pageSection = $("section");
        pageSection.each(function (indx) { if ($(this).attr("data-background")) { $(this).css("background-image", "url(" + $(this).data("background") + ")"); } });


    }); new WOW().init();
})(jQuery);

$(function () {
    var navMain = $("#nav-main");
    navMain.on("click", "a", null, function () {
        navMain.collapse('hide');
    });
});