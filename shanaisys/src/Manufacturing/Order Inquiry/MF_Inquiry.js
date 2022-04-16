import React from 'react';
import { useNavigate } from 'react-router';
import '../FormTemplate.css';

function MF_form() {

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
                            <input type='select' placeholder='--Select--' />
                        </div>
                        <div className="form__info">
                            <label>Input Date</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info">
                            <label>Person In Charge</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                        <div className="form__info">
                            <label>Department Number</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info">
                            <label>Customer</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                        <div className="form__info">
                            <label>Customer Contact Number</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info">
                            <label>Delivery Destination</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                        <div className="form__info">
                            <label>Department Name</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info col_2">
                            <label>Title</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info col_4">
                            <label>Desired Delivery Date</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                        <div className="form__info col_4">
                            <label>Estimated Delivery Date</label>
                            <input type='date' placeholder='--Select--' />
                        </div>
                        <div className="form__info col_4">
                            <label>Amount Type</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                        <div className="form__info col_4">
                            <label>Desired Amount</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info">
                            <label>Remarks</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info">
                            <label>Specifications</label>
                            <input type='select' placeholder='--Select--' />
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

export default MF_form;