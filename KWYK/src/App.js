/* Module Imports */
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Manufacturing
import MF_Manufacturing from './Manufacturing/MF_Manufacturing';
import MF_BI_Inquiry from './Manufacturing/MF_BI_Inquiry';
import MF_BI_EstCost from './Manufacturing/MF_BI_EstCost';
import MF_BI_EstInput from './Manufacturing/MF_BI_EstInput';
import MF_BI_OrdEntry from './Manufacturing/MF_BI_OrdEntry';
import MF_PI_InvSys from './Manufacturing/MF_PI_InvSys';
import MF_PI_ProdProcReg from './Manufacturing/MF_PI_ProductProcessReg';

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
              <Route path='/manufacturing/business-info/inquiry' element={ <MF_BI_Inquiry /> }/>
              <Route path='/manufacturing/business-info/estcost' element={ <MF_BI_EstCost /> }/>
              <Route path='/manufacturing/business-info/estinput' element={ <MF_BI_EstInput /> }/>
              <Route path='/manufacturing/business-info/orderentry' element={ <MF_BI_OrdEntry /> }/>
              <Route path='/manufacturing/production-info/invsys' element={ <MF_PI_InvSys /> }/>
              <Route path='/manufacturing/production-info/prodprocessregist' element={ <MF_PI_ProdProcReg /> }/>
            </Routes>
          </div>
          </div>
        </div>
    </Router>
  );
}

export default App;