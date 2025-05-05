/// <reference path="../jquery-1.7.1.js" />
$(function () {

    $("#username").keyup(function () {
        $(this).val($(this).val().toUpperCase());
    });
});