import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import "styles/IndexTemplate.css";

/* Utility Imports */
import Axios from "utils/Axios";
import LoadingPage from "utils/LoadingPage";
import PrintScreen from 'utils/PrintScreen';

/* Miscellaneous Imports */
import { CSVLink } from 'react-csv';
import { saveAs as FileSaver }  from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/* Icon Imports */
import excel from "icons/EXCEL256.png";
import csv from "icons/CSV256.png";
import pdf from "icons/PDF256.png";
import print from "icons/PRINT256.png";

/* MUI Imports */
import CachedIcon from "@mui/icons-material/Cached";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

/* Reducer */
const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return { ...state, loading: false, results: action.payload };
        case "FETCH_FAILED":
            return { ...state, loading: false, error: action.payload };
        case "FILTER_RESULTS":
            return { ...state, filter_results: action.payload };
        case "SELECTED_ALL_RESULTS":
            return { ...state, results: action.payload };
        case "SELECTED_ONLY_RESULTS":
            return { ...state, selected_results: action.payload };
        default:
            return state;
    }
};

const initialState = {
    loading: false, results: [], filter_results: [], selected_results: [], error: "",
};

function MF_EstCost_Index() {

    /* useNavigate */
    const navigate = useNavigate();

    /* useReducer */
    const [{ loading, results, filter_results, selected_results }, dispatch] = useReducer(
        reducer, initialState
    );

    /* Initializations */
    const defaultFilterObj = {
        customer_name: '', customer_approved: '',
        drawing_id: '', product_name: '',
        start_date: '', end_date: ''
    };

    /* useState */
    const [pageRows, setPageRows] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [curPage, setCurPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filterObj, setFilterObj] = useState(defaultFilterObj);
    const [filterBar, toggleFilterBar] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectAllFilter, setSelectAllFilter] = useState(false);
    const [open, setOpen] = useState(null);

    /* Functions */
    const fetch = async() => {
        Axios.get("/manufacturing/businessinfo/estcost/index")
            .then((res) => {
                const uncheckedResults = res.data.map((result) => (
                    {...result, isChecked: false}
                ));
                dispatch({ type: "FETCH_SUCCESS", payload: uncheckedResults });
                dispatch({ type: "FILTER_RESULTS", payload: uncheckedResults });
            })
            .catch((err) => {
                dispatch({ type: "FETCH_FAILED", payload: err.message });
            });
        };

    const refresh = () => {
        fetch();
        dispatch({ type: 'SELECTED_ONLY_RESULTS', payload: [] });
    };

    const deleteEntry = (id) => {
        Axios.delete(`/manufacturing/businessinfo/estcost/delete/${id}`)
            .then((res) => {
                console.log(res.message);
                console.log(res.error && res.error);
                fetch();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSelectAll = () => {
        setSelectAllFilter(true);
        const initialResults = results;
        initialResults.map(result => result.isChecked = true);
        dispatch({ type: 'SELECTED_ALL_RESULTS', payload: initialResults });

        const checkedResults = results.filter((result) => (result.isChecked === true));
        dispatch({ type: "SELECTED_ONLY_RESULTS", payload: checkedResults });
    }

    const handleDeselectAll = () => {
        setSelectAllFilter(false);
        const initialResults = results;
        initialResults.map(result => result.isChecked = false);
        dispatch({ type: 'SELECTED_ALL_RESULTS', payload: initialResults });

        const checkedResults = results.filter((result) => (result.isChecked === true));
        dispatch({ type: "SELECTED_ONLY_RESULTS", payload: checkedResults });
    }

    const handleCheckedRows = (id) => {
        const initialResults = results;
        const checkedIndex = initialResults.findIndex((result) => result.id === id);
        initialResults[checkedIndex].isChecked = !(initialResults[checkedIndex].isChecked);
        console.log(initialResults[checkedIndex]);
        dispatch({ type: "SELECTED_ALL_RESULTS", payload: initialResults });

        const checkedResults = results.filter((result) => (result.isChecked === true));
        dispatch({ type: "SELECTED_ONLY_RESULTS", payload: checkedResults });
        console.log(selected_results)
    };

    const handleSelectAllCurrentPage = (filterResults) => {
        setSelectAllFilter(!selectAllFilter);

        const initialResults = results;
        const currentFilterResults = filterResults.slice(pageRows * (curPage - 1), pageRows * curPage);
        currentFilterResults.map((filterResult) => {
            const checkedIndex = initialResults.findIndex((result) => result.id === filterResult.id);
            initialResults[checkedIndex].isChecked = !selectAllFilter;
            dispatch({ type: "SELECTED_ALL_RESULTS", payload: initialResults });
        });

        const checkedResults = results.filter((result) => (result.isChecked === true));
        dispatch({ type: "SELECTED_ONLY_RESULTS", payload: checkedResults });
    };

    const handlePageInput = (e) => {
        if (e.target.value > totalPages) {
            setCurPage(totalPages);
        } else if (e.target.value < 1) {
            setCurPage(1);
        } else {
            setCurPage(e.target.value);
        }
    };

    const convertDT = (stringDT) => {
        const datetime = new Date(stringDT).toISOString();
        const date = datetime.substring(0, 10);
        const time = datetime.substring(11, 19);
        return `${date} ${time}`;
    }

    const colSelection = (selected_results) => {
        const returnResults = selected_results.map((item) => {
            return {
                "Customer Name": item.company_name_1,
                "Drawing ID": item.drawing_id,
                "Product Name": item.product_name,
                "Variable Cost": item.variable_cost,
                "Total Man Hours": item.total_man_hours,
                "Manpower Costs": item.total_man_hours,
                "Production Cost": item.total_man_hours,
                "Product Sale Price": item.total_man_hours,
                "Updated At": convertDT(item.updated_at),
                "Created At": convertDT(item.created_at),
            }
        });
        return returnResults;
    }

    // Test
    useEffect(() => {
        console.log(colSelection(selected_results));
    }, [selected_results])

    /* useEffect */
    // Initial Results
    useEffect(() => {
        dispatch({ type: "FETCH_REQUEST" });
        fetch();
    }, []);

    // Total Pages & Total Records
    useEffect(() => {
        const curTotalRecords = filter_results.length;
        setTotalRecords(curTotalRecords);
        setTotalPages(Math.ceil(curTotalRecords / pageRows));
    }, [results, pageRows, curPage, filterObj, filter_results]);

    useEffect(() => {
        if (curPage > totalPages) {
            if (totalPages !== 0) {
                setCurPage(totalPages);
            }
        }
    }, [totalPages, filterObj]);

    // Filtered Results
    useEffect(() => {
        const newResults = results.filter(
            (result) =>
                result.company_name_1.includes(filterObj.customer_name) &&
                (filterObj.customer_approved !== ''
                    ? result.customer_approved === filterObj.customer_approved
                    : true) &&
                result.drawing_id.includes(filterObj.drawing_id) &&
                result.product_name.includes(filterObj.product_name) &&
                (filterObj.start_date !== ''
                    ? new Date(result.created_at) >= new Date(filterObj.start_date)
                    : true) &&
                (filterObj.end_date !== ''
                    ? new Date(result.created_at) <= new Date(filterObj.end_date)
                    : true)
                // (
                //     result.created_at >= filterObj.start_date &&
                //     result.created_at <= filterObj.end_date
                // )
        );
        // console.log(new Date(results[0].created_at) >= new Date(filterObj.start_date))
        dispatch({ type: "FILTER_RESULTS", payload: newResults });

        // Debugging
        // console.log(filterObj);
        // console.log(results);
        // console.log(newResults);
    }, [filterObj]);

    useEffect(() => {
        setSelectAllFilter(false);
    }, [curPage, pageRows, filterObj]);

    /* Custom Properties */
    const currentdate = new Date();
    const currentdatetime = currentdate.getFullYear() + "-"
        + (currentdate.getMonth()+1) + "-"
        + currentdate.getDate() + "_"
        + currentdate.getHours() + "-"
        + currentdate.getMinutes() + "-"
        + currentdate.getSeconds();

    const CSVHeaders = [
        { label: "Customer Name", key: "company_name_1" },
        { label: "Drawing ID", key: "drawing_id" },
        { label: "Product Name", key: "product_name" },
        { label: "Variable Cost", key: "variable_cost" },
        { label: "Total Man Hours", key: "total_man_hours" },
        { label: "Manpower Cost", key: "manpower_cost" },
        { label: "Production Cost", key: "product_cost" },
        { label: "Product Sale Price", key: "product_sale_price" }
    ];

    const ExcelExport = (ExcelData, ExcelFileName) => {
        const ExcelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const ExcelFileExtension = '.xlsx';
        const worksheet = XLSX.utils.json_to_sheet(ExcelData);
        const workbook = { Sheets: { 'Estimated Costs': worksheet }, SheetNames: ['Estimated Costs'] };
        const ExcelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const ExcelBlob = new Blob([ExcelBuffer], { type: ExcelFileType });
        FileSaver.saveAs(ExcelBlob, ExcelFileName + ExcelFileExtension);
    };

    const PDFExport = () => {
        const doc = new jsPDF({
            orientation: "landscape"
        });
        doc.autoTable({
            columns: [
                { header: "Customer Name", dataKey: "company_name_1" },
                { header: "Drawing ID", dataKey: "drawing_id" },
                { header: "Product Name", dataKey: "product_name" },
                { header: "Variable Cost", dataKey: "variable_cost" },
                { header: "Total Man Hours", dataKey: "total_man_hours" },
                { header: "Manpower Cost", dataKey: "manpower_cost" },
                { header: "Production Cost", dataKey: "product_cost" },
                { header: "Product Sale Price", dataKey: "product_sale_price" }
            ],
            body: selected_results,
            theme: 'grid',
            styles: {
                font: 'times',
                textColor: [0, 0, 0],
                cellWidth: 20,
                halign: 'right'
            },
            headStyles: {
                halign: 'center'
            },
            columnStyles: {
                company_name_1: {
                    halign: 'left',
                    cellWidth: 90
                }
            }
        });
        doc.save('pdf.pdf');
    }

    return (
        <>
            <div className="index">
                <div className="index__controller">
                    <button
                        className="addEntry"
                        onClick={() => navigate("/manufacturing/businessinfo/estcost/create")} >
                        Add an entry
                    </button>
                    <button
                        className="returnBack"
                        onClick={() => navigate("/manufacturing/")} >
                        Return back
                    </button>
                </div>
                    <div className="index__content">
                        <div className="index__header">
                        <p>Estimated Cost</p>
                        <div className="refresh">
                            <button className="tooltip bottom" tooltip="Refresh">
                                <CachedIcon onClick={() => refresh()} />
                            </button>
                        </div>
                    </div>
                    <div className="index__body">
                        <div className="index__infobar">
                            <div className="index__infobar__status">
                                <p>{`${curPage} out of ${totalPages} pages`}</p>
                                <p>{`(${selected_results.length} selected out of ${results.length} total records)`}</p>
                                <p>{totalRecords !== results.length && `(filtered ${totalRecords} records)`}</p>
                            </div>
                            <div className="index__infobar__nav">
                                <div className="index__infobar__rows">
                                    <select onChange={(e) => setPageRows(e.target.value)}>
                                        <option value={10}>10 rows</option>
                                        <option value={25}>25 rows</option>
                                        <option value={50}>50 rows</option>
                                        <option value={100}>100 rows</option>
                                    </select>
                                </div>
                                <div className="index__infobar__page">
                                    <KeyboardDoubleArrowLeftIcon
                                        onClick={() => setCurPage(curPage - 5 <= 0 ? 1 : curPage - 5)} />
                                    <KeyboardArrowLeftIcon
                                        onClick={() => setCurPage(curPage - 1 === 0 ? 1 : curPage - 1)} />
                                    <input
                                        id="page"
                                        value={curPage}
                                        onChange={(e) => handlePageInput(e)} />
                                    <KeyboardArrowRightIcon
                                        onClick={() => setCurPage(
                                            curPage + 1 > totalPages ? totalPages : curPage + 1)} />
                                    <KeyboardDoubleArrowRightIcon
                                        onClick={() => setCurPage(
                                            curPage + 5 > totalPages ? totalPages : curPage + 5)} />
                                </div>
                            </div>
                        </div>
                        <div className="index__filterbar">
                            <div className="index__filterbar__header">
                                <div className="index__filterbar__select">
                                    <p onClick={() => handleSelectAll()}>Select All</p>
                                    <p onClick={() => handleDeselectAll()}>Deselect All</p>
                                </div>
                                <div
                                    className={`index__filterbar__clearfilter ${filterBar ? 'show' : ''}`}
                                    onClick={() => setFilterObj(defaultFilterObj)} >
                                    <p>Clear All Filters</p>
                                </div>
                                <div className={`index__filterbar__print ${selected_results.length === 0 ? 'disabled' : ''}`}>
                                    <button
                                        className="tooltip top"
                                        tooltip="Download Excel File"
                                        onClick={() =>
                                            ExcelExport(
                                                colSelection(selected_results),
                                                `estimated-cost_${currentdatetime}`)}>
                                        <img src={excel} alt='excel' />
                                    </button>
                                    <CSVLink
                                        data={selected_results}
                                        headers={CSVHeaders}
                                        filename={`estimated-cost_${currentdatetime}` + '.csv'} >
                                        <button className="tooltip top" tooltip="Download CSV">
                                            <img src={csv} alt='csv' />
                                        </button>
                                    </CSVLink>
                                    <button
                                        className="tooltip top"
                                        tooltip="Download PDF"
                                        onClick={() => PDFExport()} >
                                        <img src={pdf} alt='pdf' />
                                    </button>
                                    <button
                                        className="tooltip top"
                                        tooltip="Print"
                                        onClick={() => setOpen(true)} >
                                        <img src={print} />
                                    </button>
                                </div>
                                <div
                                    className={`index__filterbar__dropdown ${filterBar ? 'showFilterBar' : ''}`}
                                    onClick={() => toggleFilterBar(!filterBar)}>
                                    <p>Filter</p>
                                    <ArrowDropDownIcon />
                                </div>
                            </div>
                            <div className={`index__filterbar__row ${filterBar ? 'show' : ''}`}>
                                <div className="index__filterbar__box">
                                    <label>Customer Approved</label>
                                    <select
                                        value={filterObj.customer_approved}
                                        onChange={(e) => setFilterObj(
                                            { ...filterObj, customer_approved: e.target.value })} >
                                        <option value="">All</option>
                                        <option value="Y">Yes</option>
                                        <option value="NO">No</option>
                                    </select>
                                </div>
                                <div className="index__filterbar__box">
                                    <label>Customer Name</label>
                                    <input
                                        type="text"
                                        placeholder="Customer Name"
                                        value={filterObj.customer_name}
                                        onChange={(e) => setFilterObj({
                                            ...filterObj, customer_name: e.target.value
                                        })} />
                                </div>
                                <div className="index__filterbar__box">
                                    <label>Drawing ID</label>
                                    <input
                                        type="text"
                                        placeholder="Drawing ID"
                                        value={filterObj.drawing_id}
                                        onChange={(e) => setFilterObj({
                                            ...filterObj, drawing_id: e.target.value
                                        })} />
                                </div>
                                <div className="index__filterbar__box">
                                    <label>Product Name</label>
                                    <input
                                        type="text"
                                        placeholder="Product Name"
                                        value={filterObj.product_name}
                                        onChange={(e) => setFilterObj({
                                            ...filterObj, product_name: e.target.value
                                        })} />
                                </div>
                                <div className="index__filterbar__box">
                                    <label>Start Date</label>
                                    <input
                                        type="date"
                                        value={filterObj.start_date}
                                        onChange={(e) => setFilterObj({
                                            ...filterObj, start_date: e.target.value
                                        })}/>
                                </div>
                                <div className="index__filterbar__box">
                                    <label>End Date</label>
                                    <input
                                        type="date"
                                        value={filterObj.end_date}
                                        onChange={(e) => setFilterObj({
                                            ...filterObj, end_date: e.target.value
                                        })}/>
                                </div>
                            </div>
                        </div>
                        <div className="index__table">
                            <div className="index__table__scroll">
                                <div className="index__thead">
                                    <div className="index__td" style={{ width: "50px" }}>
                                        <input
                                            type="checkbox"
                                            id="checkbox"
                                            checked={selectAllFilter}
                                            onChange={() => handleSelectAllCurrentPage(filter_results)} />
                                    </div>
                                    <div className="index__td" style={{ width: "50px" }}>No.</div>
                                    <div className="index__td" style={{ width: "300px" }}>Customer Name</div>
                                    <div className="index__td" style={{ width: "100px" }}>Drawing ID</div>
                                    <div className="index__td" style={{ width: "150px" }}>Product Name</div>
                                    <div className="index__td" style={{ width: "100px" }}>Variable Cost</div>
                                    <div className="index__td" style={{ width: "100px" }}>Total Manhours</div>
                                    <div className="index__td" style={{ width: "120px" }}>In-house Manpower Cost</div>
                                    <div className="index__td" style={{ width: "70px" }}>Product Cost</div>
                                    <div className="index__td" style={{ width: "100px" }}>Product Sale Price</div>
                                    <div className="index__td" style={{ width: "150px" }}>Updated</div>
                                    <div className="index__td" style={{ width: "150px" }}>Created</div>
                                    <div className="index__td" style={{ width: "100px" }}>Customer Approved</div>
                                    <div className="index__td" style={{ width: "100px" }}>Action</div>
                                </div>
                                <div className="index__tbody">
                                    {
                                        loading
                                            ? (<LoadingPage loading={loading} />)
                                            : filter_results.length === 0
                                                ? ( <div className="index__tr">
                                                        <div
                                                            className="index__td"
                                                            style={{ width: "100%", paddingLeft: "20px" }} >
                                                            There is no record
                                                        </div>
                                                    </div>)
                                                : ( filter_results
                                                    .slice(pageRows * (curPage - 1), pageRows * curPage)
                                                    .map((result, index) => (
                                                        <div
                                                            className={`index__tr ${result.isChecked ? 'highlighted' : ''}`}
                                                            key={index}>
                                                            <div className="index__td" style={{ width: "50px" }}>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={result.isChecked}
                                                                    value={result.id}
                                                                    id="checkbox"
                                                                    onChange={() => handleCheckedRows(result.id)} />
                                                            </div>
                                                            <div className="index__td" style={{ width: "50px" }}>
                                                                {(curPage - 1) * pageRows + index + 1}
                                                            </div>
                                                            <div className="index__td" style={{ width: "300px" }}>{result.company_name_1}</div>
                                                            <div className="index__td" style={{ width: "100px" }}>{result.drawing_id}</div>
                                                            <div className="index__td" style={{ width: "150px" }}>{result.product_name}</div>
                                                            <div className="index__td" style={{ width: "100px" }}>{result.variable_cost}</div>
                                                            <div className="index__td" style={{ width: "100px" }}>{result.total_man_hours}</div>
                                                            <div className="index__td" style={{ width: "120px" }}>{result.manpower_cost}</div>
                                                            <div className="index__td" style={{ width: "70px" }}>{result.product_cost}</div>
                                                            <div className="index__td" style={{ width: "100px" }}>{result.product_sale_price}</div>
                                                            <div className="index__td" style={{ width: "150px" }}>{convertDT(result.updated_at)}</div>
                                                            <div className="index__td" style={{ width: "150px" }}>{convertDT(result.created_at)}</div>
                                                            <div className="index__td" style={{ width: "100px" }}>
                                                                <div className="index__td__status">
                                                                    {
                                                                        result.customer_approved === "NO"
                                                                            ? (<p id="not_appr">NOT APPROVED</p>)
                                                                            : (<p id="appr">APPROVED</p>)
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="index__td" style={{ width: "100px" }}>
                                                                <button className="tooltip top" tooltip="View">
                                                                    <RemoveRedEyeIcon
                                                                        id="view"
                                                                        onClick={() =>
                                                                            navigate(`/manufacturing/businessinfo/estcost/view/${result.id}`)} />
                                                                </button>
                                                                {
                                                                    result.customer_approved === "NO"
                                                                    && (
                                                                        <button className="tooltip top" tooltip="Delete">
                                                                            <DeleteIcon
                                                                                id="delete"
                                                                                onClick={() => deleteEntry(result.id)} />
                                                                        </button>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    )))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                open
                && <PrintScreen
                    setOpen={setOpen}
                    results={colSelection(selected_results)} />
            }
        </>
    );
}

export default MF_EstCost_Index;