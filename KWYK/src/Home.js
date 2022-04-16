import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './Home.css';

/* MUI Imports */
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FactoryIcon from '@mui/icons-material/Factory';
import BusinessIcon from '@mui/icons-material/Business';

function Inquiry() {

    /* useNavigate */
    const navigate = useNavigate();

    return (
        <div className='home'>
            <div className="home__content">
                <div className="home__header">
                    <p>Make an Inquiry</p>
                </div>
                <div className="home__body">
                    <div className="home__row">
                        <div className="home__info">
                            <label>Inquiry Degree</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                        <div className="home__info">
                            <label>Input Date</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                    </div>
                    <div className="home__row">
                        <div className="home__info">
                            <label>Person In Charge</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                        <div className="home__info">
                            <label>Department Number</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                    </div>
                    <div className="home__row">
                        <div className="home__info">
                            <label>Customer</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                        <div className="home__info">
                            <label>Customer Contact Number</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                    </div>
                    <div className="home__row">
                        <div className="home__info">
                            <label>Delivery Destination</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                        <div className="home__info">
                            <label>Department Name</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                    </div>
                    <div className="home__row">
                        <div className="home__info">
                            <label>Title</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                    </div>
                    <div className="home__row">
                        <div className="home__info">
                            <label>Desired Delivery Date</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                        <div className="home__info">
                            <label>Estimated Delivery Date</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                        <div className="home__info">
                            <label>Amount Type</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                        <div className="home__info">
                            <label>Desired Amount</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                    </div>
                    <div className="home__row">
                        <div className="home__info">
                            <label>Remarks</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                    </div>
                    <div className="home__row">
                        <div className="home__info">
                            <label>Specifications</label>
                            <input type='select' placeholder='--Select--' />
                        </div>
                    </div>
                    <div className="home__row footer">
                        <button id='save'>SAVE</button>
                        <button id='cancel'>CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inquiry;