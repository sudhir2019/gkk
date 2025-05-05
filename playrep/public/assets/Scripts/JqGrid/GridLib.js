/// <reference path="../jquery-1.7.1.js" />
(function ($) {
    $.fn.JqGrid = function (options) {

        var colAttributesArray = function () { };
        colAttributesArray.prototype = {};

        var JqGridData = {
            url: "",
            columnHeaders: new Array(),
            columnAttributes: new colAttributesArray(),
            postDataDetails: new colAttributesArray(),
            themeUrl: "",
            keyColumn: "",
            gridStyle: { headerClass: "", footerClass: "", rowClass: "", alternativeRowClass: "" },
            pageSetting: { allowPager: false, pageSize: 10, nextPrevTab: true, recordPerPage: "" },
            sortSetting: { allowSorting: false, sortColumn: "", sortDirection: "asc" },
            cellEditSetting: { needEditSettings: false, allowEdit: false, editText: "Edit", editUrl: "", allowDelete: false, deleteText: "Delete", deleteUrl: "", allowUpdate: false, updateText: "Update", updateUrl: "", allowCancel: false, cancelText: "Cancel" },
            editCellTypes: { columnNames: "", columnType: "" },
            extraData: { isExtra: false, extraRowCount: 0 },
            success: function (r) { },
            errorMsg: function (r) { }
        };

        JqGridData = $.extend(JqGridData, options);
        var ContentHolder = this.attr("id");

        var JqGridAjaxResponse;
        var GlobalCurrentPage = 0;
        var MaxShownPageFooter = 10;
        var MinShownPageFooter = 1;
        var GlobalEditableRow;
        var editClick = false;

        var JqGridCreate = function () {

            var data = {};
            for (var i = 0; i < JqGridData.postDataDetails.length; i++) {
                Object.getOwnPropertyNames(JqGridData.postDataDetails[i]).forEach(function (val, idx, array) {
                    data[val.toString()] = JqGridData.postDataDetails[i][val];
                });
            }
            $.ajax({
                url: JqGridData.url,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                dataType: "json",
                success: function (response) {

                    if (!(response.length === undefined))
                        JqGridAjaxResponse = response;
                    else
                        JqGridAjaxResponse = $.parseJSON(response.d);

                    if (JqGridAjaxResponse.length > 0) {

                        //Function to Populate GridView Data
                        PopulateGridData(1);

                        //Function to Create Paging
                        CreatePaging(1);
                    }

                    if (!JqGridData.sortSetting.allowSorting)
                        $.isFunction(JqGridData.success) && JqGridData.success.call(this, JqGridAjaxResponse);
                },
                error: function (request) {
                    var data = "";
                    if (!(request.length === undefined))
                        data = request;
                    else
                        data = request.responseText;

                    $.isFunction(JqGridData.errorMsg) && JqGridData.errorMsg.call(this, data);
                }
            });
        };

        function PopulateGridData(CurrentPage) {

            GlobalCurrentPage = CurrentPage;

            //Empty HTML of the div in which we have to create GridView.
            $("#" + ContentHolder).html("");

            //Start of Create table inside the div or content holder in which we have to populate
            //GridView. These lines are just to Create table, thead, tfoot and tbody object inside the holder.

            //$("#" + ContentHolder).attr("style", "width:100%;");
            $("#" + ContentHolder).append('<table></table>');

            var GridTable = $("#" + ContentHolder + " table");
            GridTable.attr("style", "width:100%;");
            GridTable.append("<thead></thead>");
            GridTable.append("<tbody></tbody>");
            GridTable.append("<tfoot></tfoot>");

            //End of Creating table, thead, tbody and tfoot inside the holder.

            //Variables to get the object thead, tbody and tfoot so that furthur data can be populated.

            var GridHead = $("#" + ContentHolder + " table thead");
            GridHead.append("<tr></tr>");
            var GridHeadRow = $("#" + ContentHolder + " table thead tr");
            var GridBody = $("#" + ContentHolder + " table tbody");
            var GridFooter = $("#" + ContentHolder + " table tfoot");

            //End of getting variable of object thead, tbody and tfoot.

            //The next if condition is just to check wheather user have provide column header or not
            //if column header are not provided grid will not be created. so it is must to provide column headers.
            if (JqGridData.columnHeaders.length > 0) {

                //The next 3 variables is jsut to store actually column names, there attribute and data type of each column
                //which we can get from "JqGridData.columnAttributes"
                var ColumnNames = new Array();
                var ColumnAtrributesData = new Array();
                var ColumnDataType = new Array();

                //The next for loop is to fetch all column attributes there actual names and data type

                for (var i = 0; i < JqGridData.columnAttributes.length; i++) {
                    ColumnAtrributesData[i] = "";
                    ColumnDataType[i] = "";

                    Object.getOwnPropertyNames(JqGridData.columnAttributes[i]).forEach(function (val, idx, array) {

                        var varColAttributes = "";
                        if (val.toString() == "columnName") {
                            ColumnNames[i] = JqGridData.columnAttributes[i][val];
                        }
                        else if (val.toString() == "dataType") {
                            if (!(JqGridData.columnAttributes[i][val] === undefined))
                                ColumnDataType[i] = JqGridData.columnAttributes[i][val];
                            else
                                ColumnDataType[i] = "string";
                        }
                        else {
                            ColumnAtrributesData[i] += " " + val.toString() + "='" + JqGridData.columnAttributes[i][val] + "'";
                        }
                    });
                }

                //The next for loop is to create table header cells with attributes like data type, actual column name and there default sort direction

                for (var i = 0; i < JqGridData.columnHeaders.length; i++) {
                    GridHeadRow.append('<th dataType="' + ColumnDataType[i] + '" colName="' + ColumnNames[i] + '" sortOrder="asc">' + JqGridData.columnHeaders[i] + '</th>');
                }

                //The next if condition is to bind click event with all table header cell
                //so that if the user click on any header cell the data get sorted according to the respective column
                if (JqGridData.sortSetting.allowSorting) {
                    $("#" + ContentHolder + " table:first thead tr th").attr("style", "cursor:pointer;");
                    $("#" + ContentHolder + " table:first thead tr th").bind("click", function () {
                        SortRecords($(this).attr("colName"), $(this).attr("sortOrder"), $(this).attr("dataType"), this);
                    });
                }

                //It is the start of getting index of response we get from the server side
                //so that those index record can only be shown to user
                var StratRecordIndex = 0;
                var EndRecordIndex = 0;

                if (JqGridData.pageSetting.allowPager) {

                    StratRecordIndex = (CurrentPage - 1) * JqGridData.pageSetting.pageSize;
                    EndRecordIndex = (CurrentPage * JqGridData.pageSetting.pageSize);

                    if (JqGridData.extraData.isExtra) {
                        if (EndRecordIndex > (JqGridAjaxResponse.length - JqGridData.extraData.extraRowCount)) {
                            EndRecordIndex = JqGridAjaxResponse.length - JqGridData.extraData.extraRowCount;
                        }
                    }
                    else {
                        if (EndRecordIndex > JqGridAjaxResponse.length) {
                            EndRecordIndex = JqGridAjaxResponse.length;
                        }
                    }
                }
                else {
                    StratRecordIndex = 0;
                    if (JqGridData.extraData.isExtra) {
                        EndRecordIndex = JqGridAjaxResponse.length - JqGridData.extraData.extraRowCount;
                    }
                    else {
                        EndRecordIndex = JqGridAjaxResponse.length;
                    }
                    
                }
                // this is the end of getting index of response


                //The next for loop is to populate records to get visible to user
                for (var i = StratRecordIndex; i < EndRecordIndex; i++) {
                    var NewRow = "<tr>";

                    //This if condition is just to bind an attribute
                    //which will be treated as dataKey for each column this will help us in editing, deleting, updating
                    //and cancel edit of the record. so if we want to edit, delete, update or cancel edit we have to mention dataKey
                    //column name.
                    if (!(JqGridData.keyColumn === undefined)) {
                        if (JqGridData.keyColumn != "")
                            NewRow = "<tr dataKey='" + JqGridAjaxResponse[i][JqGridData.keyColumn] + "'>";
                    }

                    //This for loop is get column by column record and binding with the row.
                    for (var k = 0; k < ColumnNames.length; k++) {
                        NewRow += "<td" + ColumnAtrributesData[k].toString() + ">" + JqGridAjaxResponse[i][ColumnNames[k]] + "</td>";
                        //alert(ColumnNames[1] + " -> " + response[k][ColumnNames[1]]);
                    }
                    NewRow += "</tr>";

                    //the records are getting binded in the row in next line.
                    GridBody.append(NewRow);
                }

                //this is to sort the record if the user want to sort the data at initially population.
                if (!(JqGridData.sortSetting.sortColumn === undefined)) {
                    var allHeaderTd = $("#" + ContentHolder + " table:first thead tr").find("th");
                    var defaultSortColumneIndex = ColumnNames.indexOf(JqGridData.sortSetting.sortColumn);
                    var sortDataType = $(allHeaderTd[defaultSortColumneIndex]).attr("dataType");
                    SortRecords(JqGridData.sortSetting.sortColumn, JqGridData.sortSetting.sortDirection, sortDataType, $(allHeaderTd[defaultSortColumneIndex]));
                }
            }

            //Function to Create Editable Links
            CreateEditableRecords();

            //Function to Apply theme or user define stylling
            ApplyThemeOrCssGridView();
        }

        //Function to Create Paging
        function CreatePaging(CurrentPage) {
            if (JqGridData.pageSetting.allowPager) {

                var NoOfPages = parseInt(JqGridAjaxResponse.length / JqGridData.pageSetting.pageSize);
                var RemainginRecords = JqGridAjaxResponse.length % JqGridData.pageSetting.pageSize;

                if (RemainginRecords > 0)
                    NoOfPages++;

                $("#" + ContentHolder).append("<table style='width:100%;'></table>");
                $("#" + ContentHolder + " table:last").append("<tr></tr>");

                var PagingTr = ("#" + ContentHolder + " table:last tr");

                //Creating Tab for Fast Backward(means goto page 1) and goto previous page
                $("#" + ContentHolder + " table:last tr").append("<td></td>");
                $("#" + ContentHolder + " table:last tr td:last").html("<i class=\"fa-backward fa-lg\" style=\"cursor:pointer;\" alt='Page 1' pageVal='1'></i>");
                $("#" + ContentHolder + " table:last tr").append("<td></td>");
                $("#" + ContentHolder + " table:last tr td:last").html("<i class=\"fa-caret-left fa-lg\" style=\"cursor:pointer;\" alt='Previous' pageVal='-1'></i>");
                //end of creating tab for fast backward and previous page


                var StartPageCounter = 0;

                //this is for changing the page numbers in paging menu
                if (CurrentPage > MinShownPageFooter && CurrentPage < MaxShownPageFooter) {
                    StartPageCounter = MinShownPageFooter - 1;
                }
                else if (CurrentPage == MinShownPageFooter && CurrentPage > 1) {
                    StartPageCounter = MinShownPageFooter - 10;
                    MinShownPageFooter = MinShownPageFooter - 9;
                    MaxShownPageFooter = MaxShownPageFooter - 9;
                }
                else if (CurrentPage == MaxShownPageFooter && CurrentPage < NoOfPages) {
                    StartPageCounter = MaxShownPageFooter - 1;
                    MinShownPageFooter = MaxShownPageFooter;
                    MaxShownPageFooter = MaxShownPageFooter + 9;
                }
                else if (CurrentPage == 1) {
                    StartPageCounter = 0;
                    MinShownPageFooter = 1;
                    MaxShownPageFooter = 10;
                }
                else if (CurrentPage == NoOfPages) {
                    StartPageCounter = NoOfPages - 10;
                    MinShownPageFooter = NoOfPages - 9;
                    MaxShownPageFooter = NoOfPages;
                }
                else {
                    StartPageCounter = CurrentPage - 1;
                    if (StartPageCounter >= 0 && (StartPageCounter + 10) <= NoOfPages) {
                        MinShownPageFooter = CurrentPage;
                        MaxShownPageFooter = CurrentPage + 9;
                    }
                    else {
                        MinShownPageFooter = CurrentPage - 9;
                        MaxShownPageFooter = CurrentPage;
                    }
                }

                if (MinShownPageFooter < 1) {
                    if (NoOfPages > 10) {
                        StartPageCounter = 0;
                        MinShownPageFooter = 1;
                        MaxShownPageFooter = 10;
                    }
                    else {
                        StartPageCounter = 0;
                        MinShownPageFooter = 1;
                        MaxShownPageFooter = NoOfPages;
                    }
                }

                if (MaxShownPageFooter > NoOfPages) {
                    if (NoOfPages > 10) {
                        StartPageCounter = NoOfPages - 10;
                        MaxShownPageFooter = NoOfPages;
                        MinShownPageFooter = NoOfPages - 9;
                    }
                    else {
                        StartPageCounter = 0;
                        MaxShownPageFooter = NoOfPages;
                        MinShownPageFooter = 0;
                    }
                }

                //end of changing page no. in paging menu

                //for loop to populate page no. in paging menu
                if (NoOfPages > 10) {
                    for (var i = 1; i <= 10; i++) {
                        StartPageCounter++;
                        $("#" + ContentHolder + " table:last tr").append("<td></td>");
                        $("#" + ContentHolder + " table:last tr td:last").html('<a href="javascript://" alt="Page ' + StartPageCounter.toString() + '">' + StartPageCounter.toString() + '</a>');
                    }
                }
                else {
                    for (var i = 1; i <= NoOfPages; i++) {
                        StartPageCounter++;
                        $("#" + ContentHolder + " table:last tr").append("<td></td>");
                        $("#" + ContentHolder + " table:last tr td:last").html('<a href="javascript://" alt="Page ' + StartPageCounter.toString() + '">' + StartPageCounter.toString() + '</a>');
                    }
                }

                //Start of creating page text box and go button
                $("#" + ContentHolder + " table:last tr").append("<td></td>");
                $("#" + ContentHolder + " table:last tr td:last").html("<input id='" + ContentHolder + "txtJqGridGoToPage' type='text' value='" + CurrentPage + "' style='width:30px;text-align:right;' /> / " + NoOfPages + " <input type='button' value='Go' />");

                $("#" + ContentHolder + " table:last tr").append("<td></td>");
                //End of creating page text box and go button

                //Start of Creating DropDown in Paging Menu for showing different no. of Records Per Page
                var dropDownRecordPerPage = $('<select />');

                if (!(JqGridData.pageSetting.recordPerPage === undefined)) {
                    if (JqGridData.pageSetting.recordPerPage != "") {
                        var PageRecordData = JqGridData.pageSetting.recordPerPage.split(",");
                        for (var i = 0; i < PageRecordData.length; i++) {
                            var attriSplitterData = PageRecordData[i].split(":");
                            if (attriSplitterData.length == 2) {
                                $('<option />', { value: attriSplitterData[0], text: attriSplitterData[1] }).appendTo(dropDownRecordPerPage);
                            }
                        }

                        dropDownRecordPerPage.val(JqGridData.pageSetting.pageSize);
                    }
                    else {
                        $('<option />', { value: "10", text: "10 Records" }).appendTo(dropDownRecordPerPage);
                        $('<option />', { value: "20", text: "20 Records" }).appendTo(dropDownRecordPerPage);
                        $('<option />', { value: "30", text: "30 Records" }).appendTo(dropDownRecordPerPage);
                        $('<option />', { value: "40", text: "40 Records" }).appendTo(dropDownRecordPerPage);
                        $('<option />', { value: "50", text: "50 Records" }).appendTo(dropDownRecordPerPage);
                        $('<option />', { value: "60", text: "60 Records" }).appendTo(dropDownRecordPerPage);
                        $('<option />', { value: "70", text: "70 Records" }).appendTo(dropDownRecordPerPage);
                        $('<option />', { value: "80", text: "80 Records" }).appendTo(dropDownRecordPerPage);
                        $('<option />', { value: "90", text: "90 Records" }).appendTo(dropDownRecordPerPage);
                        $('<option />', { value: "100", text: "100 Records" }).appendTo(dropDownRecordPerPage);

                        dropDownRecordPerPage.val(JqGridData.pageSetting.pageSize);
                    }
                }
                else {

                    $('<option />', { value: "10", text: "10 Records" }).appendTo(dropDownRecordPerPage);
                    $('<option />', { value: "20", text: "20 Records" }).appendTo(dropDownRecordPerPage);
                    $('<option />', { value: "30", text: "30 Records" }).appendTo(dropDownRecordPerPage);
                    $('<option />', { value: "40", text: "40 Records" }).appendTo(dropDownRecordPerPage);
                    $('<option />', { value: "50", text: "50 Records" }).appendTo(dropDownRecordPerPage);
                    $('<option />', { value: "60", text: "60 Records" }).appendTo(dropDownRecordPerPage);
                    $('<option />', { value: "70", text: "70 Records" }).appendTo(dropDownRecordPerPage);
                    $('<option />', { value: "80", text: "80 Records" }).appendTo(dropDownRecordPerPage);
                    $('<option />', { value: "90", text: "90 Records" }).appendTo(dropDownRecordPerPage);
                    $('<option />', { value: "100", text: "100 Records" }).appendTo(dropDownRecordPerPage);

                    dropDownRecordPerPage.val(JqGridData.pageSetting.pageSize);
                }

                //End of Creating DropDown in Paging Menu for showing different no. of Records Per Page

                //Definning Event for DropDown Selection Change
                dropDownRecordPerPage.change(function () {

                    //var StratRecordIndex = 0;
                    //var EndRecordIndex = 0;

                    //if (JqGridData.pageSetting.allowPager) {

                    //    StratRecordIndex = (CurrentPage - 1) * JqGridData.pageSetting.pageSize;
                    //    EndRecordIndex = (CurrentPage * JqGridData.pageSetting.pageSize);

                    //    if (EndRecordIndex > JqGridAjaxResponse.length) {
                    //        EndRecordIndex = JqGridAjaxResponse.length;
                    //    }
                    //}
                    //else {
                    //    StratRecordIndex = 0;
                    //    EndRecordIndex = JqGridAjaxResponse.length;
                    //}

                    JqGridData.pageSetting.pageSize = dropDownRecordPerPage.val();

                    var newStartRecordIndex = (CurrentPage - 1) * JqGridData.pageSetting.pageSize;
                    var newEndRecordIndex = CurrentPage * JqGridData.pageSetting.pageSize;

                    if (newEndRecordIndex > JqGridAjaxResponse.length) {
                        CurrentPage = parseInt(JqGridAjaxResponse.length / JqGridData.pageSetting.pageSize);
                        if ((JqGridAjaxResponse.length % JqGridData.pageSetting.pageSize) > 0) {
                            CurrentPage++;
                        }
                    }

                    PopulateGridData(CurrentPage);
                    CreatePaging(CurrentPage);

                    $.isFunction(JqGridData.success) && JqGridData.success.call(this, JqGridAjaxResponse);
                });

                //End of Definning Event for DropDown Selection Change

                $("#" + ContentHolder + " table:last tr td:last").append(dropDownRecordPerPage);

                //Start of Populating goto next page and fast forward menu in paging menu
                $("#" + ContentHolder + " table:last tr").append("<td></td>");
                $("#" + ContentHolder + " table:last tr td:last").html("<i class=\"fa-caret-right fa-lg\" style=\"cursor:pointer;\" alt='Next' pageVal='+1'></i>");
                $("#" + ContentHolder + " table:last tr").append("<td></td>");
                $("#" + ContentHolder + " table:last tr td:last").html("<i class=\"fa-forward fa-lg\" style=\"cursor:pointer;\" alt='Last Page' pageVal='" + NoOfPages + "'></i>");
                //End of Populating goto next page and fast forward menu in paging menu

                //Binding Click Event on Fast Backward and Forward as well as Next and Previous Page
                $("#" + ContentHolder + " table:last tr td i").bind("click", function () {

                    var imageAlt = $(this).attr("alt");
                    var goToPage = parseInt($(this).attr("pageVal"));
                    if (imageAlt == "Next" || imageAlt == "Previous") {
                        GlobalCurrentPage = GlobalCurrentPage + goToPage;

                        if (GlobalCurrentPage > 0 && GlobalCurrentPage <= NoOfPages) {
                            PopulateGridData(GlobalCurrentPage);
                            CreatePaging(GlobalCurrentPage);

                            $.isFunction(JqGridData.success) && JqGridData.success.call(this, JqGridAjaxResponse);
                        }
                        else if (GlobalCurrentPage > NoOfPages) {
                            GlobalCurrentPage = GlobalCurrentPage - goToPage;
                            alert("You are at Last Page");
                        }
                        else {
                            GlobalCurrentPage = GlobalCurrentPage - goToPage;
                            alert("You are at Page 1");
                        }
                    }
                    else {
                        GlobalCurrentPage = goToPage;
                        PopulateGridData(GlobalCurrentPage);
                        CreatePaging(GlobalCurrentPage);

                        $.isFunction(JqGridData.success) && JqGridData.success.call(this, JqGridAjaxResponse);
                    }

                });

                //Defining Event for Page No. in Paging Menu
                $("#" + ContentHolder + " table:last tr td a").bind("click", function () {

                    PopulateGridData(parseInt($(this).text()));
                    CreatePaging(GlobalCurrentPage);

                    $.isFunction(JqGridData.success) && JqGridData.success.call(this, JqGridAjaxResponse);
                });

                //Defining Event for Go Button in Paging Menu
                $("#" + ContentHolder + " table:last tr td input[type='button']").bind("click", function () {

                    if (parseInt($("#" + ContentHolder + "txtJqGridGoToPage").val()) > 0 && parseInt($("#" + ContentHolder + "txtJqGridGoToPage").val()) <= NoOfPages) {
                        PopulateGridData(parseInt($("#" + ContentHolder + "txtJqGridGoToPage").val()));
                        CreatePaging(GlobalCurrentPage);

                        $.isFunction(JqGridData.success) && JqGridData.success.call(this, JqGridAjaxResponse);
                    }
                    else {
                        alert("Please provide correct page no.");
                    }
                });
            }
        }

        //Function to SortRecord according to the column
        function SortRecords(SortColumnName, SortDirection, DataType, HeaderObj) {
            if (!editClick) {
                var arrayOfSortedRecords = new Array(JqGridData.pageSetting.pageSize);

                if (JqGridData.columnHeaders.length > 0) {

                    var ColumnNames = new Array((JqGridData.columnAttributes.length + 1));
                    var ColumnAtrributesData = new Array((JqGridData.columnAttributes.length + 1));
                    //Setting of Each Column Name.
                    for (var i = 0; i < JqGridData.columnAttributes.length; i++) {

                        ColumnAtrributesData[i] = "";
                        Object.getOwnPropertyNames(JqGridData.columnAttributes[i]).forEach(function (val, idx, array) {

                            if (val.toString() == "columnName") {
                                ColumnNames[i] = JqGridData.columnAttributes[i][val];
                            }
                            else if (val.toString() == "dataType") {

                            }
                            else {
                                ColumnAtrributesData[i] += " " + val.toString() + "='" + JqGridData.columnAttributes[i][val] + "'";
                            }
                        });
                    }

                    if (!(JqGridData.keyColumn === undefined)) {
                        ColumnNames[JqGridData.columnAttributes.length] = JqGridData.keyColumn;
                    }

                    var StratRecordIndex = 0;
                    var EndRecordIndex = 0;

                    if (JqGridData.pageSetting.allowPager) {

                        StratRecordIndex = (GlobalCurrentPage - 1) * JqGridData.pageSetting.pageSize;
                        EndRecordIndex = (GlobalCurrentPage * JqGridData.pageSetting.pageSize);

                        if (JqGridData.extraData.isExtra) {
                            if (EndRecordIndex > (JqGridAjaxResponse.length - JqGridData.extraData.extraRowCount)) {
                                EndRecordIndex = JqGridAjaxResponse.length - JqGridData.extraData.extraRowCount;
                            }
                        }
                        else {
                            if (EndRecordIndex > JqGridAjaxResponse.length) {
                                EndRecordIndex = JqGridAjaxResponse.length;
                            }
                        }
                    }
                    else {
                        StratRecordIndex = 0;
                        if (JqGridData.extraData.isExtra) {
                            EndRecordIndex = JqGridAjaxResponse.length - JqGridData.extraData.extraRowCount;
                        }
                        else {
                            EndRecordIndex = JqGridAjaxResponse.length;
                        }
                    }

                    var indexCounter = 0;
                    for (var i = StratRecordIndex; i < EndRecordIndex; i++) {
                        arrayOfSortedRecords[indexCounter] = new Array();

                        for (var j = 0; j < ColumnNames.length; j++)
                            arrayOfSortedRecords[indexCounter][ColumnNames[j]] = JqGridAjaxResponse[i][ColumnNames[j]];

                        indexCounter++;
                    }

                    if (SortDirection == "asc") {
                        arrayOfSortedRecords = arrayOfSortedRecords.sort(function (a, b) {
                            switch (DataType) {
                                case "string":
                                    return a[SortColumnName] > b[SortColumnName] ? 1 : -1;
                                    break;
                                case "date":
                                    return new Date(a[SortColumnName]) - Date(b[SortColumnName]) ? 1 : -1;
                                    break;
                                case "int":
                                    return parseInt(a[SortColumnName]) > parseInt(b[SortColumnName]) ? 1 : -1;
                                    break;
                                case "float":
                                    return parseFloat(a[SortColumnName]) > parseFloat(b[SortColumnName]) ? 1 : -1;
                                    break;
                                default:
                                    return a[SortColumnName] > b[SortColumnName] ? 1 : -1;
                                    break;
                            }

                        });
                        $(HeaderObj).attr("sortOrder", "desc");
                    }
                    else if (SortDirection == "desc") {
                        arrayOfSortedRecords = arrayOfSortedRecords.sort(function (a, b) {
                            switch (DataType) {
                                case "string":
                                    return a[SortColumnName] < b[SortColumnName] ? 1 : -1;
                                    break;
                                case "date":
                                    return new Date(b[SortColumnName]) - Date(a[SortColumnName]) ? 1 : -1;
                                    break;
                                case "int":
                                    return parseInt(a[SortColumnName]) < parseInt(b[SortColumnName]) ? 1 : -1;
                                    break;
                                case "float":
                                    return parseFloat(a[SortColumnName]) < parseFloat(b[SortColumnName]) ? 1 : -1;
                                    break;
                                default:
                                    return a[SortColumnName] < b[SortColumnName] ? 1 : -1;
                                    break;
                            }
                        });
                        $(HeaderObj).attr("sortOrder", "asc");
                    }

                    var existingRecordTr = $("#" + ContentHolder + " table:first tbody tr");

                    var rowCount = 0;

                    $("#" + ContentHolder + " table:first tbody tr").each(function () {
                        var allTds = $(this).find("td");

                        if (!(JqGridData.keyColumn === undefined)) {
                            $(this).attr("dataKey", arrayOfSortedRecords[rowCount][JqGridData.keyColumn]);
                            for (var j = 0; j < (ColumnNames.length - 1); j++) {
                                $(allTds[j]).html(arrayOfSortedRecords[rowCount][ColumnNames[j]]);
                            }
                        }
                        else {
                            for (var j = 0; j < (ColumnNames.length - 1); j++) {
                                $(allTds[j]).html(arrayOfSortedRecords[rowCount][ColumnNames[j]]);
                            }
                        }
                        rowCount++;
                    });
                }

                $.isFunction(JqGridData.success) && JqGridData.success.call(this, JqGridAjaxResponse);
            }
            else {
                alert("You are in Edit Mode. Please complete that task first to sort");
            }
        }

        function BindEditDeleteEvent(clickedControl) {
            if ($(clickedControl).text() == JqGridData.cellEditSetting.editText) {

                //This Block is for Edit Cell Data. When user click on Edit Button this Block will be called

                editClick = true;
                var editDataKey = $(clickedControl).parent().parent().attr("dataKey");
                var editCell = $(clickedControl).parent();
                GlobalEditableRow = $(clickedControl).parent().parent().html();
                var originalEditableRow = $(clickedControl).parent().parent();

                $.ajax({
                    url: JqGridData.cellEditSetting.editUrl,
                    data: { strTransactionId: editDataKey, strMemberID: editDataKey },
                    dataType: "html",
                    type: "post",
                    success: function (response) {
                        if (response != "ERROR") {

                            var editableTds = $(originalEditableRow).find("td");

                            var cellDataDetails = response.split("$@@$");
                            var editSettingColumnName = JqGridData.editCellTypes.columnNames.split(",");
                            var editSettingDataType = JqGridData.editCellTypes.columnType.split(",");

                            for (var i = 0; i < (editableTds.length - 1); i++) {
                                var cellInfo = cellDataDetails[i].split("$::$");
                                switch (editSettingDataType[i].toString()) {
                                    case "label":
                                        $(editableTds[i]).html('<span>' + cellInfo[1] + '</span>');
                                        break;
                                    case "textbox":
                                        $(editableTds[i]).html('<input type="textbox" value="' + cellInfo[1] + '" />');
                                        break;
                                    case "checkbox":
                                        var multiVals = cellInfo[1].split("$,$");
                                        $(editableTds[i]).html("");
                                        for (var j = 0; j < multiVals.length; j++) {
                                            var valText = multiVals[j].split("$.$");
                                            $(editableTds[i]).append('<input name="chkBoxJq' + i.toString() + j.toString() + '" type="checkbox" actVal="' + valText[1] + '" value="' + valText[0] + '" />' + valText[1] + '&nbsp;');
                                        }
                                        break;
                                    case "dropdown":
                                        var multiVals = cellInfo[1].split("$,$");
                                        var dropDownJqCell = $('<select />');
                                        for (var j = 0; j < multiVals.length; j++) {
                                            var valText = multiVals[j].split("$.$");
                                            $('<option />', { value: valText[0], text: valText[1] }).appendTo(dropDownJqCell);
                                        }

                                        $(editableTds[i]).html("");
                                        $(editableTds[i]).append(dropDownJqCell);
                                        break;
                                    case "textarea":
                                        $(editableTds[i]).html('<textarea id="txtAreaJq">' + cellInfo[1] + '</textarea>');
                                        break;
                                    case "radio":
                                        var multiVals = cellInfo[1].split("$,$");
                                        $(editableTds[i]).html("");
                                        for (var j = 0; j < multiVals.length; j++) {
                                            var valText = multiVals[j].split("$.$");
                                            $(editableTds[i]).append('<input name="rdbBtnJq' + i + '" type="radio" actVal="' + valText[1] + '" value="' + valText[0] + '" />' + valText[1] + '&nbsp;');
                                        }
                                        break;
                                }
                            }

                            $(editCell).html("");

                            if (!(JqGridData.cellEditSetting.allowUpdate === undefined)) {
                                if (JqGridData.cellEditSetting.allowUpdate) {
                                    if (!(JqGridData.cellEditSetting.updateText === undefined))
                                        $(editCell).html('<a href="javascript://">' + JqGridData.cellEditSetting.updateText + '</a>');
                                    else {
                                        $(editCell).html('<a href="javascript://">Update</a>');
                                        JqGridData.cellEditSetting.updateText = "Update";
                                    }

                                }
                            }

                            if (!(JqGridData.cellEditSetting.allowCancel === undefined)) {
                                if (JqGridData.cellEditSetting.allowCancel) {
                                    if (!(JqGridData.cellEditSetting.cancelText === undefined))
                                        $(editCell).append('&nbsp;<a href="javascript://">' + JqGridData.cellEditSetting.cancelText + '</a>');
                                    else {
                                        $(editCell).append('&nbsp;<a href="javascript://">Cancel</a>');
                                        JqGridData.cellEditSetting.cancelText = "Cancel";
                                    }
                                }
                            }

                            $("#" + ContentHolder + " table:first tbody tr td a").bind("click", function () {

                                if ($(this).text() == JqGridData.cellEditSetting.cancelText) {

                                    //This block is for Cancelling row edit mode and will be called when user click on cancel link.

                                    $(this).parent().parent().html(GlobalEditableRow);
                                    editClick = false;

                                    $("#" + ContentHolder + " table:first tbody tr td a").bind("click", function () {
                                        BindEditDeleteEvent(this);
                                    });
                                }
                                else if ($(this).text() == JqGridData.cellEditSetting.updateText) {

                                    //This block is for Updating row data and will be called when user click on update link.

                                    var updateCellType = JqGridData.editCellTypes.columnType.split(",");
                                    var allUpdatedTd = $(this).parent().parent().find("td");
                                    var updatingRow = $(this).parent().parent();

                                    var postData = "";
                                    var htmlData = new Array();

                                    for (var i = 0; i < updateCellType.length; i++) {
                                        switch (updateCellType[i]) {
                                            case "label":
                                                var cellLabelValue = $(allUpdatedTd[i]).find("span").html();

                                                htmlData[i] = cellLabelValue;

                                                postData += cellLabelValue + "$UPDATE$";
                                                break;
                                            case "textbox":
                                                var cellTextBoxValue = $(allUpdatedTd[i]).find('input[type="textbox"]').val();

                                                htmlData[i] = cellTextBoxValue;

                                                postData += cellTextBoxValue + "$UPDATE$";
                                                break;
                                            case "checkbox":
                                                var cellCheckBoxes = $(allUpdatedTd[i]).find('input[type="checkbox"]');

                                                var allCheckBoxData = "";
                                                var allCheckBoxVal = "";
                                                for (var k = 0; k < cellCheckBoxes.length; k++) {
                                                    if ($(cellCheckBoxes[k]).attr("checked")) {
                                                        alert($(cellCheckBoxes[k]).attr("checked") + ":" + $(cellCheckBoxes[k]).val());
                                                        allCheckBoxData += $(cellCheckBoxes[k]).val() + "$CheckBox$";
                                                        allCheckBoxVal += $(cellCheckBoxes[k]).attr("actVal") + ",";
                                                    }
                                                }
                                                postData += allCheckBoxData + "$UPDATE$";

                                                allCheckBoxVal = allCheckBoxVal.substring(0, allCheckBoxVal.length - 1);
                                                htmlData[i] = allCheckBoxVal;
                                                break;
                                            case "dropdown":
                                                var cellDropDownSelectedVal = $(allUpdatedTd[i]).find("select").val();

                                                postData += cellDropDownSelectedVal + "$UPDATE$";

                                                htmlData[i] = $(allUpdatedTd[i]).find("select option:selected").text();
                                                break;
                                            case "textarea":
                                                var cellTextAreaVal = $(allUpdatedTd[i]).find("textarea#txtAreaJq").val(); ;

                                                postData += cellTextAreaVal + "$UPDATE$";

                                                htmlData[i] = cellTextAreaVal;
                                                break;
                                            case "radio":
                                                var cellRadioName = $(allUpdatedTd[i]).find('input[type="radio"]').attr("name");

                                                var cellRadioVal = $('input[name=' + cellRadioName + ']:checked').val();
                                                postData += cellRadioVal + "$UPDATE$";

                                                htmlData[i] = $('input[name=' + cellRadioName + ']:checked').attr("actVal");
                                                break;
                                        }
                                    }

                                    $.ajax({
                                        url: JqGridData.cellEditSetting.updateUrl,
                                        data: { strTransactionId: $(this).parent().parent().attr("dataKey"), strPostData: postData },
                                        dataType: "html",
                                        type: "post",
                                        success: function (response) {
                                            if (response == "true") {

                                                for (var i = 0; i < (editableTds.length - 1); i++) {
                                                    $(editableTds[i]).html(htmlData[i]);
                                                }

                                                $(editCell).html("");

                                                if (!(JqGridData.cellEditSetting.allowEdit === undefined)) {
                                                    if (JqGridData.cellEditSetting.allowEdit) {
                                                        $(editCell).html('<a href="javascript://">' + JqGridData.cellEditSetting.editText + '</a>');
                                                    }
                                                }

                                                if (!(JqGridData.cellEditSetting.allowDelete === undefined)) {
                                                    if (JqGridData.cellEditSetting.allowDelete) {
                                                        $(editCell).append('&nbsp;<a href="javascript://">' + JqGridData.cellEditSetting.deleteText + '</a>');
                                                    }
                                                }

                                                $(editCell).find("a").each(function () { $(this).bind("click", function () { BindEditDeleteEvent(this); }); });

                                                editClick = false;

                                                var UpdateRecordIndex = 0;

                                                if (JqGridData.pageSetting.allowPager) {

                                                    UpdateRecordIndex = ((GlobalCurrentPage - 1) * JqGridData.pageSetting.pageSize) + parseInt($(updatingRow).index("tr")) - 1;
                                                }
                                                else {
                                                    UpdateRecordIndex = parseInt($(updatingRow).index("tr")) - 1;
                                                }

                                                //The next 3 variables is just to store actually column names
                                                //which we can get from "JqGridData.columnAttributes"
                                                var ColumnNames = new Array();

                                                //The next for loop is to fetch all column attributes there actual names and data type

                                                for (var i = 0; i < JqGridData.columnAttributes.length; i++) {

                                                    Object.getOwnPropertyNames(JqGridData.columnAttributes[i]).forEach(function (val, idx, array) {

                                                        var varColAttributes = "";
                                                        if (val.toString() == "columnName") {
                                                            ColumnNames[i] = JqGridData.columnAttributes[i][val];
                                                        }
                                                    });
                                                }

                                                for (var i = 0; i < htmlData.length; i++) {
                                                    JqGridAjaxResponse[UpdateRecordIndex][ColumnNames[i]] = htmlData[i];
                                                }
                                            }
                                            else {
                                                alert(response);
                                            }
                                        },
                                        error: function (err) { alert(err.d); }
                                    });
                                }

                                //alert("Data Updated Successfully");
                            });
                        }
                        else {
                            alert("Error While Getting Response From Server");
                        }
                    },
                    error: function (err) { alert("sachinEdit"); }
                });
            }
            else if ($(clickedControl).text() == JqGridData.cellEditSetting.deleteText) {

                //This block is for deleting row and will be called when user click on delete link.

                var deleteDataKey = $(clickedControl).parent().parent().attr("dataKey");
                var deletingRow = $(clickedControl).parent().parent();
                $.ajax({
                    url: JqGridData.cellEditSetting.deleteUrl,
                    data: { strTransactionId: deleteDataKey },
                    dataType: "html",
                    type: "post",
                    success: function (response) {
                        if (response == "true") {
                            var DeleteRecordIndex = 0;

                            if (JqGridData.pageSetting.allowPager) {

                                DeleteRecordIndex = ((GlobalCurrentPage - 1) * JqGridData.pageSetting.pageSize) + parseInt($(deletingRow).index("tr")) - 1;
                            }
                            else {
                                DeleteRecordIndex = parseInt($(deletingRow).index("tr")) - 1;
                            }

                            JqGridAjaxResponse.splice(DeleteRecordIndex, 1);

                            PopulateGridData(GlobalCurrentPage);
                            CreatePaging(GlobalCurrentPage);

                            $.isFunction(JqGridData.success) && JqGridData.success.call(this, JqGridAjaxResponse);
                        }
                    },
                    error: function (err) { alert("sachinDelete"); }
                });
            }
        }

        function CreateEditableRecords() {

            if (JqGridData.cellEditSetting.needEditSettings) {
                $("#" + ContentHolder + " table:first thead tr").append("<th></th>");
                $("#" + ContentHolder + " table:first tbody tr").each(function () {
                    $(this).append("<td></td>");

                    if (!(JqGridData.cellEditSetting.allowEdit === undefined)) {
                        if (JqGridData.cellEditSetting.allowEdit) {
                            if (!(JqGridData.cellEditSetting.editText === undefined))
                                $(this).find("td:last").html("<a href='javascript://'>" + JqGridData.cellEditSetting.editText + "</a>");
                            else {
                                $(this).find("td:last").html("<a href='javascript://'>Edit</a>");
                                JqGridData.cellEditSetting.editText = "Edit";
                            }
                        }
                    }

                    if (!(JqGridData.cellEditSetting.allowDelete === undefined)) {
                        if (JqGridData.cellEditSetting.allowDelete) {
                            if (!(JqGridData.cellEditSetting.deleteText === undefined))
                                $(this).find("td:last").append("&nbsp;<a href='javascript://'>" + JqGridData.cellEditSetting.deleteText + "</a>");
                            else {
                                $(this).find("td:last").append("&nbsp;<a href='javascript://'>Delete</a>");
                                JqGridData.cellEditSetting.deleteText = "Delete";
                            }
                        }
                    }
                });

                $("#" + ContentHolder + " table:first tbody tr td a").bind("click", function () {

                    BindEditDeleteEvent(this);

                });
            }
        }

        //Function to Apply Theme or Css to GridView
        function ApplyThemeOrCssGridView() {
            if (!(JqGridData.themeUrl === undefined) && JqGridData.themeUrl != "") {
                if (!$('link[href="' + JqGridData.themeUrl + '"]').length)
                    $('head').append('<link rel="stylesheet" type="text/css" href="' + JqGridData.themeUrl + '" />');
            }
            else {
                if (!(JqGridData.gridStyle.headerClass === undefined))
                    $("#" + ContentHolder + " table:first thead tr").addClass(JqGridData.gridStyle.headerClass);

                if (!(JqGridData.gridStyle.footerClass === undefined)) {
                    $("#" + ContentHolder + " table:first tfoot tr").addClass(JqGridData.gridStyle.footerClass);
                }

                if (!(JqGridData.gridStyle.rowClass === undefined)) {
                    $("#" + ContentHolder + " table:first tbody tr").addClass(JqGridData.gridStyle.rowClass);
                }

                if (!(JqGridData.gridStyle.alternativeRowClass === undefined)) {
                    $("#" + ContentHolder + " table:first tbody tr:odd").removeClass(JqGridData.gridStyle.rowClass);
                    $("#" + ContentHolder + " table:first tbody tr:odd").addClass(JqGridData.gridStyle.alternativeRowClass);
                }
            }
        }

        JqGridCreate();
    }
} (jQuery));