import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../../utils/Axios";
import { CSVLink } from 'react-csv';
import { saveAs as FileSaver }  from 'file-saver';
import * as XLSX from 'xlsx';
import "../../../IndexTemplate.css";

/* Component Imports */
import LoadingPage from "../../../components/LoadingPage";

/* Icons Export */
import excel from "../../../icons/EXCEL256.png";
import csv from "../../../icons/CSV256.png";
import pdf from "../../../icons/PDF256.png";

/* MUI Imports */
import CachedIcon from "@mui/icons-material/Cached";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PrintIcon from '@mui/icons-material/Print';

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

    /* useState */
    const [pageRows, setPageRows] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [curPage, setCurPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filterObj, setFilterObj] = useState({
        customer_name: '', customer_approved: '',
        drawing_id: '', product_name: ''
    });
    const [filterBar, toggleFilterBar] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectAllFilter, setSelectAllFilter] = useState(false);

    /* Functions */
    const fetch = async() => {
        Axios.get("/manufacturing/estcost/index")
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
        Axios.delete(`/manufacturing/estcost/delete/${id}`)
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

    const handleSelectAllFilter = (filterResults) => {
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
                result.product_name.includes(filterObj.product_name)
        );
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
    let currentdate = new Date();
    let currentdatetime = currentdate.getFullYear() + "-"
        + (currentdate.getMonth()) + "-"
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


    return (
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
                            <div className="index__filterbar__print">
                                <button
                                    className="tooltip top"
                                    tooltip="Download Excel File"
                                    onClick={() =>
                                        ExcelExport(
                                            selected_results,
                                            `estimated-cost_${currentdatetime}`)}>
                                    <img src={excel} />
                                </button>
                                <CSVLink
                                    data={selected_results}
                                    headers={CSVHeaders}
                                    filename={`estimated-cost_${currentdatetime}` + '.csv'} >
                                    <button className="tooltip top" tooltip="Download CSV">
                                        <img src={csv} />
                                    </button>
                                </CSVLink>
                                <button className="tooltip top" tooltip="Download PDF">
                                    <img src={pdf} />
                                </button>
                                <PrintIcon onClick={() => console.log(selected_results)}/>
                            </div>
                            <div
                                className={`index__filterbar__dropdown ${filterBar ? 'showFilterBar' : ''}`}
                                onClick={() => toggleFilterBar(!filterBar)}>
                                <p>Filter</p>
                                <ArrowDropDownIcon />
                            </div>
                        </div>
                        {
                            filterBar && (
                                <>
                                    <div className="index__filterbar__row">
                                        <div className="index__filterbar__box">
                                            <label>Customer Approved</label>
                                            <select
                                                onChange={(e) => setFilterObj(
                                                    { ...filterObj, customer_approved: e.target.value })}>
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
                                    </div>
                                </>
                            )
                        }
                    </div>
                    <div className="index__table">
                        <div className="index__table__scroll">
                            <div className="index__thead">
                                <div className="index__td" style={{ width: "50px" }}>
                                    <input
                                        type="checkbox"
                                        id="checkbox"
                                        checked={selectAllFilter}
                                        onChange={() => handleSelectAllFilter(filter_results)} />
                                </div>
                                <div className="index__td" style={{ width: "50px" }}>No.</div>
                                <div className="index__td" style={{ width: "300px" }}>Customer Name</div>
                                <div className="index__td" style={{ width: "100px" }}>Drawing ID</div>
                                <div className="index__td" style={{ width: "150px" }}>Product Name</div>
                                <div className="index__td" style={{ width: "100px" }}>Variable Cost</div>
                                <div className="index__td" style={{ width: "100px" }}>Total Manhours</div>
                                <div className="index__td" style={{ width: "120px" }}>In-house Manpower Cost</div>
                                <div className="index__td" style={{ width: "100px" }}>Product Cost</div>
                                <div className="index__td" style={{ width: "100px" }}>Product Sale Price</div>
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
                                            : (filter_results
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
                                                        <div className="index__td" style={{ width: "100px" }}>{result.product_cost}</div>
                                                        <div className="index__td" style={{ width: "100px" }}>{result.product_sale_price}</div>
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
                                                ))
                                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MF_EstCost_Index;