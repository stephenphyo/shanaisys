import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../../utils/Axios";
import { CSVLink } from 'react-csv';
import "../../../IndexTemplate.css";

/* Component Imports */
import LoadingPage from "../../../components/LoadingPage";

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

function MF_ProcessReg_Index() {
    /* useNavigate */
    const navigate = useNavigate("");

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
        customer_name: "",
    });
    const [filterBar, toggleFilterBar] = useState(false);
    const [selectAll, setSelectAll] = useState(false);

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
        Axios.delete(`/manufacturing/prodinfo/processreg/delete/${id}`)
            .then((res) => {
                console.log(res.message);
                console.log(res.error && res.error);
                fetch();
            })
            .catch((err) => {
                console.log(err);
            });
        };

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

    const handleSelectAll = (filterResults) => {
        setSelectAll(!selectAll);

        const initialResults = results;
        const currentFilterResults = filterResults.slice(pageRows * (curPage - 1), pageRows * curPage);
        currentFilterResults.map((filterResult) => {
            const checkedIndex = initialResults.findIndex((result) => result.id === filterResult.id);
            initialResults[checkedIndex].isChecked = !selectAll;
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
                result.customer_approved === filterObj.customer_approved
        );
        dispatch({ type: "FILTER_RESULTS", payload: newResults });

        // Debugging
        // console.log(filterObj);
        // console.log(results);
        // console.log(newResults);
    }, [filterObj]);

    useEffect(() => {
        setSelectAll(false);
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

    return (
        <div className="index">
            <div className="index__controller">
                <button
                    className="addEntry"
                    onClick={() => navigate("/manufacturing/prodinfo/processreg/create")} >
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
                    <div className="index__page__bar">
                        <div className="index__page__show">
                            <p>
                                {`${curPage} out of ${totalPages} pages`}
                                <span>{`(${selected_results.length} out of ${totalRecords} records)`}</span>
                            </p>
                        </div>
                        <div className="index__page__rows">
                            <select onChange={(e) => setPageRows(e.target.value)}>
                                <option value={10}>10 rows</option>
                                <option value={25}>25 rows</option>
                                <option value={50}>50 rows</option>
                                <option value={100}>100 rows</option>
                            </select>
                        </div>
                        <div className="index__page__nav">
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
                    <div className="index__filter__bar">
                        <div className="index__filter__dropdown">
                            <div className="index__print">
                                <button className="tooltip top" tooltip="Download Excel File">
                                    <img src={excel} />
                                </button>
                                <button className="tooltip top" tooltip="Download CSV">
                                    {/* <CSVLink
                                        data={selected_results}
                                        headers={CSVHeaders}
                                        filename={`estimated-cost_${currentdatetime}` + '.csv'} > */}
                                        <img src={csv} />
                                    {/* </CSVLink> */}
                                </button>
                                <button className="tooltip top" tooltip="Download PDF">
                                    <img src={pdf} />
                                </button>
                                <PrintIcon onClick={() => console.log(selected_results)}/>
                            </div>
                            <div
                                className={`index__filter__dropdown__btn ${filterBar ? 'showFilterBar' : ''}`}
                                onClick={() => toggleFilterBar(!filterBar)}>
                                <p>Filter</p>
                                <ArrowDropDownIcon />
                            </div>
                        </div>
                        {
                            filterBar && (
                                <>
                                    <div className="index__filter__row">
                                        <div className="index__filter__box">
                                            <label>Customer Approved</label>
                                            <select
                                                onChange={(e) => setFilterObj(
                                                    { ...filterObj, customer_approved: e.target.value })}>
                                                <option value="" hidden>
                                                    Approved?
                                                </option>
                                                <option value="Y">Yes</option>
                                                <option value="NO">No</option>
                                            </select>
                                        </div>
                                        <div className="index__filter__box">
                                            <label>Customer Name</label>
                                            <input
                                                type="text"
                                                placeholder="Customer Name"
                                                value={filterObj.customer_name}
                                                onChange={(e) => setFilterObj({
                                                    ...filterObj, customer_name: e.target.value
                                                })} />
                                        </div>
                                    </div>
                                    <div className="index__filter__row">
                                        <div className="index__filter__box">
                                            <label>Customer Approved</label>
                                            <select
                                                onChange={(e) => setFilterObj(
                                                    { ...filterObj, customer_approved: e.target.value })}>
                                                <option value="" hidden>
                                                    Approved?
                                                </option>
                                                <option value="Y">Yes</option>
                                                <option value="NO">No</option>
                                            </select>
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
                                        checked={selectAll}
                                        onChange={() => handleSelectAll(filter_results)} />
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

export default MF_ProcessReg_Index;