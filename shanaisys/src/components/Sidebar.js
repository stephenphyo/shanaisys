import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './Sidebar.css';

/* MUI Imports */
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FactoryIcon from '@mui/icons-material/Factory';
import BusinessIcon from '@mui/icons-material/Business';

function Sidebar({ sidebar }) {

    /* useNavigate */
    const navigate = useNavigate();

    /* useState */
    const [active, setActive] = useState(1);

    return (
        <div className={`sidebar ${sidebar && 'sidebarOpen'}`}>
            <ul>
                <li
                    className={active === 1 && 'selected'}
                    id='small'
                    onClick={() => { navigate('/'); setActive(1) }} >
                    <HomeIcon />
                    <p>Home</p>
                </li>
                <li
                    className={active === 2 && 'selected'}
                    id='small'
                    onClick={() => { navigate('/users'); setActive(2) }}>
                    <GroupsIcon />
                    <p>User Management</p>
                </li>
                <li
                    className={active === 3 && 'selected'}
                    id='small'
                    onClick={() => { navigate('/manufacturing'); setActive(3) }}>
                    <AppRegistrationIcon />
                    <p>Business Registration</p>
                </li>
                <li
                    className={active === 4 && 'selected'}
                    id='big'
                    onClick={() => { navigate('/manufacturing'); setActive(4) }}>
                    <FactoryIcon />
                    <p>Manufacturing Business Production Control</p>
                </li>
                <li
                    className={active === 5 && 'selected'}
                    id='big'
                    onClick={() => { navigate('/manufacturing'); setActive(5) }}>
                    <BusinessIcon />
                    <p>Service Business Management</p>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;