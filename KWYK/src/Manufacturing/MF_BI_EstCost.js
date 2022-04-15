import React, { useState } from 'react';
import './FormTemplate.css';

function MF_EstCost() {

    /* useState */
    const [productname, setProductName] = useState('');

  return (
    // BEM
    <div className='form'>
        <div className='form__content'>
            <div className='form__header'>
                <p>Estimated Cost</p>
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
                        </select>
                    </div>
                </div>
                <div className='form__row'>
                    <div className='form__info col_4'>
                        <label>Inquiry Number</label>
                        <select>
                            <option>Option 1</option>
                            <option>Option 2</option>
                        </select>
                    </div>
                    <div className='form__info col_4'>
                        <label>Parent-Child Classification</label>
                        <select>
                            <option>Option 1</option>
                            <option>Option 2</option>
                        </select>
                    </div>
                    <div className='form__info col_4'>
                        <label>Drawing Number</label>
                        <input 
                            type='text' 
                            placeholder='Number'
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
                    <button id='cancel'>CANCEL</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default MF_EstCost;