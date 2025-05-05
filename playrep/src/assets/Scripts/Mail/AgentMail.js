/// <reference path="../jquery-1.9.1.js" />
/// <reference path="../jquery-ui.js" />
$(function () {

    var endSelectDate = new Date();

    $("#txtFromDate").DatePicker({
        format: "d-M-Y",
        direction: [false, $.datepicker.formatDate("dd-M-yy", endSelectDate)],
        onSelect: function () {
            var selectedDate = $.datepicker.parseDate("dd-M-yy", $(this).val());
            selectedDate = selectedDate.setDate(selectedDate.getDate() - selectedDate.getDay() + (selectedDate.getDay() == 0 ? -6 : 1));
            selectedDate = new Date(selectedDate);
            var newSelectDate = (selectedDate.getDate() + "-" + (selectedDate.getMonth() == 0 ? 1 : (selectedDate.getMonth() + 1)).toString() + "-" + selectedDate.getFullYear()).toString();
            $(this).val($.datepicker.formatDate("dd-M-yy", $.datepicker.parseDate("dd-m-yy", newSelectDate)));
            selectedDate.setDate(selectedDate.getDate() + 6);
            newSelectDate = (selectedDate.getDate() + "-" + (selectedDate.getMonth() == 0 ? 1 : (selectedDate.getMonth() + 1)).toString() + "-" + selectedDate.getFullYear()).toString();
            $("#txtToDate").val($.datepicker.formatDate("dd-M-yy", $.datepicker.parseDate("dd-m-yy", newSelectDate)));
        }
    });
});