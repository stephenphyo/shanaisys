import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import '../FormTemplate.css';

function MF_EstCost() {

    /* useState */
    const [customerName, setCustomerName] = useState('');
    const [inquiryNum, setInquiryNum] = useState('');
    const [parentChildClass, setParentChildClass] = useState('');
    const [drawingName, setDrawingNum] = useState('');
    const [productName, setProductName] = useState('');

    /* useNavigate */
    const navigate = useNavigate();

  return (
    
    <div className='form'>
        <div className='form__content'>
            <div className='form__header'>
                <p>Estimated Cost</p>
            </div>
            <div className='form__body'>
                <div className='form__row'>
                    <div className='form__info col_1'>
                        <label>Customer Number</label>
                        <select onChange={(e) => setCustomerName(e.target.value)}>
                            <option value='' hidden>--Please select a Customer--</option>
                            <option value='Op1'>Option 1</option>
                            <option value='Op2'>Option 2</option>
                            <option value='Op3'>Option 3</option>
                        </select>
                    </div>
                </div>
                <div className='form__row'>
                    <div className='form__info col_4'>
                        <label>Inquiry Number</label>
                        <select onChange={(e) => setInquiryNum(e.target.value)}>
                            <option value='' hidden>--Select Inquiry--</option>
                            <option value='Op1'>Option 1</option>
                            <option value='Op2'>Option 2</option>
                            <option value='Op3'>Option 3</option>
                        </select>
                    </div>
                    <div className='form__info col_4'>
                        <label>Parent-Child Classification</label>
                        <select onChange={(e) => setParentChildClass(e.target.value)}>
                            <option value='' hidden>--Select--</option>
                            <option value='Op1'>Option 1</option>
                            <option value='Op2'>Option 2</option>
                            <option value='Op3'>Option 3</option>
                        </select>
                    </div>
                    <div className='form__info col_4'>
                        <label>Drawing Number</label>
                        <input 
                            type='text' 
                            placeholder='Drawing Number'
                            onChange={(e) => setDrawingNum(e.target.value)}
                        />
                    </div>
                    <div className='form__info col_4'>
                        <label>Product Name</label>
                        <input 
                            type='text' 
                            placeholder='Product Name'
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                </div>
                <div className='form__row'>
                    <div className='form__info col_2'>
                        <label>Update Date</label>
                        <input type='date' />
                    </div>
                </div>
                <div className="form__row footer">
                    <button id='save'>SAVE</button>
                    <button id= 'cancel' onClick={() => navigate('../manufacturing')}>CANCEL</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default MF_EstCost;