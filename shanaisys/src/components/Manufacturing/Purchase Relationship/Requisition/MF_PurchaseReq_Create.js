import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'styles/FormTemplate.css';

/* MUI Imports */
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';

function MF_PurchaseReq_Create() {

    /* useNavigate */
    const navigate = useNavigate();

    /* useState */
    const errObj = {};
    const [err, setErr] = useState({});

    /* Functions */
    const save = () => {

    }

    return (
        <div className="form">
            <div className="form__content">
                <div className="form__header">
                    <p>Create an Estimated Cost</p>
                </div>
                <div className="form__body">
                    <div className="form__row">
                        <div className="form__info col_3">
                            <label>Material Name
                                <span className='required'>*</span>
                            </label>
                            <select>
                                <option value='' hidden>Select Material</option>
                                <option value='bolt'>Bolt</option>
                                <option value='nut'>Nut</option>
                                <option value='screw'>Screw</option>
                            </select>
                        </div>
                        <div className="form__info col_3">
                            <label>Material Price</label>
                            <input
                                type='text'
                                placeholder='Enter Price' />
                        </div>
                        <div className="form__info col_3">
                            <label>Quantity</label>
                            <input
                                type='text'
                                placeholder='Enter Qty' />
                        </div>
                        {/* <div className=
                            {`form__info col_1 ${err.customerId && 'error'}`}>
                            <label>Customer Name
                                <span className='required'>*</span>
                            </label>

                            {
                                err.customerId &&
                                <div className="form__info__error">
                                    <ErrorIcon />
                                    <p>{err.customerId}</p>
                                </div>
                            }
                        </div> */}
                    </div>
                    <div className="form__row footer">
                        <button id='save' onClick={() => save()}>SAVE</button>
                        <button
                            id='cancel'
                            onClick={() => navigate('/manufacturing/businessinfo/estcost/index')}>
                            CANCEL
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MF_PurchaseReq_Create;