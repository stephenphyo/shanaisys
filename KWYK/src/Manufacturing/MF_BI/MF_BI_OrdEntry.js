import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import '../FormTemplate.css';

function MF_OrdEntry() {

    /* useNavigate */
    const navigate = useNavigate();
    
    const [value]= useState('default');
  return (
    <div className='form'>
        <div className='form__content'>
            <div className='form__header'>
                <p>Create an Order</p>
            </div>
            <div className='form__body'>
                <div className='form__row'>
                    <div className='form__info col_3'>
                        <label>Customer Number</label>
                        <select defaultValue={value}>
                            <option value='default' disabled hidden>--Please select a Customer--</option>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </select>
                    </div>
                    <div className='form__info col_3'>
                        <label>Slip No.</label>
                        <input type='text'/>
                    </div>
                    <div className='form__info col_3'>
                        <label>Order Date</label>
                        <input type='date'/>
                    </div>
                </div>
                <div className='form__row'>
                    <div className='form__info col_2'>
                        <label>Person in charge Number</label>
                        <select defaultValue={value}>
                            <option value='default' disabled hidden>--Please select a Person in Charge--</option>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </select>
                    </div>
                    <div className='form__info col2'>
                        <label>Department Number</label>
                        <input type='text'/>
                    </div>
                </div>
                <div className='form__row'>
                    <div className='form__info col_1'>
                        <label>Remarks</label>
                        <input type='text'/>
                    </div>
                </div>
                <div className="form__row footer">
                    <button id='save'>SAVE</button>
                    <button id= 'cancel' onClick={() => navigate('../manufacturing')}>CANCEL</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MF_OrdEntry