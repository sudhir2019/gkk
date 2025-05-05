/// <reference path="../jquery-1.9.1.js" />
/// <reference path="../jquery-ui.js" />

$(function () {
    $("#loader").show();

    $("#dvFunAB").JqGrid({
        url: "FunABData",
        columnHeaders: ["Sr. No.", "Winning Cards", "Draw Time"],
        columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                { columnName: "DRAWNO", align: "center" },
                { columnName: "DRAW_TIME", align: "right"}],
        themeUrl: "../Content/JqGrid/JqGridTheme.css",
        gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
        pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
        success: function (repData) {
//            var a = $("#dvFunAB > table > tbody > tr > td:nth-child(2)");
//            $("#dvFunAB > table > tbody > tr > td:nth-child(2)").each(function () {
//                var tempCardVal = $(this).text();
//                $(this).html(GenerateCard(tempCardVal.substr(0, 1), tempCardVal.substr(1, 1)));
//            });
            $("#loader").hide();
        },
        errorMsg: function (repError) {
            if (repError == "Session Expired") {
                window.location = "/Login.mvc/Index";
            }
            else {
                $("#dvFunAB").html(repError);
                $("#loader").hide();
            }
        }
    });
});