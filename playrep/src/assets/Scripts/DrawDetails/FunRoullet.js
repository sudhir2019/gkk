/// <reference path="../jquery-1.9.1.js" />
/// <reference path="../jquery-ui.js" />

$(function () {
    $("#loader").show();

    $("#dvFunRoullet").JqGrid({
        url: "FunRoulletData",
        columnHeaders: ["Sr. No.", "Winning No.", "Draw Time"],
        columnAttributes: [{ columnName: "SRNO", dataType: "int", align: "center" },
                { columnName: "DRAWNO", align: "center" },
                { columnName: "DRAW_TIME", align: "right"}],
        themeUrl: "../Content/JqGrid/JqGridTheme.css",
        gridStyle: { headerClass: "GridHead", footerClass: "GridFooter", rowClass: "NormalRow", alternativeRowClass: "AlternativeRow" },
        pageSetting: { allowPager: true, pageSize: 10, nextPrevTab: false },
        sortSetting: { allowSorting: true, sortColumn: "SRNO", sortDirection: "asc" },
        success: function (repData) {
            $("#loader").hide();
        },
        errorMsg: function (repError) {
            if (repError == "Session Expired") {
                window.location = "/Login.mvc/Index";
            }
            else {
                $("#dvFunRoullet").html(repError);
                $("#loader").hide();
            }
        }
    });
});