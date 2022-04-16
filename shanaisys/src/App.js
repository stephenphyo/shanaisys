import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

/* Module Imports */

// Manufacturing
import MF_Manufacturing from './Manufacturing/MF_Manufacturing';
import MF_Inquiry from './Manufacturing/Order Inquiry/MF_Inquiry';
import MF_EstCost_Create from './Manufacturing/Estimated Cost/MF_EstCost_Create';
import MF_EstCost_View from './Manufacturing/Estimated Cost/MF_EstCost_View';

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
              <Route path='/manufacturing/estcost/create' element={ <MF_EstCost_Create /> }/>
              <Route path='/manufacturing/estcost/view' element={ <MF_EstCost_View /> }/>
            </Routes>
          </div>
          </div>
        </div>
    </Router>
  );
}

export default App;