import React, { useState, useEffect } from 'react';
import './DataTable.css';
import { Link } from 'react-router-dom';
import PopupModal from "../model/PopupModal";



const YetToBeReceivedDataTable = ({
    demoData = [],
    keyColumn = "",
    gridStyle = {
        headerClass: "",
        footerClass: "",
        rowClass: "",
        alternativeRowClass: ""
    },
    pageSetting = {
        allowPager: false,
        pageSize: 10,
        nextPrevTab: true,
        recordPerPage: ""
    },
    sortSetting = {
        allowSorting: false,
        sortColumn: "",
        sortDirection: "asc"
    },
    cellEditSetting = {
        needEditSettings: false,
        allowEdit: false,
        editText: "Edit",
        editUrl: "",
        allowDelete: false,
        deleteText: "Delete",
        deleteUrl: "",
        allowUpdate: false,
        updateText: "Update",
        updateUrl: "",
        allowCancel: false,
        cancelText: "Cancel"
    },
    editCellTypes = {
        columnNames: "",
        columnType: ""
    },
    extraData = {
        isExtra: false,
        extraRowCount: 0
    },
    onSuccess = () => { },
    onError = () => { }
}) => {
    const [gridData, setGridData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [minShownPage, setMinShownPage] = useState(1);
    const [maxShownPage, setMaxShownPage] = useState(10);
    const [editableRow, setEditableRow] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [sortedColumn, setSortedColumn] = useState(sortSetting.sortColumn);
    const [sortDirection, setSortDirection] = useState(sortSetting.sortDirection);
    const [showModal, setShowModal] = useState(false);

    const columnHeaders = [
        "Sr No", "ID", "ReceivedFrom", "Type", "Amount", "Transfer Time"
    ];

    const columnAttributes = [
        { columnName: "SrNo", dataType: "int" },
        { columnName: "id", dataType: "string" },
        { columnName: "ReceivedFrom", dataType: "string" },
        { columnName: "Type", dataType: "string" },
        { columnName: "Amount", dataType: "float" },
        { columnName: "TransferTime", dataType: "date" }
    ];
    useEffect(() => {
        const transformedData = demoData.map((object, index) => ({
            SrNo: index + 1,
            id: object.userId?.username?.toString() || "N/A",
            ReceivedFrom: `${object.userId?.firstName} ${object.userId?.lastName}`,
            Type: 'Credit',
            Amount: object.amount,
            TransferTime: object.createdAt
        }));

        // console.log("Transformed Data:", transformedData);
        setGridData(transformedData);
        calculatePagination(transformedData.length);
    }, [demoData]);



    const calculatePagination = (dataLength) => {
        const pages = Math.ceil(dataLength / pageSetting.pageSize);
        setTotalPages(pages);
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
            updatePaginationRange(newPage);
        }
    };

    const updatePaginationRange = (page) => {
        if (page > minShownPage && page < maxShownPage) return;
        if (page === minShownPage && page > 1) {
            setMinShownPage(minShownPage - 9);
            setMaxShownPage(maxShownPage - 9);
        } else if (page === maxShownPage && page < totalPages) {
            setMinShownPage(maxShownPage);
            setMaxShownPage(maxShownPage + 9);
        } else if (page === 1) {
            setMinShownPage(1);
            setMaxShownPage(10);
        } else if (page === totalPages) {
            setMinShownPage(totalPages - 9 > 0 ? totalPages - 9 : 1);
            setMaxShownPage(totalPages);
        } else {
            setMinShownPage(page);
            setMaxShownPage(page + 9 <= totalPages ? page + 9 : totalPages);
        }
    };

    const handleRecordsPerPageChange = (e) => {
        const newPageSize = parseInt(e.target.value);
        pageSetting.pageSize = newPageSize;
        const newPages = Math.ceil(gridData.length / newPageSize);
        if (currentPage > newPages) {
            setCurrentPage(newPages);
        }
        calculatePagination(gridData.length);
    };

    const sortRecords = (columnName, direction, dataType = 'string') => {
        if (isEditing) {
            alert("You are in Edit Mode. Please complete that task first to sort");
            return;
        }

        const sortedData = [...gridData];
        sortedData.sort((a, b) => {
            const aValue = a[columnName];
            const bValue = b[columnName];

            if (direction === 'asc') {
                switch (dataType) {
                    case 'int': return parseInt(aValue) - parseInt(bValue);
                    case 'float': return parseFloat(aValue) - parseFloat(bValue);
                    case 'date': return new Date(aValue) - new Date(bValue);
                    case 'string': return aValue?.toString();
                    default: return aValue?.toString().localeCompare(bValue?.toString());
                }
            } else {
                switch (dataType) {
                    case 'int': return parseInt(bValue) - parseInt(aValue);
                    case 'float': return parseFloat(bValue) - parseFloat(aValue);
                    case 'date': return new Date(bValue) - new Date(aValue);
                    case 'string': return aValue?.toString();
                    default: return bValue?.toString().localeCompare(aValue?.toString());
                }
            }
        });

        setGridData(sortedData);
        setSortedColumn(columnName);
        setSortDirection(direction === 'asc' ? 'desc' : 'asc');
    };

    const getVisibleRows = () => {
        if (!pageSetting.allowPager) {
            return extraData.isExtra
                ? gridData.slice(0, gridData.length - extraData.extraRowCount)
                : gridData;
        }

        const startIndex = (currentPage - 1) * pageSetting.pageSize;
        let endIndex = currentPage * pageSetting.pageSize;

        if (extraData.isExtra) {
            endIndex = Math.min(endIndex, gridData.length - extraData.extraRowCount);
        } else {
            endIndex = Math.min(endIndex, gridData.length);
        }

        return gridData.slice(startIndex, endIndex);
    };

    const handleEdit = (key, rowIndex) => {
        setEditableRow(rowIndex);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setEditableRow(null);
        setIsEditing(false);
    };

    const handleDelete = (key, rowIndex) => {
        console.log(`Delete clicked for key: ${key}`);
    };

    const handleUpdate = (key, rowIndex) => {
        console.log(`Update clicked for key: ${key}`);
        setEditableRow(null);
        setIsEditing(false);
    };

    const handleProfitAction = (row) => {
        console.log("Profit model button clicked for row:", row);
    };

    const calculateTotals = () => {
        const totals = {};
        columnAttributes.forEach(attr => {
            const { columnName, dataType } = attr;
            if (['int', 'float', 'string'].includes(dataType)) {
                totals[columnName] = gridData.reduce((acc, row) => acc + (parseFloat(row[columnName]) || 0), 0);
            }
        });
        return totals;
    };

    const totalRow = calculateTotals();
    // console.log(totalRow);
    const visibleRows = getVisibleRows();

    const renderPagination = () => {
        if (!pageSetting.allowPager) return null;

        const pageNumbers = [];
        for (let i = minShownPage; i <= Math.min(maxShownPage, totalPages); i++) {
            pageNumbers.push(i);
        }

        return (
            <table style={{ width: '100%' }}>
                <PopupModal isOpen={showModal} onClose={() => setShowModal(false)} />
                <tbody>
                    <tr>
                        <td><i className="fa-backward fa-lg" style={{ cursor: 'pointer' }} onClick={() => handlePageChange(1)} /></td>
                        <td><i className="fa-caret-left fa-lg" style={{ cursor: 'pointer' }} onClick={() => handlePageChange(currentPage - 1)} /></td>
                        {pageNumbers.map(number => (
                            <td key={number}>
                                <a href="javascript:void(0);" onClick={() => handlePageChange(number)} style={{ fontWeight: currentPage === number ? 'bold' : 'normal' }}>{number}</a>
                            </td>
                        ))}
                        <td>
                            <input type="text" value={currentPage} onChange={(e) => setCurrentPage(parseInt(e.target.value) || 1)} style={{ width: '30px', textAlign: 'right' }} />
                            / {totalPages}
                            <input type="button" value="Go" onClick={() => handlePageChange(currentPage)} />
                        </td>
                        <td>
                            <select onChange={handleRecordsPerPageChange} value={pageSetting.pageSize}>
                                {[10, 20, 30, 40, 50].map(v => (
                                    <option key={v} value={v}>{v} Records</option>
                                ))}
                            </select>
                        </td>
                        <td><i className="fa-caret-right fa-lg" style={{ cursor: 'pointer' }} onClick={() => handlePageChange(currentPage + 1)} /></td>
                        <td><i className="fa-forward fa-lg" style={{ cursor: 'pointer' }} onClick={() => handlePageChange(totalPages)} /></td>
                    </tr>
                </tbody>
            </table>
        );
    };

    return (
        <div className="grid">
            <table>
                <thead>
                    <tr className={gridStyle.headerClass}>
                        {columnHeaders.map((header, idx) => {
                            const colAttr = columnAttributes[idx] || {};
                            return (
                                <th key={idx}
                                    data-type={colAttr.dataType || 'string'}
                                    col-name={colAttr.columnName || ''}
                                    style={sortSetting.allowSorting ? { cursor: 'pointer' } : {}}
                                    onClick={sortSetting.allowSorting ? () =>
                                        sortRecords(
                                            colAttr.columnName,
                                            sortedColumn === colAttr.columnName ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc',
                                            colAttr.dataType
                                        ) : undefined}
                                >
                                    {header}
                                </th>
                            );
                        })}
                        {cellEditSetting.needEditSettings && <th></th>}
                    </tr>


                </thead>
                <tbody>
                    {visibleRows.length === 0 ? (
                        <tr><td colSpan={columnAttributes.length + 1}>No data available</td></tr>
                    ) : visibleRows.map((row, rowIndex) => {
                        const rowClass = rowIndex % 2 === 0 ? gridStyle.rowClass : (gridStyle.alternativeRowClass || gridStyle.rowClass);
                        return (
                            <tr key={rowIndex} className={rowClass} data-key={keyColumn ? row[keyColumn] : ''}>
                                {columnAttributes.map((col, colIndex) => (
                                    <td key={colIndex}>
                                        {editableRow === rowIndex && isEditing ? (
                                            <input type="text" defaultValue={row[col.columnName]} />
                                        ) : col.columnName === 'profit' ? (
                                            <Link
                                                to="#"
                                                className="profit-model-button"
                                                style={{ color: '#666666' }}
                                                onClick={() => setShowModal(true)}
                                            >
                                                {row[col.columnName]}
                                            </Link>
                                        ) : (
                                            row[col.columnName]
                                        )}
                                    </td>
                                ))}

                                {cellEditSetting.needEditSettings && (
                                    <td>
                                        {editableRow === rowIndex && isEditing ? (
                                            <>
                                                {cellEditSetting.allowUpdate && (
                                                    <a href="javascript:void(0);" onClick={() => handleUpdate(row[keyColumn], rowIndex)}>{cellEditSetting.updateText}</a>
                                                )}
                                                {' '}
                                                {cellEditSetting.allowCancel && (
                                                    <a href="javascript:void(0);" onClick={handleCancel}>{cellEditSetting.cancelText}</a>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {cellEditSetting.allowEdit && (
                                                    <a href="javascript:void(0);" onClick={() => handleEdit(row[keyColumn], rowIndex)}>{cellEditSetting.editText}</a>
                                                )}
                                                {' '}
                                                {cellEditSetting.allowDelete && (
                                                    <a href="javascript:void(0);" onClick={() => handleDelete(row[keyColumn], rowIndex)}>{cellEditSetting.deleteText}</a>
                                                )}
                                            </>
                                        )}
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr className={gridStyle.rowClass}>
                        {columnAttributes.map((col, index) => {
                            const totalValue = totalRow[col.columnName];
                            return (
                                <td
                                    key={index}
                                    style={{
                                        border: '1px solid #fff',
                                        padding: '5px',
                                        color: '#666',
                                        wordBreak: 'break-all',
                                    }}
                                >
                                    {index === 0
                                        ? 'Total:'
                                        : ['int', 'float'].includes(col.dataType)
                                            ? totalValue
                                            : ''}
                                </td>
                            );
                        })}
                        {cellEditSetting.needEditSettings && (
                            <td
                                style={{
                                    border: '1px solid #fff',
                                    padding: '5px',
                                    color: '#666',
                                    wordBreak: 'break-all',
                                }}
                            ></td>
                        )}
                    </tr>
                </tfoot>


            </table>

            {renderPagination()}
        </div>
    );
};

export default YetToBeReceivedDataTable;
