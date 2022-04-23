import React from 'react';
import { useNavigate } from 'react-router';
import 'styles/FormTemplate.css';

function Home() {

    /* useNavigate */
    const navigate = useNavigate();

    return (
        <div className="form">
            <div className="form__content">
                <div className="form__header">
                    <p>Welcome to Shanaisys Company</p>
                </div>
                <div className="form__body">
                    <div className="form__row" style={{ justifyContent: 'center' }}>
                        We are at your service 😊
                    </div>
                    <label id='footer'style={{position: 'fixed', bottom: '20px', width: '95%', textAlign: 'center' }}>
                        This system is redesigned and developed by
                        <span style={{fontWeight: 'bold', color: 'red'}}> Stephen Phyo</span> with
                        <span style={{fontWeight: 'bold', color: 'green'}}> Steven Chen</span> based on the project of
                        <span style={{fontWeight: 'bold', color: 'magenta'}}> Phyu Phyu Thaw</span>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Home;