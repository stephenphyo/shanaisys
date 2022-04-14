import React, { useState } from 'react';
import './Header.css';

/* MUI Imports */
import MenuIcon from '@mui/icons-material/Menu';

function Header({sidebar, openSidebar}) {

  return (
    <div className='header'>
          <div className='header__menu'>
            <button onClick={() => openSidebar(!sidebar)}><MenuIcon /></button>
          </div>
    </div>
  )
}

export default Header;