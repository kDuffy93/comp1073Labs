$(function() {
    $(window).on("scroll", function() {
        if ($(window).scrollTop() > 50) {
            $(".sticky-header").addClass("scrolled-header");
        } else {
            $("sticky-header").removeClass("Scrolled-header");
        }
    })
});