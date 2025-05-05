/// <reference path="../jquery-1.9.1.js" />
/// <reference path="../jquery-ui.js" />

$(function () {

    var divShowPointTransfer = false;
    var divShowGameReport = false;
    var divShowPointRecieved = false;
    var divShowRevenueReport = false;
    var divShowPointCancel = false;
    var divShowPointReject = false;

    var timerForLoader;

    var startSelectDate = new Date();
    startSelectDate.setMonth(startSelectDate.getMonth() - 1);

    var endSelectDate = new Date();

    $("#txtFromDate").DatePicker({
        format: "d-M-Y",
        direction: [$.datepicker.formatDate("dd-M-yy", startSelectDate), $.datepicker.formatDate("dd-M-yy", endSelectDate)],
        onSelect: function () {
            var selectedDate = $.datepicker.parseDate("dd-M-yy", $(this).val());
            selectedDate = selectedDate.setDate(selectedDate.getDate() - selectedDate.getDay() + (selectedDate.getDay() == 0 ? -6 : 1));
            selectedDate = new Date(selectedDate);
            var newSelectDate = (selectedDate.getDate() + "-" + (selectedDate.getMonth() == 0 ? 1 : (selectedDate.getMonth() + 1)).toString() + "-" + selectedDate.getFullYear()).toString();
            $(this).val($.datepicker.formatDate("dd-M-yy", $.datepicker.parseDate("dd-m-yy", newSelectDate)));
            selectedDate.setDate(selectedDate.getDate() + 6);
            $("#txtToDate").val($.datepicker.formatDate("dd-M-yy", selectedDate));

        }
    });

    function hideLoaderDiv() {
        if (divShowGameReport && divShowPointCancel && divShowPointRecieved && divShowPointReject && divShowPointTransfer && divShowRevenueReport) {
            $("#loader").hide();
            clearInterval(timerForLoader);
        }
    }

    $("#btnSearch").click(function () {
        var FDate = $("#txtFromDate").val();
        var TDate = $("#txtToDate").val();
        var valide = true;

        if (FDate == true) {
            $("#txtFromDate").removeClass();
            $("#txtFromDate").addClass("input-validation-error  hasDatepicker");
            $("#txtFromDate").focus();
            valide = false;
        }
        else {
            valide = true;
            $("#txtFromDate").removeClass();
        }


        if (TDate == true) {
            $("#txtToDate").removeClass();
            $("#txtToDate").addClass("input-validation-error  hasDatepicker");
            if (valide) {
                valide = false;
                $("#txtToDate").focus();
            }

        }
        else {
            $("#txtToDate").removeClass();
        }
        if (Date.parse(TDate) < Date.parse(FDate)) {
            valide = false;
            $("#txtToDate").removeClass();
            $("#txtToDate").addClass("input-validation-error  hasDatepicker");
            $("#txtToDate").focus();
        }
        if (valide) {

            $("#loader").show();

            timerForLoader = setInterval(hideLoaderDiv, 500);

            $("#dvPointTransfer").JqGrid({
                url: "PointTransferDetails",
                columnHeaders: ["Sr. No.", "From Member", "To Member", "Amount", "Transfer Time"],
                columnAttributes: [{ columnName: "SRNO", align: "center" },
                { columnName: "FROM_MEMBER_ID", align: "center" },
                { columnName: "TO_MEMBER_ID", align: "center" },
                { columnName: "TOTAL_AMOUNT_TRANSFER", align: "right" },
                { columnName: "TRANSFER_DATE", align: "center"}],
                postDataDetails: [{ strFromDate: $("#txtFromDate").val() },
                { strToDate: $("#txtToDate").val()}],
                themeUrl: "../Content/JqGrid/JqGridTheme.css",
                gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                success: function (repData) {
                    if ($("#dvPointTransfer table:first tfoot tr").length > 0)
                        $("#dvPointTransfer table:first tfoot tr").html("");
                    else
                        $("#dvPointTransfer table:first tfoot").append("<tr></tr>");

                    $("#dvPointTransfer table:first tfoot tr").append("<td>Total</td>");
                    var totalAmount = 0;
                    for (var i = 0; i < repData.length; i++) {
                        totalAmount += parseFloat(repData[i]["TOTAL_AMOUNT_TRANSFER"]);
                    }
                    totalAmount = (totalAmount).toFixed(2);
                    $("#dvPointTransfer table:first tfoot tr").append("<td colspan=\"2\"></td><td align=\"right\">" + totalAmount + "</td><td></td>");

                    divShowPointTransfer = true;

                },
                errorMsg: function (repError) {
                    if (repError == "Session Expired") {
                        window.location = "/Login.mvc/Index";
                    }
                    else {
                        $("#dvPointTransfer").html("<span style=\"color:black;\">" + repError + "</span>");
                        divShowPointTransfer = true;
                    }
                }
            });


            $("#dvPointReceived").JqGrid({
                url: "PointReceivedDetails",
                columnHeaders: ["Sr. No.", "From Member", "To Member", "Amount", "Recieved Time"],
                columnAttributes: [{ columnName: "SRNO", align: "center" },
                { columnName: "FROM_MEMBER_ID", align: "center" },
                { columnName: "TO_MEMBER_ID", align: "center" },
                { columnName: "TOTAL_AMOUNT_TRANSFER", align: "right" },
                { columnName: "RECIEVE_DATE", align: "center"}],
                postDataDetails: [{ strFromDate: $("#txtFromDate").val() },
                { strToDate: $("#txtToDate").val()}],
                themeUrl: "../Content/JqGrid/JqGridTheme.css",
                gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                success: function (repData) {
                    if ($("#dvPointReceived table:first tfoot tr").length > 0)
                        $("#dvPointReceived table:first tfoot tr").html("");
                    else
                        $("#dvPointReceived table:first tfoot").append("<tr></tr>");

                    $("#dvPointReceived table:first tfoot tr").append("<td>Total</td>");
                    var totalAmount = 0;
                    for (var i = 0; i < repData.length; i++) {
                        totalAmount += parseFloat(repData[i]["TOTAL_AMOUNT_TRANSFER"]);
                    }
                    totalAmount = (totalAmount).toFixed(2);
                    $("#dvPointReceived table:first tfoot tr").append("<td colspan=\"2\"></td><td align=\"right\">" + totalAmount + "</td><td></td>");

                    divShowPointRecieved = true;
                },
                errorMsg: function (repError) {
                    if (repError == "Session Expired") {
                        window.location = "/Login.mvc/Index";
                    }
                    else {
                        $("#dvPointReceived").html("<span style=\"color:black;\">" + repError + "</span>");
                        divShowPointRecieved = true;
                    }
                }
            });

            $("#dvPointReject").JqGrid({
                url: "PointRejectDetails",
                columnHeaders: ["Sr. No.", "From Member", "To Member", "Amount", "Reject Date"],
                columnAttributes: [{ columnName: "SRNO", align: "center" },
                { columnName: "FROM_MEMBER_ID", align: "center" },
                { columnName: "TO_MEMBER_ID", align: "center" },
                { columnName: "AMOUNT_TRANSFER", align: "right" },
                { columnName: "REJECT_DATE_NEW", align: "center"}],
                postDataDetails: [{ strFromDate: $("#txtFromDate").val() },
                { strToDate: $("#txtToDate").val()}],
                themeUrl: "../Content/JqGrid/JqGridTheme.css",
                gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                success: function (repData) {
                    divShowPointReject = true;
                },
                errorMsg: function (repError) {
                    if (repError == "Session Expired") {
                        window.location = "/Login.mvc/Index";
                    }
                    else {
                        $("#dvPointReject").html("<span style=\"color:black;\">" + repError + "</span>");
                        divShowPointReject = true;
                    }
                }
            });

            $("#dvPointCancel").JqGrid({
                url: "PointCancelDetails",
                columnHeaders: ["Sr. No.", "From Member", "To Member", "Amount", "Cancel Time"],
                columnAttributes: [{ columnName: "SRNO", align: "center" },
                { columnName: "FROM_MEMBER_ID", align: "center" },
                { columnName: "TO_MEMBER_ID", align: "center" },
                { columnName: "AMOUNT", align: "right" },
                { columnName: "CANCEL_DATE_NEW", align: "center"}],
                postDataDetails: [{ strFromDate: $("#txtFromDate").val() },
                { strToDate: $("#txtToDate").val()}],
                themeUrl: "../Content/JqGrid/JqGridTheme.css",
                gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                success: function (repData) {
                    divShowPointCancel = true;
                },
                errorMsg: function (repError) {
                    if (repError == "Session Expired") {
                        window.location = "/Login.mvc/Index";
                    }
                    else {
                        $("#dvPointCancel").html("<span style=\"color:black;\">" + repError + "</span>");
                        divShowPointCancel = true;
                    }
                }
            });

            $("#dvGamingReport").JqGrid({
                url: "GamingReportDetails",
                columnHeaders: ["Sr. No.", "Member", "Profit"],
                columnAttributes: [{ columnName: "SRNO", align: "center" },
                { columnName: "MEMBER", align: "center" },
                { columnName: "PROFIT", align: "center" }],
                postDataDetails: [{ strFromDate: $("#txtFromDate").val() },
                { strToDate: $("#txtToDate").val()}],
                themeUrl: "../Content/JqGrid/JqGridTheme.css",
                gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                sortSetting: { allowsorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                success: function (repData) {
                    if ($("#dvGamingReport table:first tfoot tr").length > 0)
                        $("#dvGamingReport table:first tfoot tr").html("");
                    else
                        $("#dvGamingReport table:first tfoot").append("<tr></tr>");

                    $("#dvGamingReport table:first tfoot tr").append("<td>Total</td>");
                    var totalAmount = 0;
                    for (var i = 0; i < repData.length; i++) {
                        totalAmount += parseFloat(repData[i]["PROFIT"]);
                    }
                    totalAmount = (totalAmount).toFixed(2);
                    if (totalAmount < 0)
                        $("#dvGamingReport table:first tfoot tr").append("<td></td><td align=\"right\" style=\"color:red\">" + totalAmount + "</td>");
                    else
                        $("#dvGamingReport table:first tfoot tr").append("<td></td><td align=\"right\">" + totalAmount + "</td>");

                    $("#dvGamingReport table:first tbody tr").each(function () {
                        var allTds = $(this).find("td");

                        var tempProfit = parseFloat($(allTds[2]).html());

                        if (tempProfit < 0)
                            $(allTds[2]).attr("style", "color:red");
                        else
                            $(allTds[2]).removeAttr("style");
                    });

                    divShowGameReport = true;
                },
                errorMsg: function (repError) {
                    if (repError == "Session Expired") {
                        window.location = "/Login.mvc/Index";
                    }
                    else {
                        $("#dvGamingReport").html("<span style=\"color:black;\">" + repError + "</span>");
                        divShowGameReport = true;
                    }
                }

            });

            $("#dvRevenueReport").JqGrid({
                url: "RevenueReportDetails",
                columnHeaders: ["Sr. No.", "Agent Id", "From Date", "To Date", "Profit", "Actual Points", "Point Transfer", "Revenue%"],
                columnAttributes: [{ columnName: "SRNO", align: "center" },
                { columnName: "AGENT_ID", align: "center" },
                { columnName: "FROM_DATE_NEW", align: "center" },
                { columnName: "TO_DATE_NEW", align: "center" },
                { columnName: "PROFIT", align: "center" },
                { columnName: "ACTUAL_POINTS", align: "center" },
                { columnName: "POINT_TRANSFER", align: "center" },
                { columnName: "REVENUE%", align: "center" },
                ],
                postDataDetails: [{ strFromDate: $("#txtFromDate").val() },
                { strToDate: $("#txtToDate").val()}],
                themeUrl: "../Content/JqGrid/JqGridTheme.css",
                gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                sortSetting: { allowsorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                success: function (repData) {
                    if ($("#dvRevenueReport table:first tfoot tr").length > 0)
                        $("#dvRevenueReport table:first tfoot tr").html("");
                    else
                        $("#dvRevenueReport table:first tfoot").append("<tr></tr>");

                    $("#dvRevenueReport table:first tfoot tr").append("<td>Total</td>");
                    var totalProfit = 0;
                    var totalActualPoints = 0;
                    var totalPointTransfer = 0;
                    var totalRevenuePer = 0;

                    for (var i = 0; i < repData.length; i++) {
                        totalProfit += parseFloat(repData[i]["PROFIT"]);
                        totalActualPoints += parseFloat(repData[i]["ACTUAL_POINTS"]);
                        totalPointTransfer += parseFloat(repData[i]["POINT_TRANSFER"]);
                    }
                    totalProfit = (totalProfit).toFixed(2);
                    totalActualPoints = (totalActualPoints).toFixed(2);
                    totalPointTransfer = (totalPointTransfer).toFixed(2);
                    totalRevenuePer = ((totalActualPoints / totalProfit) * 100).toFixed(2);
                    if (totalProfit < 0)
                        $("#dvRevenueReport table:first tfoot tr").append("<td colspan=\"3\"></td><td align=\"right\" style=\"color:red\">" + totalProfit + "</td><td align=\"right\">" + totalActualPoints + "</td><td align=\"right\">" + totalPointTransfer + "</td><td align=\"right\">" + totalRevenuePer + "</td>");
                    else
                        $("#dvRevenueReport table:first tfoot tr").append("<td colspan=\"3\"></td><td align=\"right\">" + totalProfit + "</td><td align=\"right\">" + totalActualPoints + "</td><td align=\"right\">" + totalPointTransfer + "</td><td align=\"right\">" + totalRevenuePer + "</td>");

                    $("#dvRevenueReport table:first tbody tr").each(function () {
                        var allTds = $(this).find("td");

                        var tempProfit = parseFloat($(allTds[4]).html());

                        if (tempProfit < 0)
                            $(allTds[4]).attr("style", "color:red");
                        else
                            $(allTds[4]).removeAttr("style");
                    });

                    divShowRevenueReport = true;
                },
                errorMsg: function (repError) {
                    if (repError == "Session Expired") {
                        window.location = "/Login.mvc/Index";
                    }
                    else {
                        $("#dvRevenueReport").html("<span style=\"color:black;\">" + repError + "</span>");
                        divShowRevenueReport = true;
                    }
                }

            });

        }

    });

});