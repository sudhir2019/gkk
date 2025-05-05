$(function() {
    "use strict";
    $(".bg").fadeIn();
    $(document).keydown(function(f) {
        // ESCAPE key pressed
        if (f.keyCode === 27) {
            $(".bg").fadeOut();
        }
    });
    $(".close").click(function() {
        $(".bg").fadeOut();
    });

    $(".close-icon").click(function() {
        $(".bg").fadeOut();
    });
});