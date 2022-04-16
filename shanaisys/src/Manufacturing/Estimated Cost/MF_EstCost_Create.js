import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from '../../utils/Axios';
import '../FormTemplate.css';
import './MF_EstCost_Create.css';

/* MUI Imports */
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';

function MF_EstCost_Create() {

    /* useNavigate */
    const navigate = useNavigate();

    /* useState */
    const [customerNum, setCustomerNum] = useState('');
    const [inquiryNum, setInquiryNum] = useState('');
    const [classification, setClassification] = useState('');
    const [drawingNum, setDrawingNum] = useState('');
    const [productName, setProductName] = useState('');
    const [date, setDate] = useState('');
    const [id, setId] = useState(1);

    const initialProcessData = {
        id: id,
        procNum: '',
        duration: ''
    }
    const [processArr, setProcessArr] = useState([initialProcessData]);
    const [costObj, setCostObj] = useState({
        "cst_mat": 0, "cst_pur": 0, "cst_out": 0, "cst_sur": 0, "cst_ship": 0
    });
    const [varCost, setVarCost] = useState(0);
    const [totalHrs, setTotalHrs] = useState(0);
    const [manpowerCost, setManpowerCost] = useState(0);
    const [prodCost, setProdCost] = useState(0);
    const [salePrice, setSalePrice] = useState(0);

    const errObj = {};
    const [err, setErr] = useState({});

    /* Scroll to Bottom */
    const messagesEndRef = useRef(null);
    // const scrollToBottom = () => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    // }
    // useEffect(() => {
    //     scrollToBottom()
    // }, );

    /* Functions */
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    const round5 = (num) => Math.round(num * 100000 + Number.EPSILON) / 100000;

    /* useEffect */
    useEffect(() => {
        setVarCost(
            round5(
                parseFloat(costObj.cst_mat === '' ? 0 : costObj.cst_mat) +
                parseFloat(costObj.cst_pur === '' ? 0 : costObj.cst_pur) +
                parseFloat(costObj.cst_out === '' ? 0 : costObj.cst_out) +
                parseFloat(costObj.cst_sur === '' ? 0 : costObj.cst_sur) +
                parseFloat(costObj.cst_ship === '' ? 0 : costObj.cst_ship)
            )
        )
    }, [costObj]);


    useEffect(() => {
        const curTotalHrs = processArr.reduce((prev, cur) =>
            round2(prev + parseFloat(cur.duration === '' ? 0 : cur.duration)), 0)

        setTotalHrs(curTotalHrs);
        setManpowerCost(curTotalHrs * 5000);
    }, [processArr]);

    useEffect(() => {
        setProdCost(varCost + manpowerCost);
        setSalePrice(prodCost * 1.25);
    }, [manpowerCost, varCost, prodCost]);


    useEffect(() => {
        // checkError();
        setErr({});
    }, [customerNum, inquiryNum, drawingNum,
        productName, date]);

    /* Error Checking */
    const checkError = () => {
        if (customerNum === '') {
            errObj['customerNum'] = 'Please select a customer number'
        }
        if (inquiryNum === '') {
            errObj['inquiryNum'] = 'Please select an quiry number'
        }
        if (drawingNum === '') {
            errObj['drawingNum'] = 'Please enter drawing number'
        }
        if (productName === '') {
            errObj['productName'] = 'Please enter product name'
        }
        if (date === '') {
            errObj['date'] = 'Please choose a date'
        }
    }

    /* Handlers */
    const addNewProcess = () => {
        setId(id + 1);
        setProcessArr([...processArr, {
            id: id+1,
            procNum: '',
            duration: ''
        }]);
    }

    const delProcess = (curId) => {
        const newProcessArr = processArr.filter((proc) => proc.id !== curId);
        setProcessArr(newProcessArr);
    }

    const editProcess = (event, curId) => {
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newProcessData = processArr.find((proc) => proc.id === curId);
        newProcessData[fieldName] = fieldValue;

        const newProcessArr = [...processArr];
        const curIndex = processArr.findIndex((proc) => proc.id === curId);
        newProcessArr[curIndex] = newProcessData;

        setProcessArr(newProcessArr);
    }

    const editCost = (event) => {
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newCostObj = { ...costObj };
        newCostObj[fieldName] = fieldValue;

        setCostObj(newCostObj);
    }

    const save = () => {
        checkError();

        if (Object.keys(errObj).length === 0) {
            const result = {
                customerNum: customerNum,
                inquiryNum: inquiryNum,
                classification: classification,
                drawingNum: drawingNum,
                productName: productName,
                varCost: varCost,
                totalHrs: totalHrs,
                manpowerCost: manpowerCost,
                prodCost: prodCost,
                updatedDate: date,
                cost: costObj
            }

            Axios
                .post('/manufacturing/estcost/create', result)
                .then((res) => {
                    console.log(res);
                    navigate('/manufacturing/estcost/view');
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            setErr(errObj);
        }
    }

    return (
        <div className='form'>
            <div className="form__content">
                <div className="form__header">
                    <p>Create an Estimated Cost</p>
                </div>
                <div className="form__body">
                    <div className="form__row">
                    <div className=
                            {`form__info col_1 ${err.customerNum && 'error'}`}>
                            <label>Customer Number
                                <span className='required'>*</span>
                            </label>
                            <select
                                required
                                onChange={(e) => setCustomerNum(e.target.value)} >
                                <option value='' hidden>
                                    Please select a customer
                                </option>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                            </select>
                            {
                                err.customerNum &&
                                <div className="form__info__error">
                                    <ErrorIcon />
                                    <p>{err.customerNum}</p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="form__row">
                        <div className=
                            {`form__info col_4 ${err.inquiryNum && 'error'}`}>
                            <label>Inquiry Number</label>
                            <select
                                required
                                onChange={(e) => setInquiryNum(e.target.value)} >
                                <option value='' hidden>
                                    Select Inquiry
                                </option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                            </select>
                            {
                                err.inquiryNum &&
                                <div className="form__info__error">
                                    <ErrorIcon />
                                    <p>{err.inquiryNum}</p>
                                </div>
                            }
                        </div>
                        <div className="form__info col_4">
                            <label id='red'>Parent-Child Classification</label>
                            <select
                                required
                                onChange={(e) => setClassification(e.target.value)} >
                                <option value='' hidden>
                                    Select
                                </option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                            </select>
                        </div>
                        <div className=
                            {`form__info col_4 ${err.drawingNum && 'error'}`}>
                            <label>Drawing Number
                                <span className='required'>*</span>
                            </label>
                            <input
                                type='text'
                                placeholder='Drawing No.'
                                onChange={(e) => setDrawingNum(e.target.value)} />
                            {
                                err.drawingNum &&
                                <div className="form__info__error">
                                    <ErrorIcon />
                                    <p>{err.drawingNum}</p>
                                </div>
                            }
                        </div>
                        <div className=
                            {`form__info col_4 ${err.productName && 'error'}`}>
                            <label>Product Name
                                <span className='required'>*</span>
                            </label>
                            <input
                                type='text'
                                placeholder='Product Name'
                                onChange={(e) => setProductName(e.target.value)} />
                            {
                                err.productName &&
                                <div className="form__info__error">
                                    <ErrorIcon />
                                    <p>{err.productName}</p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="form__row">
                    <div className=
                            {`form__info col_2 ${err.date && 'error'}`}>
                            <label>Updated Date</label>
                            <input
                                type='date'
                                onChange={(e) => setDate(e.target.value)} />
                            {
                                err.date &&
                                <div className="form__info__error">
                                    <ErrorIcon />
                                    <p>{err.date}</p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info col_2">
                            <div className="table">
                                <div className="tr">
                                    <div className="tr left">
                                        <label>Material Cost</label>
                                    </div>
                                    <div className="tr right">
                                        <div className='currency'>
                                            <span>¥
                                                <input
                                                    type='text'
                                                    name='cst_mat'
                                                    placeholder='0.00'
                                                    maxLength={12}
                                                    onChange={(e) => editCost(e)} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="tr">
                                    <div className="tr left">
                                        <label>Purchase Cost</label>
                                    </div>
                                    <div className="tr right">
                                        <div className='currency'>
                                            <span>¥
                                                <input
                                                    type='text'
                                                    name='cst_pur'
                                                    placeholder='0.00'
                                                    maxLength={12}
                                                    onChange={(e) => editCost(e)} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="tr">
                                    <div className="tr left">
                                        <label>Outsourcing Cost</label>
                                    </div>
                                    <div className="tr right">
                                        <div className='currency'>
                                            <span>¥
                                                <input
                                                    type='text'
                                                    name='cst_out'
                                                    placeholder='0.00'
                                                    maxLength={12}
                                                    onChange={(e) => editCost(e)} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="tr">
                                    <div className="tr left">
                                        <label>Surface Treatment Cost</label>
                                    </div>
                                    <div className="tr right">
                                        <div className='currency'>
                                            <span>¥
                                                <input
                                                    type='text'
                                                    name='cst_sur'
                                                    placeholder='0.00'
                                                    maxLength={12}
                                                    onChange={(e) => editCost(e)} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="tr">
                                    <div className="tr left">
                                        <label>Shipping Cost</label>
                                    </div>
                                    <div className="tr right">
                                        <div className='currency'>
                                            <span>¥
                                                <input
                                                    type='text'
                                                    name='cst_ship'
                                                    placeholder='0.00'
                                                    maxLength={12}
                                                    onChange={(e) => editCost(e)} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="tr">
                                    <div className="tr left">
                                        <label>Variable Cost</label>
                                    </div>
                                    <div className="tr right">
                                        <label className='display'>
                                            <span>¥</span>
                                            {varCost}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form__info col_2" id='table2'>
                            <div className='table'>
                                <div className='thead'>
                                    <div className='td first'>No.</div>
                                    <div className='td second'>Process Number</div>
                                    <div className='td third'>Estimated Duration</div>
                                    <div className='td fourth'>
                                        <AddCircleIcon
                                            id='add_button'
                                            onClick={(e) => addNewProcess(e)} />
                                    </div>
                                </div>
                                <div className='tbody'>
                                    {
                                        processArr.map((proc, index) => (
                                            <div className="tr" key={index}>
                                                <div className="td first">{index+1}</div>
                                                <div className="td second">
                                                    <select
                                                        required
                                                        name='procNum'
                                                        value={proc.procNum}
                                                        onChange={(e) => editProcess(e, proc.id)} >
                                                        <option value='' hidden>Select Number</option>
                                                        <option value='p1'>Process 1</option>
                                                        <option value='p2'>Process 2</option>
                                                        <option value='p3'>Process 3</option>
                                                    </select>
                                                </div>
                                                <div className="td third">
                                                    <input
                                                        type='text'
                                                        name='duration'
                                                        placeholder='0'
                                                        value={proc.duration}
                                                        onChange={(e) => editProcess(e, proc.id)} />
                                                </div>
                                                <div className="td fourth">
                                                    <DeleteIcon
                                                        id='del_button'
                                                        onClick={() => delProcess(proc.id)} />
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>
                            <div className='table'>
                                <div className='tr'>
                                    <div className='td fifth'>
                                        <label>Total Time (hr)</label>
                                    </div>
                                    <div className='td fifth'>
                                        <label className='display'>
                                            {totalHrs}
                                            {/* {processArr.reduce((prev, cur) =>
                                                round2(prev + parseFloat(cur.duration === '' ? 0 : cur.duration)), 0)} */}
                                        </label>
                                    </div>
                                </div>
                                <div className='tr'>
                                    <div className='td sixth'>
                                        <label>Amount (rate/hr)</label>
                                    </div>
                                    <div className='td sixth'>
                                        <label>¥ 5000 / hr</label>
                                    </div>
                                    <div className='td fifth'>
                                        <label className='display'>
                                            <span>¥</span>{manpowerCost}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info col_2">
                            <label>Special Note</label>
                            <input
                                type='text'
                                placeholder='Special Note' />
                        </div>
                        <div className="form__info col_2">
                            <label>Multiplication Rate</label>
                            <input
                                type='text'
                                placeholder='Rate' />
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__row__right">
                            <div className="form__info col_3">
                                <label>Production Cost</label>
                                <label className='display'>
                                    <span>¥</span>
                                    {prodCost}
                                </label>
                            </div>
                            <div className="form__info col_3">
                                <label>Product Sale Price</label>
                                <label className='display'>
                                    <span>¥</span>
                                    {salePrice}
                                </label>
                            </div>
                            <div className="form__info col_3">
                                <label>Indirect Profit Expenses</label>
                                <label className='display'>
                                    <span>¥</span>
                                    {salePrice}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form__row footer">
                        <button id='save' onClick={() => save()}>SAVE</button>
                        <button id='cancel' onClick={() => navigate('/manufacturing/estcost/view')}>CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MF_EstCost_Create;