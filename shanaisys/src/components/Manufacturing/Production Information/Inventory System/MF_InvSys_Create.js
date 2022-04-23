import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import 'styles/FormTemplate.css';

/* Utility Imports */
import Axios from 'utils/Axios';

function MF_InvSys_Create() {

    /* useNavigate */
    const navigate = useNavigate();

    /* useState */
    const [drawingNum, setDrawingNum]= useState('');
    const [stockQty, setStockQty]= useState('');

    return (
        <div className='form'>
            <div className='form__content'>
                <div className='form__header'>
                    <p>Create Inventory</p>
                </div>
                <div className='form__body'>
                    <div className='form__row'>
                        <div className='form__info col_1'>
                            <label>Drawing Number</label>
                            <select
                                // defaultValue={drawingNum}
                                onChange={(e) => setDrawingNum(e.target.value)}>
                                <option value='' hidden>--Please select a Drawing Number--</option>
                                <option value='Option'>Option 1</option>
                                <option value='Option2'>Option 2</option>
                                <option value='Option3'>Option 3</option>
                            </select>
                        </div>
                    </div>
                    <div className='form__row'>
                        <div className='form__info col_1'>
                            <label>Stock Quantity</label>
                            <input type='text' onChange={(e) => setStockQty(e.target.value)} />
                        </div>
                    </div>
                    <div className="form__row footer">
                        <button id='save'>SAVE</button>
                        <button id='cancel' onClick={() => navigate('../manufacturing')}>CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MF_InvSys_Create;