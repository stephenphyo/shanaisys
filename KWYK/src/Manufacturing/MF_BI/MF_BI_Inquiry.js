import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import '../FormTemplate.css';

function MF_form() {

    /* useState */
    const [inquiryDegree, setInquiryDegree] = useState('');
    const [personInCharge, setPersonInCharge] = useState('');
    const [departmentNum, setDepartmentNum] = useState('');
    const [customer, setCustomer] = useState('');
    const [customerContactNum, setCustomerContactNum] = useState('');
    const [deliDes, setDeliDes] = useState('');
    const [deliName, setDeliName] = useState('');
    const [title, setTitle] = useState('');
    const [itemNum, setItemNum] = useState('');
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [amtType, setAmtType] = useState('');
    const [desiredAmt, setDesiredAmt] = useState('');
    const [remarks, setRemarks] = useState('');
    const [specs, setSpecs] = useState('');

    /* useNavigate */
    const navigate = useNavigate();

    return (
        <div className='form'>
            <div className="form__content">
                <div className="form__header">
                    <p>Make an Inquiry</p>
                </div>
                <div className="form__body">
                    <div className="form__row">
                        <div className="form__info">
                            <label>Inquiry Degree</label>
                            <select onChange={(e) => setInquiryDegree(e.target.value)}>
                                <option value='' hidden>--Select--</option>
                                <option value='Op1'>Option 1</option>
                                <option value='Op2'>Option 2</option>
                                <option value='Op3'>Option 3</option>
                            </select>
                        </div>
                        <div className="form__info">
                            <label>Input Date</label>
                            <input type='date'/>
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info">
                            <label>Person In Charge</label>
                            <select onChange={(e) => setPersonInCharge(e.target.value)}>
                                <option value='' hidden>--Please select a Person in Charge--</option>
                                <option value='Op1'>Option 1</option>
                                <option value='Op2'>Option 2</option>
                                <option value='Op3'>Option 3</option>
                            </select>
                        </div>
                        <div className="form__info">
                            <label>Department Number</label>
                            <select onChange={(e) => setDepartmentNum(e.target.value)}>
                                <option value='' hidden>--Please select a Department--</option>
                                <option value='Op1'>Option 1</option>
                                <option value='Op2'>Option 2</option>
                                <option value='Op3'>Option 3</option>
                            </select>
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info">
                            <label>Customer</label>
                            <select onChange={(e) => setCustomer(e.target.value)}>
                                <option value='' hidden>--Please select a Customer--</option>
                                <option value='Op1'>Option 1</option>
                                <option value='Op2'>Option 2</option>
                                <option value='Op3'>Option 3</option>
                            </select>
                        </div>
                        <div className="form__info">
                            <label>Customer Contact Number</label>
                            <input 
                                type='text'
                                onChange={(e) => setCustomerContactNum(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info">
                            <label>Delivery Destination</label>
                            <select onChange={(e) => setDeliDes(e.target.value)}>
                                <option value='' hidden>--Please select a Delivery Destination</option>
                                <option value='Op1'>Option 1</option>
                                <option value='Op2'>Option 2</option>
                                <option value='Op3'>Option 3</option>
                            </select>
                        </div>
                        <div className="form__info">
                            <label>Delivery Name</label>
                            <input 
                                type='text'
                                onChange={(e) => setDeliName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info col_2">
                            <label>Title</label>
                            <input 
                            type='text'
                            onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='form__row'>
                        <div className='form__info col_3'>
                            <label>Item Number</label>
                            <input 
                                type='text'
                                onChange={(e) => setItemNum(e.target.value)}
                            />
                        </div>
                        <div className='form__info col_3'>
                            <label>Item Name</label>
                            <input
                                type= 'text'
                                onChange={(e) => setItemName(e.target.value)}
                            />
                        </div>
                        <div className='form__info col_3'>
                            <label>Quantity</label>
                            <input
                                type= 'text'
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info col_4">
                            <label>Desired Delivery Date</label>
                            <input type='date' />
                        </div>
                        <div className="form__info col_4">
                            <label>Estimated Delivery Date</label>
                            <input type='date' />
                        </div>
                        <div className="form__info col_4">
                            <label>Amount Type</label>
                            <select onChange={(e) => setAmtType(e.target.value)}>
                                <option value='' hidden>--Select--</option>
                                <option value='Op1'>Option 1</option>
                                <option value='Op2'>Option 2</option>
                                <option value='Op3'>Option 3</option>
                            </select>
                        </div>
                        <div className="form__info col_4">
                            <label>Desired Amount</label>
                            <input 
                            type='text'
                            onChange={(e) => setDesiredAmt(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info">
                            <label>Remarks</label>
                            <input 
                                type='text'
                                onChange={(e) => setRemarks(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info">
                            <label>Specifications</label>
                            <input 
                                type='text' 
                                onChange={(e) => setSpecs(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form__row footer">
                        <button id='save'>SAVE</button>
                        <button id='cancel' onClick={() => navigate('/manufacturing')}>CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MF_form;