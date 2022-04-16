import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import './Login.css';

function Login() {

    /* useState */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /* Functions */
    const login = () => {

    }

    return (
        <div className='slogin__container'>
            <div className="slogin__form">
                <div className="slogin__header">
                    <p id='large'>Aoyama Seisakusho Co., Ltd</p>
                    <p id='small'>Login to your account</p>
                </div>
                <div className="slogin__infoBox">
                    <div className="slogin__info">
                        <div className="slogin__info__icon">
                            <PersonIcon />
                        </div>
                        <input
                            type='text'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="slogin__info">
                        <div className="slogin__info__icon">
                            <LockIcon />
                        </div>
                        <input
                            type='password'
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="slogin__remember">
                    <input type='checkbox' />
                    <label>Remember Me</label>
                </div>
                <div className="slogin__button">
                    <button onClick={() => login()}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;