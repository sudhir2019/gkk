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
    $("#txtToDate").DatePicker({
        format: "d-M-Y",
        direction: [false, $.datepicker.formatDate("dd-M-yy", endSelectDate)]

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
                url: "PokerRevenue.mvc/PokerRevenueData",
                columnHeaders: ["Sr. No.", "From Date", "To Date", "Input", "Output", "Profit", "Rake", "Tranfer Point", "Revnue %"],
                columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                { columnName: "FROM DATE", align: "center" },
                { columnName: "TO DATE", align: "center" },
                { columnName: "INPUT", align: "center" },
                { columnName: "OUTPUT", align: "center" },
                { columnName: "PROFIT", align: "center" },
                { columnName: "RAKE", align: "center" },
                { columnName: "TRANSFER AMOUNT", align: "center" },
                { columnName: "REVENUE%", align: "center"}],
                postDataDetails: [{ strFromDate: $("#txtFromDate").val() },
                { strToDate: $("#txtToDate").val()}],
                themeUrl: "../Content/JqGrid/JqGridTheme.css",
                gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                success: function (repData) {
                    var stratDate = repData[0]["FROM DATE"];
                    var endDate = repData[repData.length - 1]["TO DATE"];

                    $("#dvRevenue table:first tbody tr").each(function () {

                        var memberTD = $(this).find("td");

                        var tempProfit = parseFloat($(memberTD[5]).html());

                        if (tempProfit < 0)
                            $(memberTD[5]).attr("style", "color:red");
                        else
                            $(memberTD[5]).removeAttr("style");
                    });

                    if ($("#dvRevenue table:first tfoot tr").length > 0)
                        $("#dvRevenue table:first tfoot tr").html("");
                    else
                        $("#dvRevenue table:first tfoot").append("<tr></tr>");

                    $("#dvRevenue table:first tfoot tr").append("<td align='center'>Total</td><td></td><td></td>");

                    var totalInput = 0;
                    var totalOutput = 0;

                    var totalProfit = 0;
                    var totalRake = 0;
                    var totalTransferPoint = 0;
                    var totalRevenue = 0;
                    var tempDedPerCountRow = 0;

                    for (var i = 0; i < repData.length; i++) {
                        totalInput += parseFloat(repData[i]["INPUT"]);
                        totalOutput += parseFloat(repData[i]["OUTPUT"]);

                        totalProfit += parseFloat(repData[i]["PROFIT"]);
                        totalRake += parseFloat(repData[i]["RAKE"]);
                        totalTransferPoint += parseFloat(repData[i]["TRANSFER AMOUNT"]);
                        totalRevenue += parseFloat(repData[i]["REVENUE%"]);

                        tempDedPerCountRow++;
                    }

                    totalInput = (totalInput).toFixed(2);
                    totalOutput = (totalOutput).toFixed(2);
                    totalProfit = (totalProfit).toFixed(2);
                    totalTransferPoint = (totalTransferPoint).toFixed(2);
                    totalRake = totalRake.toFixed(2);
                    totalRevenue = (totalRevenue / tempDedPerCountRow).toFixed(2);

                    $("#dvRevenue table:first tfoot tr").append("<td align='center'>" + totalInput + "</td><td align='center'>" + totalOutput + "</td><td align='center'>" + totalProfit + "</td><td align='center'>" + totalRake + "</td><td align='center'>" + totalTransferPoint + "</td><td align='center'>" + totalRevenue + "</td>");

                    $("#dvRevenue table:first tbody tr").css({ "cursor": "pointer" });
                    $("#dvRevenue table:first tbody tr").unbind("click");
                    $("#dvRevenue table:first tbody tr").bind("click", function () {

                        var memberType = $("#hdnMemberType").val();
                        var tempFromDate = $(this).find("td").eq(1).text();
                        var tempToDate = $(this).find("td").eq(2).text();

                        GetMemberRespectiveDetails(memberType, tempFromDate, tempToDate);
                    });

                    $("#loader").hide();

                }
                      ,
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

    function GetPokerAllRevenue() {

        $("#dvRevenue").JqGrid({
            url: "PokerRevenue.mvc/PokerRevenueData",
            columnHeaders: ["Sr. No.", "From Date", "To Date", "Input", "Output", "Profit", "Rake", "Transfer Point", "Revnue %"],
            columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                { columnName: "FROM DATE", align: "center" },
                { columnName: "TO DATE", align: "center" },
                { columnName: "INPUT", align: "center" },
                { columnName: "OUTPUT", align: "center" },
                { columnName: "PROFIT", align: "center" },
                { columnName: "RAKE", align: "center" },
                { columnName: "TRANSFER AMOUNT", align: "center" },
                { columnName: "REVENUE%", align: "center"}],
            postDataDetails: [{ strFromDate: $("#txtFromDate").val() },
                { strToDate: $("#txtToDate").val()}],
            themeUrl: "../Content/JqGrid/JqGridTheme.css",
            gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
            pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
            sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
            success: function (repData) {
                var stratDate = repData[0]["FROM DATE"];
                var endDate = repData[repData.length - 1]["TO DATE"];

                $("#dvRevenue table:first tbody tr").each(function () {

                    var memberTD = $(this).find("td");

                    var tempProfit = parseFloat($(memberTD[5]).html());

                    if (tempProfit < 0)
                        $(memberTD[5]).attr("style", "color:red");
                    else
                        $(memberTD[5]).removeAttr("style");
                });

                if ($("#dvRevenue table:first tfoot tr").length > 0)
                    $("#dvRevenue table:first tfoot tr").html("");
                else
                    $("#dvRevenue table:first tfoot").append("<tr></tr>");

                $("#dvRevenue table:first tfoot tr").append("<td align='center'>Total</td><td></td><td></td>");

                var totalInput = 0;
                var totalOutput = 0;

                var totalProfit = 0;
                var totalTransferPoint = 0;
                var totalRevenue = 0;
                var totalRake = 0;
                var tempDedPerCountRow = 0;

                for (var i = 0; i < repData.length; i++) {
                    totalInput += parseFloat(repData[i]["INPUT"]);
                    totalOutput += parseFloat(repData[i]["OUTPUT"]);

                    totalProfit += parseFloat(repData[i]["PROFIT"]);
                    totalRake += parseFloat(repData[i]["RAKE"]);
                    totalTransferPoint += parseFloat(repData[i]["TRANSFER AMOUNT"]);
                    totalRevenue += parseFloat(repData[i]["REVENUE%"]);

                    tempDedPerCountRow++;
                }

                totalInput = (totalInput).toFixed(2);
                totalOutput = (totalOutput).toFixed(2);
                totalProfit = (totalProfit).toFixed(2);
                totalTransferPoint = (totalTransferPoint).toFixed(2);
                totalRevenue = (totalRevenue / tempDedPerCountRow).toFixed(2);
                totalRake = totalRake.toFixed(2);

                $("#dvRevenue table:first tfoot tr").append("<td align='center'>" + totalInput + "</td><td align='center'>" + totalOutput + "</td><td align='center'>" + totalProfit + "</td><td align='center'>" + totalRake + "</td><td align='center'>" + totalTransferPoint + "</td><td align='center'>" + totalRevenue + "</td>");

                $("#dvRevenue table:first tbody tr").css({ "cursor": "pointer" });
                $("#dvRevenue table:first tbody tr").unbind("click");
                $("#dvRevenue table:first tbody tr").bind("click", function () {

                    var memberType = $("#hdnMemberType").val();
                    var tempFromDate = $(this).find("td").eq(1).text();
                    var tempToDate = $(this).find("td").eq(2).text();

                    GetMemberRespectiveDetails(memberType, tempFromDate, tempToDate);
                });

                $("#loader").hide();

            }
                      ,
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

    function GetMemberRespectiveDetails(memberType, tempFromDate, tempToDate) {
        $("#dvManagerDetails").html("");
        loading(); // loading
        setTimeout(function () { // then show popup, deley in .5 second
            loadPopup(); // function show popup 
        }, 500); // .5 second

        var totalInput = 0;
        var totalOutPut = 0;
        var totalProfit = 0;
        var totalRake = 0;
        var totalTPoint = 0;

        switch (memberType) {
            case "A":
                $("#dvManagerDetails").removeClass("tableformatting");
                $("#dvManagerDetails").addClass("grid");

                $("#dvManagerDetails").html("");
                loading(); // loading
                setTimeout(function () { // then show popup, deley in .5 second
                    loadPopup(); // function show popup 
                }, 500); // .5 second

                $("#dvManagerDetails").JqGrid({
                    url: "PokerRevenue.mvc/AgentMemberList",
                    columnHeaders: ["Sr. No.", "Member ID", "Name", "Input", "Output", "Profit"],
                    columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                                               { columnName: "MEMBER_ID", align: "center" },
                                               { columnName: "MEM_NAME", align: "center" },
                                               { columnName: "MEM_INPUT", align: "right" },
                                               { columnName: "MEM_OUTPUT", align: "right" },
                                               { columnName: "PROFIT", align: "right"}],
                    postDataDetails: [{ fromDate: tempFromDate }, { toDate: tempToDate}],
                    themeUrl: "../Content/JqGrid/JqGridTheme.css",
                    gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                    pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                    sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                    success: function (repData) {
                        $("#paraWeekDate").text("Revenue Detail for : " + tempFromDate + " to " + tempToDate);

                        totalInput = 0;
                        totalOutPut = 0;
                        totalProfit = 0;

                        $("#dvManagerDetails table:first tbody tr").each(function () {

                            var memberTD = $(this).find("td");

                            var tempProfit = parseFloat($(memberTD[5]).html());

                            if (tempProfit < 0)
                                $(memberTD[5]).attr("style", "color:red");
                            else
                                $(memberTD[5]).removeAttr("style");
                        });

                        for (var i = 0; i < repData.length; i++) {

                            totalProfit += parseFloat(repData[i]["PROFIT"]);
                            totalInput += parseFloat(repData[i]["MEM_INPUT"]);
                            totalOutPut += parseFloat(repData[i]["MEM_OUTPUT"]);
                        }

                        if ($("#dvManagerDetails table:first tfoot tr").length > 0)
                            $("#dvManagerDetails table:first tfoot tr").html("");
                        else
                            $("#dvManagerDetails table:first tfoot").append("<tr></tr>");

                        $("#dvManagerDetails table:first tfoot tr").append("<td align='center'>Total</td><td></td><td></td><td align='right'>" + totalInput.toFixed(2) + "</td><td align='right'>" + totalOutPut.toFixed(2) + "</td>" + ((totalProfit < 0) ? "<td align='right' style='color:red'>" : "<td align='right'>") + totalProfit.toFixed(2) + "</td>");

                        closeloading();
                    },
                    errorMsg: function (repError) {
                        if (repError == "Session Expired") {
                            window.location = "/Login.mvc/Index";
                        }
                        else {
                            $("#dvManagerDetails").html(repError);
                            closeloading();
                        }
                    }
                });
                break;
            case "P":

                $("#dvManagerDetails").removeClass("tableformatting");
                $("#dvManagerDetails").addClass("grid");

                $("#dvManagerDetails").html("");
                loading(); // loading
                setTimeout(function () { // then show popup, deley in .5 second
                    loadPopup(); // function show popup 
                }, 500); // .5 second

                $("#dvManagerDetails").JqGrid({
                    url: "PokerRevenue.mvc/PartnerCCSList",
                    columnHeaders: ["Sr. No.", "Agent ID", "Name", "Input", "Output", "Profit", "Rake", "Transfer Point", "Revene %"],
                    columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                                               { columnName: "AGENT_ID", align: "center" },
                                               { columnName: "CCSLOCATION", align: "center" },
                                               { columnName: "NEWINPUT", align: "right" },
                                               { columnName: "NEWOUTPUT", align: "right" },
                                               { columnName: "NEWPROFIT", align: "right" },
                                               { columnName: "NEWRAKE", align: "right" },
                                               { columnName: "NEW_POINT_TRANSFER", align: "right" },
                                               { columnName: "NEWREVENUE%", align: "right"}],
                    postDataDetails: [{ fromDate: tempFromDate}],
                    themeUrl: "../Content/JqGrid/JqGridTheme.css",
                    gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                    pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                    sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                    success: function (repData) {
                        $("#paraWeekDate").text("Revenue Detail for : " + tempFromDate + " to " + tempToDate);

                        totalInput = 0;
                        totalOutPut = 0;
                        totalProfit = 0;
                        totalRake = 0;
                        totalTPoint = 0;

                        $("#dvManagerDetails table:first tbody tr").each(function () {

                            var ccsTD = $(this).find("td");

                            var tempProfit = parseFloat($(ccsTD[5]).html());

                            if (tempProfit < 0)
                                $(ccsTD[5]).attr("style", "color:red");
                            else
                                $(ccsTD[5]).removeAttr("style");

                        });

                        for (var i = 0; i < repData.length; i++) {

                            totalProfit += parseFloat(repData[i]["NEWPROFIT"]);
                            totalInput += parseFloat(repData[i]["NEWINPUT"]);
                            totalOutPut += parseFloat(repData[i]["NEWOUTPUT"]);
                            totalRake += parseFloat(repData[i]["NEWRAKE"]);
                            totalTPoint += parseFloat(repData[i]["NEW_POINT_TRANSFER"]);
                        }


                        if ($("#dvManagerDetails table:first tfoot tr").length > 0)
                            $("#dvManagerDetails table:first tfoot tr").html("");
                        else
                            $("#dvManagerDetails table:first tfoot").append("<tr></tr>");

                        $("#dvManagerDetails table:first tfoot tr").append("<td align='center'>Total</td><td></td><td></td><td align='right'>" + totalInput.toFixed(2) + "</td><td align='right'>" + totalOutPut.toFixed(2) + "</td>" + ((totalProfit < 0) ? "<td align='right' style='color:red'>" : "<td align='right'>") + totalProfit.toFixed(2) + "</td><td align='right'>" + totalRake.toFixed(2) + "</td><td align='right'>" + totalTPoint.toFixed(2) + "</td><td align='right'>" + ((totalTPoint / totalRake) * 100).toFixed(2) + "</td>");

                        $("#dvManagerDetails table:first tbody tr").css({ "cursor": "pointer" });
                        $("#dvManagerDetails table:first tbody tr").unbind("click");
                        $("#dvManagerDetails table:first tbody tr").bind("click", function () {

                            var tempAgentID = $(this).find("td").eq(1).text();

                            $("#dvCCSDetails").removeClass("tableformatting");
                            $("#dvCCSDetails").addClass("grid");

                            $("#dvCCSDetails").html("");
                            loading2(); // loading
                            setTimeout(function () { // then show popup, deley in .5 second
                                loadPopup2(); // function show popup 
                            }, 500); // .5 second


                            $("#dvCCSDetails").JqGrid({
                                url: "PokerRevenue.mvc/PartnerCCsMemberList",
                                columnHeaders: ["Sr. No.", "Member ID", "Name", "Input", "Output", "Profit"],
                                columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                                                                                   { columnName: "MEMBER_ID", align: "center" },
                                                                                   { columnName: "MEM_NAME", align: "center" },
                                                                                   { columnName: "INPUT", align: "right" },
                                                                                   { columnName: "OUTPUT", align: "right" },
                                                                                   { columnName: "PROFIT", align: "right"}],
                                postDataDetails: [{ agentID: tempAgentID }, { fromDate: tempFromDate }, { toDate: tempToDate }],
                                themeUrl: "../Content/JqGrid/JqGridTheme.css",
                                gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                                pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                                sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                                success: function (repData) {
                                    $("#paraWeekDate2").text("Revenue Detail for Agent ID : " + tempAgentID + " for " + tempFromDate + " to " + tempToDate);

                                    totalInput = 0;
                                    totalOutPut = 0;
                                    totalProfit = 0;

                                    $("#dvCCSDetails table:first tbody tr").each(function () {

                                        var memberTD = $(this).find("td");

                                        var tempProfit = parseFloat($(memberTD[5]).html());

                                        if (tempProfit < 0)
                                            $(memberTD[5]).attr("style", "color:red");
                                        else
                                            $(memberTD[5]).removeAttr("style");

                                    });

                                    for (var i = 0; i < repData.length; i++) {

                                        totalProfit += parseFloat(repData[i]["PROFIT"]);
                                        totalInput += parseFloat(repData[i]["INPUT"]);
                                        totalOutPut += parseFloat(repData[i]["OUTPUT"]);
                                    }

                                    if ($("#dvCCSDetails table:first tfoot tr").length > 0)
                                        $("#dvCCSDetails table:first tfoot tr").html("");
                                    else
                                        $("#dvCCSDetails table:first tfoot").append("<tr></tr>");

                                    $("#dvCCSDetails table:first tfoot tr").append("<td align='center'>Total</td><td></td><td></td><td align='right'>" + totalInput.toFixed(2) + "</td><td align='right'>" + totalOutPut.toFixed(2) + "</td>" + ((totalProfit < 0) ? "<td align='right' style='color:red'>" : "<td align='right'>") + totalProfit.toFixed(2) + "</td>");

                                    closeloading2();
                                },
                                errorMsg: function (repError) {
                                    if (repError == "Session Expired") {
                                        window.location = "/Login.mvc/Index";
                                    }
                                    else {
                                        $("#dvCCSDetails").html(repError);
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
                            $("#dvManagerDetails").html(repError);
                            closeloading();
                        }
                    }
                });
                break;
            case "M":

                $("#dvManagerDetails").removeClass("tableformatting");
                $("#dvManagerDetails").addClass("grid");

                $("#dvManagerDetails").html("");
                loading(); // loading
                setTimeout(function () { // then show popup, deley in .5 second
                    loadPopup(); // function show popup 
                }, 500); // .5 second

                $("#dvManagerDetails").JqGrid({
                    url: "PokerRevenue.mvc/ManagerCCSList",
                    columnHeaders: ["Sr. No.", "Agent ID", "Name", "Input", "Output", "Profit", "Rake", "Transfer Point", "Revenue %"],
                    columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                                               { columnName: "AGENT_ID", align: "center" },
                                               { columnName: "CCSLOCATION", align: "center" },
                                               { columnName: "NEWINPUT", align: "right" },
                                               { columnName: "NEWOUTPUT", align: "right" },
                                               { columnName: "NEWPROFIT", align: "right" },
                                               { columnName: "NEWRAKE", align: "right" },
                                               { columnName: "NEW_POINT_TRANSFER", align: "right" },
                                               { columnName: "NEWREVENUE%", align: "right"}],
                    postDataDetails: [{ fromDate: tempFromDate}],
                    themeUrl: "../Content/JqGrid/JqGridTheme.css",
                    gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                    pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                    sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                    success: function (repData) {
                        $("#paraWeekDate").text("Revenue Detail for : " + tempFromDate + " to " + tempToDate);

                        totalInput = 0;
                        totalOutPut = 0;
                        totalProfit = 0;
                        totalRake = 0;
                        totalTPoint = 0;

                        $("#dvManagerDetails table:first tbody tr").each(function () {

                            var ccsTD = $(this).find("td");

                            var tempProfit = parseFloat($(ccsTD[5]).html());

                            if (tempProfit < 0)
                                $(ccsTD[5]).attr("style", "color:red");
                            else
                                $(ccsTD[5]).removeAttr("style");

                        });

                        for (var i = 0; i < repData.length; i++) {

                            totalProfit += parseFloat(repData[i]["NEWPROFIT"]);
                            totalInput += parseFloat(repData[i]["NEWINPUT"]);
                            totalOutPut += parseFloat(repData[i]["NEWOUTPUT"]);
                            totalRake += parseFloat(repData[i]["NEWRAKE"]);
                            totalTPoint += parseFloat(repData[i]["NEW_POINT_TRANSFER"]);
                        }

                        if ($("#dvManagerDetails table:first tfoot tr").length > 0)
                            $("#dvManagerDetails table:first tfoot tr").html("");
                        else
                            $("#dvManagerDetails table:first tfoot").append("<tr></tr>");

                        $("#dvManagerDetails table:first tfoot tr").append("<td align='center'>Total</td><td></td><td></td><td align='right'>" + totalInput.toFixed(2) + "</td><td align='right'>" + totalOutPut.toFixed(2) + "</td>" + ((totalProfit < 0) ? "<td align='right' style='color:red'>" : "<td align='right'>") + totalProfit.toFixed(2) + "</td><td align='right'>" + totalRake.toFixed(2) + "</td><td align='right'>" + totalTPoint.toFixed(2) + "</td><td align='right'>" + ((totalTPoint / totalRake) * 100).toFixed(2) + "</td>");

                        $("#dvManagerDetails table:first tbody tr").css({ "cursor": "pointer" });
                        $("#dvManagerDetails table:first tbody tr").unbind("click");
                        $("#dvManagerDetails table:first tbody tr").bind("click", function () {

                            var tempAgentID = $(this).find("td").eq(1).text();

                            $("#dvCCSDetails").removeClass("tableformatting");
                            $("#dvCCSDetails").addClass("grid");

                            $("#dvCCSDetails").html("");
                            loading2(); // loading
                            setTimeout(function () { // then show popup, deley in .5 second
                                loadPopup2(); // function show popup 
                            }, 500); // .5 second


                            $("#dvCCSDetails").JqGrid({
                                url: "PokerRevenue.mvc/ManagerCCsMemberList",
                                columnHeaders: ["Sr. No.", "Member ID", "Name", "Input", "Output", "Profit"],
                                columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                                                                                   { columnName: "MEMBER_ID", align: "center" },
                                                                                   { columnName: "MEM_NAME", align: "center" },
                                                                                   { columnName: "NEWINPUT", align: "right" },
                                                                                   { columnName: "NEWOUTPUT", align: "right" },
                                                                                   { columnName: "NEWPROFIT", align: "right"}],
                                postDataDetails: [{ agentId: tempAgentID }, { fromDate: tempFromDate }, { toDate: tempToDate }],
                                themeUrl: "../Content/JqGrid/JqGridTheme.css",
                                gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                                pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                                sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                                success: function (repData) {
                                    $("#paraWeekDate2").text("Revenue Detail for Agent ID : " + tempAgentID + " for " + tempFromDate + " to " + tempToDate);

                                    totalInput = 0;
                                    totalOutPut = 0;
                                    totalProfit = 0;

                                    $("#dvCCSDetails table:first tbody tr").each(function () {

                                        var memberTD = $(this).find("td");

                                        var tempProfit = parseFloat($(memberTD[5]).html());

                                        if (tempProfit < 0)
                                            $(memberTD[5]).attr("style", "color:red");
                                        else
                                            $(memberTD[5]).removeAttr("style");

                                    });

                                    for (var i = 0; i < repData.length; i++) {

                                        totalProfit += parseFloat(repData[i]["NEWPROFIT"]);
                                        totalInput += parseFloat(repData[i]["NEWINPUT"]);
                                        totalOutPut += parseFloat(repData[i]["NEWOUTPUT"]);
                                    }

                                    if ($("#dvCCSDetails table:first tfoot tr").length > 0)
                                        $("#dvCCSDetails table:first tfoot tr").html("");
                                    else
                                        $("#dvCCSDetails table:first tfoot").append("<tr></tr>");

                                    $("#dvCCSDetails table:first tfoot tr").append("<td align='center'>Total</td><td></td><td></td><td align='right'>" + totalInput.toFixed(2) + "</td><td align='right'>" + totalOutPut.toFixed(2) + "</td>" + ((totalProfit < 0) ? "<td align='right' style='color:red'>" : "<td align='right'>") + totalProfit.toFixed(2) + "</td>");

                                    closeloading2();
                                },
                                errorMsg: function (repError) {
                                    if (repError == "Session Expired") {
                                        window.location = "/Login.mvc/Index";
                                    }
                                    else {
                                        $("#dvCCSDetails").html(repError);
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
                            $("#dvManagerDetails").html(repError);
                            closeloading();
                        }
                    }
                });
                break
            case "K":

                $("#dvManagerDetails").removeClass("tableformatting");
                $("#dvManagerDetails").addClass("grid");

                $("#dvManagerDetails").JqGrid({
                    url: "PokerRevenue.mvc/MarketManagerList",
                    columnHeaders: ["Sr. No.", "Manager ID", "Name", "Input", "Output", "Profit", "Rake", "Transfer Point", "Revene %"],
                    columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                                               { columnName: "MANAGERID", align: "center" },
                                               { columnName: "MANAGERNAME", align: "center" },
                                               { columnName: "NEWINPUT", align: "right" },
                                               { columnName: "NEWOUTPUT", align: "right" },
                                               { columnName: "NEWPROFIT", align: "right" },
                                               { columnName: "NEWRAKE", align: "right" },
                                               { columnName: "NEW_POINT_TRANSFER", align: "right" },
                                               { columnName: "NEWREVENUE%", align: "right"}],
                    postDataDetails: [{ fromDate: tempFromDate}],
                    themeUrl: "../Content/JqGrid/JqGridTheme.css",
                    gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                    pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                    sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                    success: function (repData) {
                        $("#paraWeekDate").text("Revenue Detail for : " + tempFromDate + " to " + tempToDate);

                        totalInput = 0;
                        totalOutPut = 0;
                        totalProfit = 0;
                        totalRake = 0;
                        totalTPoint = 0;

                        $("#dvManagerDetails table:first tbody tr").each(function () {

                            var managerTD = $(this).find("td");

                            var tempProfit = parseFloat($(managerTD[5]).html());

                            if (tempProfit < 0)
                                $(managerTD[5]).attr("style", "color:red");
                            else
                                $(managerTD[5]).removeAttr("style");
                        });

                        for (var i = 0; i < repData.length; i++) {

                            totalProfit += parseFloat(repData[i]["NEWPROFIT"]);
                            totalInput += parseFloat(repData[i]["NEWINPUT"]);
                            totalOutPut += parseFloat(repData[i]["NEWOUTPUT"]);
                            totalRake += parseFloat(repData[i]["NEWRAKE"]);
                            totalTPoint += parseFloat(repData[i]["NEW_POINT_TRANSFER"]);
                        }

                        if ($("#dvManagerDetails table:first tfoot tr").length > 0)
                            $("#dvManagerDetails table:first tfoot tr").html("");
                        else
                            $("#dvManagerDetails table:first tfoot").append("<tr></tr>");

                        $("#dvManagerDetails table:first tfoot tr").append("<td align='center'>Total</td><td></td><td></td><td align='right'>" + totalInput.toFixed(2) + "</td><td align='right'>" + totalOutPut.toFixed(2) + "</td>" + ((totalProfit < 0) ? "<td align='right' style='color:red'>" : "<td align='right'>") + totalProfit.toFixed(2) + "</td><td align='right'>" + totalRake.toFixed(2) + "</td><td align='right'>" + totalTPoint.toFixed(2) + "</td><td align='right'>" + ((totalTPoint / totalRake) * 100).toFixed(2) + "</td>");

                        $("#dvManagerDetails table:first tbody tr").css({ "cursor": "pointer" });
                        $("#dvManagerDetails table:first tbody tr").unbind("click");
                        $("#dvManagerDetails table:first tbody tr").bind("click", function () {

                            var tempManagerID = $(this).find("td").eq(1).text();

                            $("#dvCCSDetails").removeClass("tableformatting");
                            $("#dvCCSDetails").addClass("grid");

                            $("#dvCCSDetails").html("");
                            loading2(); // loading
                            setTimeout(function () { // then show popup, deley in .5 second
                                loadPopup2(); // function show popup 
                            }, 500); // .5 second

                            $("#dvCCSDetails").JqGrid({
                                url: "PokerRevenue.mvc/MarketingManagerCCSList",
                                columnHeaders: ["Sr. No.", "Agent ID", "Name", "Input", "Output", "Profit", "Rake", "Transfer Point", "Revene %"],
                                columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                                               { columnName: "AGENT_ID", align: "center" },
                                               { columnName: "CCSLOCATION", align: "center" },
                                               { columnName: "NEWINPUT", align: "right" },
                                               { columnName: "NEWOUTPUT", align: "right" },
                                               { columnName: "NEWPROFIT", align: "right" },
                                               { columnName: "NEWRAKE", align: "right" },
                                               { columnName: "NEW_POINT_TRANSFER", align: "right" },
                                               { columnName: "NEWREVENUE%", align: "right"}],
                                postDataDetails: [{ managerID: tempManagerID }, { fromDate: tempFromDate}],
                                themeUrl: "../Content/JqGrid/JqGridTheme.css",
                                gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                                pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                                sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                                success: function (repData) {
                                    $("#paraWeekDate2").text("Revenue Detail for Manager ID : " + tempManagerID + " for " + tempFromDate + " to " + tempToDate);

                                    totalInput = 0;
                                    totalOutPut = 0;
                                    totalProfit = 0;
                                    totalRake = 0;
                                    totalTPoint = 0;

                                    $("#dvCCSDetails table:first tbody tr").each(function () {

                                        var ccsTD = $(this).find("td");

                                        var tempProfit = parseFloat($(ccsTD[5]).html());

                                        if (tempProfit < 0)
                                            $(ccsTD[5]).attr("style", "color:red");
                                        else
                                            $(ccsTD[5]).removeAttr("style");
                                    });

                                    for (var i = 0; i < repData.length; i++) {

                                        totalProfit += parseFloat(repData[i]["NEWPROFIT"]);
                                        totalInput += parseFloat(repData[i]["NEWINPUT"]);
                                        totalOutPut += parseFloat(repData[i]["NEWOUTPUT"]);
                                        totalRake += parseFloat(repData[i]["NEWRAKE"]);
                                        totalTPoint += parseFloat(repData[i]["NEW_POINT_TRANSFER"]);
                                    }

                                    if ($("#dvCCSDetails table:first tfoot tr").length > 0)
                                        $("#dvCCSDetails table:first tfoot tr").html("");
                                    else
                                        $("#dvCCSDetails table:first tfoot").append("<tr></tr>");

                                    $("#dvCCSDetails table:first tfoot tr").append("<td align='center'>Total</td><td></td><td></td><td align='right'>" + totalInput.toFixed(2) + "</td><td align='right'>" + totalOutPut.toFixed(2) + "</td>" + ((totalProfit < 0) ? "<td align='right' style='color:red'>" : "<td align='right'>") + totalProfit.toFixed(2) + "</td><td align='right'>" + totalRake.toFixed(2) + "</td><td align='right'>" + totalTPoint.toFixed(2) + "</td><td align='right'>" + ((totalTPoint / totalRake) * 100).toFixed(2) + "</td>");

                                    $("#dvCCSDetails table:first tbody tr").css({ "cursor": "pointer" });
                                    $("#dvCCSDetails table:first tbody tr").unbind("click");
                                    $("#dvCCSDetails table:first tbody tr").bind("click", function () {

                                        var tempAgentID = $(this).find("td").eq(1).text();

                                        $("#dvMemberDetails").removeClass("tableformatting");
                                        $("#dvMemberDetails").addClass("grid");

                                        $("#dvMemberDetails").html("");
                                        loading3(); // loading
                                        setTimeout(function () { // then show popup, deley in .5 second
                                            loadPopup3(); // function show popup 
                                        }, 500); // .5 second


                                        $("#dvMemberDetails").JqGrid({
                                            url: "PokerRevenue.mvc/MarketingManagerCCsMemberList",
                                            columnHeaders: ["Sr. No.", "Member ID", "Name", "Input", "Output", "Profit"],
                                            columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                                                                                   { columnName: "MEMBER_ID", align: "center" },
                                                                                   { columnName: "MEM_NAME", align: "center" },
                                                                                   { columnName: "NEWINPUT", align: "right" },
                                                                                   { columnName: "NEWOUTPUT", align: "right" },
                                                                                   { columnName: "NEWPROFIT", align: "right"}],
                                            postDataDetails: [{ managerID: tempManagerID }, { agentID: tempAgentID }, { fromDate: tempFromDate }, { toDate: tempToDate }],
                                            themeUrl: "../Content/JqGrid/JqGridTheme.css",
                                            gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
                                            pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
                                            sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
                                            success: function (repData) {
                                                $("#paraWeekDate3").text("Revenue Detail for Agent ID : " + tempAgentID + " for " + tempFromDate + " to " + tempToDate);

                                                totalInput = 0;
                                                totalOutPut = 0;
                                                totalProfit = 0;

                                                $("#dvMemberDetails table:first tbody tr").each(function () {

                                                    var memberTD = $(this).find("td");

                                                    var tempProfit = parseFloat($(memberTD[5]).html());

                                                    if (tempProfit < 0)
                                                        $(memberTD[5]).attr("style", "color:red");
                                                    else
                                                        $(memberTD[5]).removeAttr("style");

                                                });

                                                for (var i = 0; i < repData.length; i++) {

                                                    totalProfit += parseFloat(repData[i]["NEWPROFIT"]);
                                                    totalInput += parseFloat(repData[i]["NEWINPUT"]);
                                                    totalOutPut += parseFloat(repData[i]["NEWOUTPUT"]);
                                                }

                                                if ($("#dvMemberDetails table:first tfoot tr").length > 0)
                                                    $("#dvMemberDetails table:first tfoot tr").html("");
                                                else
                                                    $("#dvMemberDetails table:first tfoot").append("<tr></tr>");

                                                $("#dvMemberDetails table:first tfoot tr").append("<td align='center'>Total</td><td></td><td></td><td align='right'>" + totalInput.toFixed(2) + "</td><td align='right'>" + totalOutPut.toFixed(2) + "</td>" + ((totalProfit < 0) ? "<td align='right' style='color:red'>" : "<td align='right'>") + totalProfit.toFixed(2) + "</td>");

                                                closeloading3();
                                            },
                                            errorMsg: function (repError) {
                                                if (repError == "Session Expired") {
                                                    window.location = "/Login.mvc/Index";
                                                }
                                                else {
                                                    $("#dvMemberDetails").html(repError);
                                                    closeloading3();
                                                }
                                            }
                                        });
                                    });

                                    closeloading2();
                                },
                                errorMsg: function (repError) {
                                    if (repError == "Session Expired") {
                                        window.location = "/Login.mvc/Index";
                                    }
                                    else {
                                        $("#dvCCSDetails").html(repError);
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
                            $("#dvManagerDetails").html(repError);
                            closeloading();
                        }
                    }
                });
                break;
        }
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
    /************** end: functions. **************/

    /************** start: functions. **************/
    function loading3() {
        $("div.loader4").show();
    }
    function closeloading3() {
        $("div.loader4").fadeOut('normal');
    }

    var popupStatus3 = 0; // set value

    function loadPopup3() {
        if (popupStatus3 == 0) { // if value is 0, show popup
            $(".toPopup3").fadeIn(0500); // fadein popup div
            $(".backgroundPopup3").css("opacity", "0.7"); // css opacity, supports IE7, IE8
            $(".backgroundPopup3").fadeIn(0001);
            popupStatus3 = 1; // and set value to 1
        }
    }

    function disablePopup3() {
        if (popupStatus3 == 1) { // if value is 1, close popup
            $(".toPopup3").fadeOut("normal");
            $(".backgroundPopup3").fadeOut("normal");
            popupStatus3 = 0;  // and set value to 0
        }
    }
    /************** end: functions. **************/

    /* event for close the popup */
    $("div.close3").hover(
					function () {
					    $('span.ecs_tooltip').show();
					},
					function () {
					    $('span.ecs_tooltip').hide();
					}
				);

    $("div.close3").click(function () {
        disablePopup3();  // function close pop up
    });

    $(this).keyup(function (event) {
        if (event.which == 27) { // 27 is 'Ecs' in the keyboard
            disablePopup3();  // function close pop up
        }
    });

    $("div.backgroundPopup3").click(function () {
        disablePopup3();  // function close pop up
    });
    /************** end: functions. **************/

    GetPokerAllRevenue();
});