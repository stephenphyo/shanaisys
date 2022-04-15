import React from 'react';
import { useNavigate } from 'react-router';
import './Sidebar.css';

/* MUI Imports */
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FactoryIcon from '@mui/icons-material/Factory';
import BusinessIcon from '@mui/icons-material/Business';

function Sidebar({ sidebar }) {

    /* useNavigate */
    const navigate = useNavigate();

    return (
        <div className={`sidebar ${sidebar && 'sidebarOpen'}`}>
            <ul>
                <li id='small' onClick={() => navigate('/')} >
                    <HomeIcon />
                    <p>Home</p>
                </li>
                <li id='small' onClick={() => navigate('/users')}>
                    <GroupsIcon />
                    <p>User Management</p>
                </li>
                <li id='small'><AppRegistrationIcon /> Business Registration</li>
                <li id='big' onClick={() => navigate('/manufacturing')}>
                    <FactoryIcon />
                    <p>Manufacturing Business Production Control</p>
                </li>
                <li id='big'><BusinessIcon /> Service Business Management</li>
            </ul>
        </div>
    );
}

export default Sidebar;