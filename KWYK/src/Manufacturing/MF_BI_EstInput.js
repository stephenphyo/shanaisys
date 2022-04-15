import React from 'react';
import './FormTemplate.css';

function MF_EstInput() {
  return (
    <div className='form'>
        <div className='form__content'>
            <div className='form__header'>
                <p>Create a quote</p>
            </div>
            <div className='form__body'>
                <div className='form__row'>
                    <div className='form__info col_1'>
                        <label>Customer Number</label>
                        <select>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                        <option>Option 4</option>
                        <option>Option 5</option>
                        </select>
                    </div>
                </div>  
                <div className='form__row'>
                    <div className='form__info col_4'>
                        <label>Department in charge</label>
                        <input type='text'/>
                    </div>
                    <div className='form__info col_4'>
                        <label>Delivery date (after receiving an order)</label>
                        <input type='date'/>
                    </div>
                    <div className='form__info col_4'>
                        <label>Payment Terms</label>
                        <input type='text'/>
                    </div>
                    <div className='form__info col_4'>
                        <label>Estimated expiration date</label>
                        <input type='date'/>
                    </div>
                </div>
                <div className='form__row'>
                    <div className='form__info col_4'>
                        <label>Delivery Place</label>
                        <input type='text'/>
                    </div>
                    <div className='form__info col_4'>
                        <label>Construction Number</label>
                        <input type='text'/>
                    </div>
                    <div className='form__info col_4'>
                        <label>Request Number</label>
                        <input type='text'/>
                    </div>
                    <div className='form__info col_4'>
                        <label>Person in charge Number</label>
                        <select>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                            <option>Option 4</option>
                            <option>Option 5</option>
                        </select>
                    </div>
                </div>
                <div className='form__row'>
                    <div className='form__info col_1'>
                        <label>Description</label>
                        <input type='text'/>
                    </div>
                </div>
                <div className="form__row footer">
                    <button id='save'>SAVE</button>
                    <button id='cancel'>CANCEL</button>
                </div>
            </div>
        </div>
        <div className='form__content'>
            <div className='form__header'>
                <p>Show all product original costs</p>
            </div>
            <div className='form__body'>
                
            </div>
        </div>
    </div>
  );
}

export default MF_EstInput;