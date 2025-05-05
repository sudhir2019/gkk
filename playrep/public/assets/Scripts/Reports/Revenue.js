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

    $("#btnSearch").click(function () {
        var FDate = $("#txtFromDate").val();
        var TDate = $("#txtToDate").val();
        var valide = true;

        if (FDate == "") {
            $("#txtFromDate").removeClass();
            $("#txtFromDate").addClass("input-validation-error  hasDatepicker");
            $("#txtFromDate").focus();
            valide = false;
        }
        else {
            valide = true;
            $("#txtFromDate").removeClass();
        }

        if (TDate == "") {
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

            $("#dvRevenue").JqGrid({
                url: "RevenueData",
                columnHeaders: ["Sr. No.", "From Date", "To Date", "Profit", "Actual Rev", "Rev Ded", "Ded %", "Rev After Loan", "Revnue %"],
                columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                { columnName: "F_DATE", align: "center" },
                { columnName: "T_DATE", align: "center" },
                { columnName: "NEWPROFIT", align: "center" },
                { columnName: "ACTUAL_POINTS", align: "center" },
                { columnName: "REVENUE_DEDUCTED", align: "center" },
                { columnName: "DEDN_PERCENTAGE", align: "center" },
                { columnName: "POINT_TRANSFER", align: "center" },
                { columnName: "REVENUE", align: "center"}],
                postDataDetails: [{ strFromDate: $("#txtFromDate").val() },
                { strToDate: $("#txtToDate").val()}],
                themeUrl: "../Content/JqGrid/JqGridTheme.css",
                gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                extraData: { isExtra: true, extraRowCount: 1 },
                success: function (repData) {
                    var remainingLoan = repData[repData.length - 1]["TotalLoan"];
                    $(".remainLoan").text("Total Remaining Loan : " + remainingLoan);
                    var stratDate = repData[0]["F_DATE"];
                    var endDate = "";
                    if (repData.length > 1) {
                        endDate = repData[repData.length - 2]["T_DATE"];
                    }

                    if ($("#dvRevenue table:first tfoot tr").length > 0)
                        $("#dvRevenue table:first tfoot tr").html("");
                    else
                        $("#dvRevenue table:first tfoot").append("<tr></tr>");

                    $("#dvRevenue table:first tfoot tr").append("<td>Total</td><td>" + stratDate + "</td><td>" + endDate + "</td>");

                    var totalProfit = 0;
                    var totalActRev = 0;
                    //var totalLoanBal = 0;
                    var totalRevDed = 0;
                    var totalDedPer = 0;
                    var totalRevAftLoan = 0;
                    var totalRevPer = 0;
                    var tempDedPerCountRow = 0;

                    for (var i = 0; i < repData.length - 1; i++) {
                        totalProfit += parseFloat(repData[i]["NEWPROFIT"]);
                        totalActRev += parseFloat(repData[i]["ACTUAL_POINTS"]);
                        totalRevDed += parseFloat(repData[i]["REVENUE_DEDUCTED"]);
                        totalDedPer += parseFloat(repData[i]["DEDN_PERCENTAGE"]);
                        totalRevAftLoan += parseFloat(repData[i]["POINT_TRANSFER"]);

                        if (parseFloat(repData[i]["DEDN_PERCENTAGE"]) > 0)
                            tempDedPerCountRow++;
                    }

                    totalRevPer = (totalActRev / totalProfit * 100).toFixed(2);

                    if (totalDedPer > 0)
                        totalDedPer = (totalDedPer / tempDedPerCountRow).toFixed(2);
                    else
                        totalDedPer = (0).toFixed(2);

                    totalProfit = (totalProfit).toFixed(2);
                    totalActRev = (totalActRev).toFixed(2);
                    //totalLoanBal = (totalLoanBal).toFixed(2);
                    totalRevDed = (totalRevDed).toFixed(2);
                    totalRevAftLoan = (totalRevAftLoan).toFixed(2);

                    $("#dvRevenue table:first tfoot tr").append("<td>" + totalProfit.toString() + "</td><td>" + totalActRev.toString() + "</td><td>" + totalRevDed + "</td><td>" + totalDedPer + "</td><td>" + totalRevAftLoan + "</td><td>" + totalRevPer + "</td>");

                    $("#dvRevenue table:first tbody tr").each(function () {
                        var allTds = $(this).find("td");

                        var tempProfit = parseFloat($(allTds[3]).html());
                        var tempActRev = parseFloat($(allTds[4]).html());
                        var tempRevAfterLoan = parseFloat($(allTds[7]).html());
                        var tempRevPer = parseFloat($(allTds[8]).html());

                        if (tempProfit < 0)
                            $(allTds[3]).attr("style", "color:red");
                        else
                            $(allTds[3]).removeAttr("style");

                        if (tempActRev < 0)
                            $(allTds[4]).attr("style", "color:red");
                        else
                            $(allTds[4]).removeAttr("style");

                        if (tempRevAfterLoan < 0)
                            $(allTds[7]).attr("style", "color:red");
                        else
                            $(allTds[7]).removeAttr("style");

                        if (tempRevPer < 0)
                            $(allTds[8]).attr("style", "color:red");
                        else
                            $(allTds[8]).removeAttr("style");
                    });

                    $("#dvRevenue table:first tbody tr td:nth-child(4)").css({ "cursor": "pointer" });
                    $("#dvRevenue table:first tbody tr td:nth-child(4)").unbind("click");
                    $("#dvRevenue table:first tbody tr td:nth-child(4)").bind("click", function () {

                        var memberType = $("#hdnMemberType").val();
                        var tempFromDate = $(this).parent().find("td").eq(1).text();
                        var tempToDate = $(this).parent().find("td").eq(2).text();

                        $("#dvWeekDetails").html("");
                        loading(); // loading
                        setTimeout(function () { // then show popup, deley in .5 second
                            loadPopup(); // function show popup 
                        }, 500); // .5 second

                        if (memberType == "A") {
                            $("#dvWeekDetails").removeClass("grid");
                            $("#dvWeekDetails").addClass("tableformatting");
                            $("#paraWeekDate").text("Week Details :" + tempFromDate + " to " + tempToDate);
                            $.ajax({
                                url: 'RevenueWeekDetailForAgent',
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                datatype: 'json',
                                data: '{strFromDate:"' + tempFromDate + '",strToDate:"' + tempToDate + '"}',
                                beforeSend: function () {
                                },
                                success: function (data) {
                                    $("#dvWeekDetails").html(data);
                                    closeloading();
                                },
                                error: function (xhr, err) {
                                    $("#dvWeekDetails").html(xhr.responseText);
                                    closeloading();
                                }
                            });
                        }
                        else if (memberType == "P") {
                            $("#dvWeekDetails").removeClass("tableformatting");
                            $("#dvWeekDetails").addClass("grid");

                            $("#dvWeekDetails").JqGrid({
                                url: "RevenueWeekDetailsForPartner",
                                columnHeaders: ["Sr. No.", "Agent ID", "Name", "Profit"],
                                columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                                               { columnName: "AGENT_ID", align: "center" },
                                               { columnName: "CCSLOCATION", align: "center" },
                                               { columnName: "NEWPROFIT", align: "right"}],
                                postDataDetails: [{ strFromDate: tempFromDate },
                                              { strToDate: tempToDate}],
                                themeUrl: "../Content/JqGrid/JqGridTheme.css",
                                gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                                pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                                sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                                success: function (repData) {
                                    $("#paraWeekDate").text("Week Details :" + tempFromDate + " to " + tempToDate);
                                    $("#dvWeekDetails table:first tbody tr").each(function () {
                                        var allTds = $(this).find("td");

                                        var agentCellText = $(this).find("td").eq(1).text();
                                        var agentCellNewData = "<a target='_blank' href='/SingleCCSMail.mvc/ManagerSingleCCSMail?strFromDate=" + tempFromDate + "&strToDate=" + tempToDate + "&strAgentID=" + agentCellText + "&strAgentName=" + $(allTds[2]).text() + "' style='color:purple'>" + agentCellText + "</a>";

                                        $(this).find("td").eq(1).empty();
                                        $(this).find("td").eq(1).append(agentCellNewData);

                                        var tempProfit = parseFloat($(allTds[3]).html());

                                        if (tempProfit < 0)
                                            $(allTds[3]).attr("style", "color:red");
                                        else
                                            $(allTds[3]).removeAttr("style");
                                    });

                                    closeloading();
                                },
                                errorMsg: function (repError) {
                                    if (repError == "Session Expired") {
                                        window.location = "/Login.mvc/Index";
                                    }
                                    else {
                                        $("#dvWeekDetails").html(repError);
                                        closeloading();
                                    }
                                }
                            });
                        }
                        else if (memberType == "M") {
                            $("#dvWeekDetails").removeClass("tableformatting");
                            $("#dvWeekDetails").addClass("grid");
                            $("#dvWeekDetails").JqGrid({
                                url: "RevenueWeekDetailForManager",
                                columnHeaders: ["Sr. No.", "Agent ID", "Name", "Profit"],
                                columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                                               { columnName: "AGENT_ID", align: "center" },
                                               { columnName: "CCSLOCATION", align: "center" },
                                               { columnName: "NEWPROFIT", align: "right"}],
                                postDataDetails: [{ strFromDate: tempFromDate },
                                              { strToDate: tempToDate}],
                                themeUrl: "../Content/JqGrid/JqGridTheme.css",
                                gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                                pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                                sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                                success: function (repData) {
                                    $("#paraWeekDate").text("Week Details :" + tempFromDate + " to " + tempToDate);
                                    $("#dvWeekDetails table:first tbody tr").each(function () {
                                        var allTds = $(this).find("td");

                                        var agentCellText = $(this).find("td").eq(1).text();
                                        var agentCellNewData = "<a target='_blank' href='/SingleCCSMail.mvc/ManagerSingleCCSMail?strFromDate=" + tempFromDate + "&strToDate=" + tempToDate + "&strAgentID=" + agentCellText + "&strAgentName=" + $(allTds[2]).text() + "' style='color:purple'>" + agentCellText + "</a>";

                                        $(this).find("td").eq(1).empty();
                                        $(this).find("td").eq(1).append(agentCellNewData);

                                        var tempProfit = parseFloat($(allTds[3]).html());

                                        if (tempProfit < 0)
                                            $(allTds[3]).attr("style", "color:red");
                                        else
                                            $(allTds[3]).removeAttr("style");
                                    });

                                    closeloading();
                                },
                                errorMsg: function (repError) {
                                    if (repError == "Session Expired") {
                                        window.location = "/Login.mvc/Index";
                                    }
                                    else {
                                        $("#dvWeekDetails").html(repError);
                                        closeloading();
                                    }
                                }
                            });
                        }
                        else if (memberType == "K") {
                            $("#dvWeekDetails").removeClass("tableformatting");
                            $("#dvWeekDetails").addClass("grid");
                            $("#dvWeekDetails").JqGrid({
                                url: "RevenueWeekDetailForMarketing",
                                columnHeaders: ["Sr. No.", "Manager ID", "Manager Name", "Profit"],
                                columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                                               { columnName: "MANAGERID", align: "center" },
                                               { columnName: "MANAGERNAME", align: "center" },
                                               { columnName: "NEWPROFIT", align: "right"}],
                                postDataDetails: [{ strFromDate: tempFromDate },
                                              { strToDate: tempToDate}],
                                themeUrl: "../Content/JqGrid/JqGridTheme.css",
                                gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                                pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                                sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                                success: function (repData) {
                                    $("#paraWeekDate").text("Week Details :" + tempFromDate + " to " + tempToDate);
                                    $("#dvWeekDetails table:first tbody tr").each(function () {
                                        var allTds = $(this).find("td");

                                        var managerCellText = $(this).find("td").eq(1).text();
                                        var managerCellNewData = "<a href='javascript://' style='color:purple'>" + managerCellText + "</a>";

                                        $(this).find("td").eq(1).empty();
                                        $(this).find("td").eq(1).append(managerCellNewData);

                                        var tempProfit = parseFloat($(allTds[3]).html());

                                        if (tempProfit < 0)
                                            $(allTds[3]).attr("style", "color:red");
                                        else
                                            $(allTds[3]).removeAttr("style");
                                    });

                                    $("#dvWeekDetails table:first tbody tr td a").bind("click", function () {

                                        var tempManagerID = $(this).text();
                                        var tempManagerName = $(this).parent().parent().find("td").eq(2).text();

                                        loading2(); // loading
                                        setTimeout(function () { // then show popup, deley in .5 second
                                            loadPopup2(); // function show popup 
                                        }, 500); // .5 second

                                        $("#dvManagerCCSList").JqGrid({
                                            url: "/MailReport.mvc/MarketingManagerCCSDetails",
                                            columnHeaders: ["Sr. No.", "Agent ID", "CCS Name", "Points"],
                                            columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                                               { columnName: "AGENT_ID", align: "center" },
                                               { columnName: "CCSLOCATION", align: "center" },
                                               { columnName: "NEWPROFIT", align: "right"}],
                                            postDataDetails: [{ strFromDate: tempFromDate },
                                              { strToDate: tempToDate },
                                              { strManagerID: tempManagerID}],
                                            themeUrl: "../Content/CSS/MailMarketingManager.css",
                                            gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                                            pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                                            sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                                            success: function (repData) {
                                                $("#paraManagerName").text("Details for Manager " + tempManagerName + "(" + tempManagerID + ")");
                                                $("#paraWeekDetails").text("Details for the Week " + tempFromDate + " to " + tempToDate);
                                                $("#dvManagerCCSList table:first tbody tr").each(function () {
                                                    var agentCellText = $(this).find("td").eq(1).text();
                                                    var agentCellNewData = "<a target='_blank' href='/SingleCCSMail.mvc/MarketingSingleCCSMail?strFromDate=" + tempFromDate + "&strToDate=" + tempToDate + "&strAgentID=" + agentCellText + "&strAgentName=" + $(this).find("td").eq(2).text() + "' style='color:purple'>" + agentCellText + "</a>";
                                                    $(this).find("td").eq(1).empty();
                                                    $(this).find("td").eq(1).append(agentCellNewData);

                                                    var ccsProfit = parseFloat($(this).find("td").eq(3).text());
                                                    if (ccsProfit < 0)
                                                        $(this).find("td").eq(3).attr("style", "color:red;");
                                                    else
                                                        $(this).find("td").eq(3).removeAttr("style");
                                                });

                                                closeloading2();
                                            },
                                            errorMsg: function (repError) {
                                                if (repError == "Session Expired") {
                                                    window.location = "/Login.mvc/Index";
                                                }
                                                else {
                                                    $("#dvManagerCCSList").html("<span style=\"color:black;\">" + repError + "</span>");
                                                    closeloading2();
                                                }
                                            }
                                        });
                                    });

                                    closeloading();
                                },
                                errorMsg: function (repError) {
                                    if (repError == "Session Expired") {
                                        window.location = "/Login.mvc/Index";
                                    }
                                    else {
                                        $("#dvWeekDetails").html(repError);
                                        closeloading();
                                    }
                                }
                            });
                        }
                    });

                    $("#loader").hide();
                },
                errorMsg: function (repError) {
                    if (repError == "Session Expired") {
                        window.location = "/Login.mvc/Index";
                    }
                    else {
                        $("#dvRevenue").html(repError);
                        $("#loader").hide();
                    }
                }
            });
        }
    });

    function GetAllRevenue() {
        $("#loader").show();

        $("#dvRevenue").JqGrid({
            url: "RevenueData",
            columnHeaders: ["Sr. No.", "From Date", "To Date", "Profit", "Actual Rev", "Rev Ded", "Ded %", "Rev After Loan", "Revnue %"],
            columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                { columnName: "F_DATE", align: "center" },
                { columnName: "T_DATE", align: "center" },
                { columnName: "NEWPROFIT", align: "center" },
                { columnName: "ACTUAL_POINTS", align: "center" },
                { columnName: "REVENUE_DEDUCTED", align: "center" },
                { columnName: "DEDN_PERCENTAGE", align: "center" },
                { columnName: "POINT_TRANSFER", align: "center" },
                { columnName: "REVENUE", align: "center"}],
            postDataDetails: [{ strFromDate: "" },
                { strToDate: ""}],
            themeUrl: "../Content/JqGrid/JqGridTheme.css",
            gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
            pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
            sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
            extraData: { isExtra: true, extraRowCount: 1 },
            success: function (repData) {

                var remainingLoan = repData[repData.length - 1]["TotalLoan"];
                $(".remainLoan").text("Total Remaining Loan : " + remainingLoan);
                var stratDate = repData[0]["F_DATE"];
                var endDate = "";
                if (repData.length > 1) {
                    endDate = repData[repData.length - 2]["T_DATE"];
                }

                if ($("#dvRevenue table:first tfoot tr").length > 0)
                    $("#dvRevenue table:first tfoot tr").html("");
                else
                    $("#dvRevenue table:first tfoot").append("<tr></tr>");

                $("#dvRevenue table:first tfoot tr").append("<td>Total</td><td>" + stratDate + "</td><td>" + endDate + "</td>");

                var totalProfit = 0;
                var totalActRev = 0;
                //var totalLoanBal = 0;
                var totalRevDed = 0;
                var totalDedPer = 0;
                var totalRevAftLoan = 0;
                var totalRevPer = 0;
                var tempDedPerCountRow = 0;

                for (var i = 0; i < repData.length - 1; i++) {
                    totalProfit += parseFloat(repData[i]["NEWPROFIT"]);
                    totalActRev += parseFloat(repData[i]["ACTUAL_POINTS"]);
                    totalRevDed += parseFloat(repData[i]["REVENUE_DEDUCTED"]);
                    totalDedPer += parseFloat(repData[i]["DEDN_PERCENTAGE"]);
                    totalRevAftLoan += parseFloat(repData[i]["POINT_TRANSFER"]);

                    if (parseFloat(repData[i]["DEDN_PERCENTAGE"]) > 0)
                        tempDedPerCountRow++;
                }

                totalRevPer = (totalActRev / totalProfit * 100).toFixed(2);

                if (totalDedPer > 0)
                    totalDedPer = (totalDedPer / tempDedPerCountRow).toFixed(2);
                else
                    totalDedPer = (0).toFixed(2);

                totalProfit = (totalProfit).toFixed(2);
                totalActRev = (totalActRev).toFixed(2);
                totalRevDed = (totalRevDed).toFixed(2);
                totalRevAftLoan = (totalRevAftLoan).toFixed(2);

                $("#dvRevenue table:first tfoot tr").append("<td>" + totalProfit.toString() + "</td><td>" + totalActRev.toString() + "</td><td>" + totalRevDed + "</td><td>" + totalDedPer + "</td><td>" + totalRevAftLoan + "</td><td>" + totalRevPer + "</td>");

                $("#dvRevenue table:first tbody tr").each(function () {
                    var allTds = $(this).find("td");

                    var tempProfit = parseFloat($(allTds[3]).html());
                    var tempActRev = parseFloat($(allTds[4]).html());
                    var tempRevAfterLoan = parseFloat($(allTds[7]).html());
                    var tempRevPer = parseFloat($(allTds[8]).html());

                    if (tempProfit < 0)
                        $(allTds[3]).attr("style", "color:red");
                    else
                        $(allTds[3]).removeAttr("style");

                    if (tempActRev < 0)
                        $(allTds[4]).attr("style", "color:red");
                    else
                        $(allTds[4]).removeAttr("style");

                    if (tempRevAfterLoan < 0)
                        $(allTds[7]).attr("style", "color:red");
                    else
                        $(allTds[7]).removeAttr("style");

                    if (tempRevPer < 0)
                        $(allTds[8]).attr("style", "color:red");
                    else
                        $(allTds[8]).removeAttr("style");
                });

                $("#dvRevenue table:first tbody tr td:nth-child(4)").css({ "cursor": "pointer" });
                $("#dvRevenue table:first tbody tr td:nth-child(4)").unbind("click");
                $("#dvRevenue table:first tbody tr td:nth-child(4)").bind("click", function () {

                    var memberType = $("#hdnMemberType").val();
                    var tempFromDate = $(this).parent().find("td").eq(1).text();
                    var tempToDate = $(this).parent().find("td").eq(2).text();

                    $("#dvWeekDetails").html("");
                    loading(); // loading
                    setTimeout(function () { // then show popup, deley in .5 second
                        loadPopup(); // function show popup 
                    }, 500); // .5 second

                    if (memberType == "A") {
                        $("#dvWeekDetails").removeClass("grid");
                        $("#dvWeekDetails").addClass("tableformatting");
                        $("#paraWeekDate").text("Week Details :" + tempFromDate + " to " + tempToDate);
                        $.ajax({
                            url: 'RevenueWeekDetailForAgent',
                            type: 'POST',
                            contentType: "application/json; charset=utf-8",
                            datatype: 'json',
                            data: '{strFromDate:"' + tempFromDate + '",strToDate:"' + tempToDate + '"}',
                            beforeSend: function () {
                            },
                            success: function (data) {
                                $("#dvWeekDetails").html(data);
                                closeloading();
                            },
                            error: function (xhr, err) {
                                $("#dvWeekDetails").html(xhr.responseText);
                                closeloading();
                            }
                        });
                    }
                    else if (memberType == "P") {
                        $("#dvWeekDetails").removeClass("tableformatting");
                        $("#dvWeekDetails").addClass("grid");

                        $("#dvWeekDetails").JqGrid({
                            url: "RevenueWeekDetailsForPartner",
                            columnHeaders: ["Sr. No.", "Agent ID", "Name", "Profit"],
                            columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                                               { columnName: "AGENT_ID", align: "center" },
                                               { columnName: "CCSLOCATION", align: "center" },
                                               { columnName: "NEWPROFIT", align: "right"}],
                            postDataDetails: [{ strFromDate: tempFromDate },
                                              { strToDate: tempToDate}],
                            themeUrl: "../Content/JqGrid/JqGridTheme.css",
                            gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                            pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                            sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                            success: function (repData) {
                                $("#paraWeekDate").text("Week Details :" + tempFromDate + " to " + tempToDate);
                                $("#dvWeekDetails table:first tbody tr").each(function () {
                                    var allTds = $(this).find("td");

                                    var agentCellText = $(this).find("td").eq(1).text();
                                    var agentCellNewData = "<a target='_blank' href='/SingleCCSMail.mvc/ManagerSingleCCSMail?strFromDate=" + tempFromDate + "&strToDate=" + tempToDate + "&strAgentID=" + agentCellText + "&strAgentName=" + $(allTds[2]).text() + "' style='color:purple'>" + agentCellText + "</a>";

                                    $(this).find("td").eq(1).empty();
                                    $(this).find("td").eq(1).append(agentCellNewData);

                                    var tempProfit = parseFloat($(allTds[3]).html());

                                    if (tempProfit < 0)
                                        $(allTds[3]).attr("style", "color:red");
                                    else
                                        $(allTds[3]).removeAttr("style");
                                });

                                closeloading();
                            },
                            errorMsg: function (repError) {
                                if (repError == "Session Expired") {
                                    window.location = "/Login.mvc/Index";
                                }
                                else {
                                    $("#dvWeekDetails").html(repError);
                                    closeloading();
                                }
                            }
                        });
                    }
                    else if (memberType == "M") {
                        $("#dvWeekDetails").removeClass("tableformatting");
                        $("#dvWeekDetails").addClass("grid");
                        $("#dvWeekDetails").JqGrid({
                            url: "RevenueWeekDetailForManager",
                            columnHeaders: ["Sr. No.", "Agent ID", "Name", "Profit"],
                            columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                                               { columnName: "AGENT_ID", align: "center" },
                                               { columnName: "CCSLOCATION", align: "center" },
                                               { columnName: "NEWPROFIT", align: "right"}],
                            postDataDetails: [{ strFromDate: tempFromDate },
                                              { strToDate: tempToDate}],
                            themeUrl: "../Content/JqGrid/JqGridTheme.css",
                            gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                            pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                            sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                            success: function (repData) {
                                $("#paraWeekDate").text("Week Details :" + tempFromDate + " to " + tempToDate);
                                $("#dvWeekDetails table:first tbody tr").each(function () {
                                    var allTds = $(this).find("td");

                                    var agentCellText = $(this).find("td").eq(1).text();
                                    var agentCellNewData = "<a target='_blank' href='/SingleCCSMail.mvc/ManagerSingleCCSMail?strFromDate=" + tempFromDate + "&strToDate=" + tempToDate + "&strAgentID=" + agentCellText + "&strAgentName=" + $(allTds[2]).text() + "' style='color:purple'>" + agentCellText + "</a>";

                                    $(this).find("td").eq(1).empty();
                                    $(this).find("td").eq(1).append(agentCellNewData);

                                    var tempProfit = parseFloat($(allTds[3]).html());

                                    if (tempProfit < 0)
                                        $(allTds[3]).attr("style", "color:red");
                                    else
                                        $(allTds[3]).removeAttr("style");
                                });

                                closeloading();
                            },
                            errorMsg: function (repError) {
                                if (repError == "Session Expired") {
                                    window.location = "/Login.mvc/Index";
                                }
                                else {
                                    $("#dvWeekDetails").html(repError);
                                    closeloading();
                                }
                            }
                        });
                    }
                    else if (memberType == "K") {
                        $("#dvWeekDetails").removeClass("tableformatting");
                        $("#dvWeekDetails").addClass("grid");
                        $("#dvWeekDetails").JqGrid({
                            url: "RevenueWeekDetailForMarketing",
                            columnHeaders: ["Sr. No.", "Manager ID", "Manager Name", "Profit"],
                            columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                                               { columnName: "MANAGERID", align: "center" },
                                               { columnName: "MANAGERNAME", align: "center" },
                                               { columnName: "NEWPROFIT", align: "right"}],
                            postDataDetails: [{ strFromDate: tempFromDate },
                                              { strToDate: tempToDate}],
                            themeUrl: "../Content/JqGrid/JqGridTheme.css",
                            gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                            pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                            sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                            success: function (repData) {
                                $("#paraWeekDate").text("Week Details :" + tempFromDate + " to " + tempToDate);
                                $("#dvWeekDetails table:first tbody tr").each(function () {
                                    var allTds = $(this).find("td");

                                    var managerCellText = $(this).find("td").eq(1).text();
                                    var managerCellNewData = "<a href='javascript://' style='color:purple'>" + managerCellText + "</a>";

                                    $(this).find("td").eq(1).empty();
                                    $(this).find("td").eq(1).append(managerCellNewData);

                                    var tempProfit = parseFloat($(allTds[3]).html());

                                    if (tempProfit < 0)
                                        $(allTds[3]).attr("style", "color:red");
                                    else
                                        $(allTds[3]).removeAttr("style");
                                });

                                $("#dvWeekDetails table:first tbody tr td a").bind("click", function () {

                                    var tempManagerID = $(this).text();
                                    var tempManagerName = $(this).parent().parent().find("td").eq(2).text();

                                    loading2(); // loading
                                    setTimeout(function () { // then show popup, deley in .5 second
                                        loadPopup2(); // function show popup 
                                    }, 500); // .5 second

                                    $("#dvManagerCCSList").JqGrid({
                                        url: "/MailReport.mvc/MarketingManagerCCSDetails",
                                        columnHeaders: ["Sr. No.", "Agent ID", "CCS Name", "Points"],
                                        columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                                               { columnName: "AGENT_ID", align: "center" },
                                               { columnName: "CCSLOCATION", align: "center" },
                                               { columnName: "NEWPROFIT", align: "right"}],
                                        postDataDetails: [{ strFromDate: tempFromDate },
                                              { strToDate: tempToDate },
                                              { strManagerID: tempManagerID}],
                                        themeUrl: "../Content/CSS/MailMarketingManager.css",
                                        gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                                        pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                                        sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                                        success: function (repData) {
                                            $("#paraManagerName").text("Details for Manager " + tempManagerName + "(" + tempManagerID + ")");
                                            $("#paraWeekDetails").text("Details for the Week " + tempFromDate + " to " + tempToDate);
                                            $("#dvManagerCCSList table:first tbody tr").each(function () {
                                                var agentCellText = $(this).find("td").eq(1).text();
                                                var agentCellNewData = "<a target='_blank' href='/SingleCCSMail.mvc/MarketingSingleCCSMail?strFromDate=" + tempFromDate + "&strToDate=" + tempToDate + "&strAgentID=" + agentCellText + "&strAgentName=" + $(this).find("td").eq(2).text() + "' style='color:purple'>" + agentCellText + "</a>";
                                                $(this).find("td").eq(1).empty();
                                                $(this).find("td").eq(1).append(agentCellNewData);

                                                var ccsProfit = parseFloat($(this).find("td").eq(3).text());
                                                if (ccsProfit < 0)
                                                    $(this).find("td").eq(3).attr("style", "color:red;");
                                                else
                                                    $(this).find("td").eq(3).removeAttr("style");
                                            });

                                            closeloading2();
                                        },
                                        errorMsg: function (repError) {
                                            if (repError == "Session Expired") {
                                                window.location = "/Login.mvc/Index";
                                            }
                                            else {
                                                $("#dvManagerCCSList").html("<span style=\"color:black;\">" + repError + "</span>");
                                                closeloading2();
                                            }
                                        }
                                    });
                                });

                                closeloading();
                            },
                            errorMsg: function (repError) {
                                if (repError == "Session Expired") {
                                    window.location = "/Login.mvc/Index";
                                }
                                else {
                                    $("#dvWeekDetails").html(repError);
                                    closeloading();
                                }
                            }
                        });
                    }
                });

                $("#loader").hide();
            },
            errorMsg: function (repError) { $("#dvRevenue").html(repError); $("#loader").hide(); }
        });
    }

    /* event for close the popup */
    $("div.close").hover(
					function () {
					    $('span.ecs_tooltip').show();
					},
					function () {
					    $('span.ecs_tooltip').hide();
					}
				);

    $("div.close").click(function () {
        disablePopup();  // function close pop up
    });

    $(this).keyup(function (event) {
        if (event.which == 27) { // 27 is 'Ecs' in the keyboard
            disablePopup();  // function close pop up
        }
    });

    $("div.backgroundPopup").click(function () {
        disablePopup();  // function close pop up
    });


    /************** start: functions. **************/
    function loading() {
        $("div.loader2").show();
    }
    function closeloading() {
        $("div.loader2").fadeOut('normal');
    }

    var popupStatus = 0; // set value

    function loadPopup() {
        if (popupStatus == 0) { // if value is 0, show popup
            $(".toPopup").fadeIn(0500); // fadein popup div
            $(".backgroundPopup").css("opacity", "0.7"); // css opacity, supports IE7, IE8
            $(".backgroundPopup").fadeIn(0001);
            popupStatus = 1; // and set value to 1
        }
    }

    function disablePopup() {
        if (popupStatus == 1) { // if value is 1, close popup
            $(".toPopup").fadeOut("normal");
            $(".backgroundPopup").fadeOut("normal");
            popupStatus = 0;  // and set value to 0
        }
    }
    /************** end: functions. **************/


    /************** start: functions. **************/
    function loading2() {
        $("div.loader3").show();
    }
    function closeloading2() {
        $("div.loader3").fadeOut('normal');
    }

    var popupStatus2 = 0; // set value

    function loadPopup2() {
        if (popupStatus2 == 0) { // if value is 0, show popup
            $(".toPopup2").fadeIn(0500); // fadein popup div
            $(".backgroundPopup2").css("opacity", "0.7"); // css opacity, supports IE7, IE8
            $(".backgroundPopup2").fadeIn(0001);
            popupStatus2 = 1; // and set value to 1
        }
    }

    function disablePopup2() {
        if (popupStatus2 == 1) { // if value is 1, close popup
            $(".toPopup2").fadeOut("normal");
            $(".backgroundPopup2").fadeOut("normal");
            popupStatus2 = 0;  // and set value to 0
        }
    }
    /************** end: functions. **************/

    /* event for close the popup */
    $("div.close2").hover(
					function () {
					    $('span.ecs_tooltip').show();
					},
					function () {
					    $('span.ecs_tooltip').hide();
					}
				);

    $("div.close2").click(function () {
        disablePopup2();  // function close pop up
    });

    $(this).keyup(function (event) {
        if (event.which == 27) { // 27 is 'Ecs' in the keyboard
            disablePopup2();  // function close pop up
        }
    });

    $("div.backgroundPopup2").click(function () {
        disablePopup2();  // function close pop up
    });

    GetAllRevenue();
});