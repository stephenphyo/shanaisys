import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

/* Module Imports */

// Manufacturing
import MF_Manufacturing from './Manufacturing/MF_Manufacturing';
import MF_Inquiry from './Manufacturing/MF_Inquiry';
import MF_EstCost from './Manufacturing/MF_EstCost';

/* Component Imports */
import Home from './Home';
import Sidebar from './Sidebar';
import Login from './Login';
import User from './User';
import BusinessReg from './BusinessReg';

/* MUI Imports */
import MenuIcon from '@mui/icons-material/Menu';

function App() {

  /* useState */
  const [sidebar, openSidebar] = useState(true);

  return (
    <Router>
      <div className="app">
        <div className="app__header">
          <div className={`app__header__menu ${sidebar && 'reveal'}`}>
              <button onClick={() => openSidebar(!sidebar)}><MenuIcon /></button>
          </div>
        </div>
        <div className="app__body">
          <Sidebar sidebar={sidebar} />
          <div className="main">
            {/* In react-router-dom v6, "Switch" is replaced by routes "Routes". */}
            <Routes>
              <Route path='/business' element={ <BusinessReg /> }/>
              <Route path='/' element={ <Home /> }/>
              <Route path='/login' element={<Login />} />
              <Route path='/manufacturing' element={ <MF_Manufacturing /> }/>
              <Route path='/manufacturing/inquiry' element={ <MF_Inquiry /> }/>
              <Route path='/manufacturing/estcost' element={ <MF_EstCost /> }/>
            </Routes>
          </div>
          </div>
        </div>
    </Router>
  );
}

export default App;