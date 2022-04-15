import React, { useEffect, useState } from 'react';
import './FormTemplate.css';
import './MF_EstCost.css';

/* MUI Imports */
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

function MF_EstCost() {

    /* useState */
    const [customerNum, setCustomerNum] = useState('');
    const [inquiryNum, setInquiryNum] = useState('');
    const [classification, setClassification] = useState('');
    const [drawingNo, setDrawingNo] = useState('');
    const [productName, setProductName] = useState('');
    const [id, setId] = useState(1);

    const initialProcessData = {
        id: id,
        procNum: '',
        MPCost: 0
    }
    const [processArr, setProcessArr] = useState([initialProcessData]);

    /* Functions */
    const addNewProcess = () => {
        setId(id + 1);
        setProcessArr([...processArr, {
            id: id+1,
            procNum: '',
            MPCost: 0
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

    return (
        <div className='form'>
            <div className="form__content">
                <div className="form__header">
                    <p>Create an Estimated Cost</p>
                </div>
                <div className="form__body">
                    <div className="form__row">
                        <div className="form__info col_1">
                            <label>Customer Number</label>
                            <select
                                required
                                onChange={(e) => setCustomerNum(e.target.value)} >
                                <option value='' hidden>
                                    Please select a customer
                                </option>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                            </select>
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info col_4">
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
                        <div className="form__info col_4">
                        <label>Drawing Number</label>
                            <input
                                type='text'
                                placeholder='Drawing No.'
                                onChange={(e) => setDrawingNo(e.target.value)} />
                        </div>
                        <div className="form__info col_4">
                            <label>Product Name</label>
                            <input
                                type='text'
                                placeholder='Product Name'
                                onChange={(e) => setProductName(e.target.value)} />
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info col_2">
                            <label>Updated Date</label>
                            <input
                                type='date' />
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info col_2">
                            <div className="table">
                                <div className="table__row">
                                    <div className="table__row left">
                                        <label>Material Cost</label>
                                    </div>
                                    <div className="table__row right">
                                        <input
                                            type='text' />
                                    </div>
                                </div>
                                <div className="table__row">
                                    <div className="table__row left">
                                        <label>Purchase Cost</label>
                                    </div>
                                    <div className="table__row right">
                                        <input
                                            type='text' />
                                    </div>
                                </div>
                                <div className="table__row">
                                    <div className="table__row left">
                                        <label>Outsourcing Cost</label>
                                    </div>
                                    <div className="table__row right">
                                        <input
                                            type='text' />
                                    </div>
                                </div>
                                <div className="table__row">
                                    <div className="table__row left">
                                        <label>Surface Treatment Cost</label>
                                    </div>
                                    <div className="table__row right">
                                        <input
                                            type='text' />
                                    </div>
                                </div>
                                <div className="table__row">
                                    <div className="table__row left">
                                        <label>Shipping Cost</label>
                                    </div>
                                    <div className="table__row right">
                                        <input
                                            type='text' />
                                    </div>
                                </div>
                                <div className="table__row">
                                    <div className="table__row left">
                                        <label>Variable Cost</label>
                                    </div>
                                    <div className="table__row right">
                                        <input
                                            type='text' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form__info col_2" id='table2'>
                            <div className='table'>
                                <div className='tr'>
                                    <div className='td first'>No.</div>
                                    <div className='td second'>Process Number</div>
                                    <div className='td third'>Manpower Cost</div>
                                    <div className='td fourth'>
                                        <AddCircleIcon
                                            id='add_button'
                                            onClick={(e) => addNewProcess(e)} />
                                    </div>
                                </div>
                                <div className='tbody'>
                                    {
                                        processArr.map((proc, index) => (
                                            <div className="tr">
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
                                                        name='MPCost'
                                                        value={proc.MPCost}
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
                                </div>
                            </div>
                            <div className='table' id='total'>
                                <div className='tr'>
                                    <div className='td fifth'>
                                        <label>Total Time (hr)</label>
                                    </div>
                                    <div className='td fifth'>
                                        <label className='display'>
                                            0.00
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
                                            0.00
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
                                    0.00
                                </label>
                            </div>
                            <div className="form__info col_3">
                                <label>Product Selling Price</label>
                                <label className='display'>
                                    0.00
                                </label>
                            </div>
                            <div className="form__info col_3">
                                <label>Indirect Profit Expenses</label>
                                <label className='display'>
                                    0.00
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form__row footer">
                        <button id='save'>SAVE</button>
                        <button id='cancel'>CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MF_EstCost;