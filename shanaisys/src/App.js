import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

/* Module Imports */

// Manufacturing
import MF_Manufacturing from 'components/Manufacturing/MF_Manufacturing';
import MF_Inquiry from 'components/Manufacturing/Business Information/Order Inquiry/MF_Inquiry';
import MF_EstCost_Create from 'components/Manufacturing/Business Information/Estimated Cost/MF_EstCost_Create';
import MF_EstCost_Index from 'components/Manufacturing/Business Information/Estimated Cost/MF_EstCost_Index';
import MF_EstCost_View from 'components/Manufacturing/Business Information/Estimated Cost/MF_EstCost_View';

import MF_EstInput_Index from 'components/Manufacturing/Business Information/Estimated Input/MF_EstInput_Index';

import MF_InvSys_Create from 'components/Manufacturing/Production Information/Inventory System/MF_InvSys_Create';

import MF_ProcessReg_Create from 'components/Manufacturing/Production Information/Process Registration/MF_ProcessReg_Create';
import MF_ProcessReg_Index from 'components/Manufacturing/Production Information/Process Registration/MF_ProcessReg_Index';

import MF_PurchaseReq_Create from 'components/Manufacturing/Purchase Relationship/Requisition/MF_PurchaseReq_Create';

/* Component Imports */
import Home from 'components/Home';
import Sidebar from 'components/Sidebar';
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
              <Route path='/' element={<Home />} />
              <Route path='/business' element={<BusinessReg />} />
              <Route path='/login' element={<Login />} />

              <Route path='/manufacturing' element={<MF_Manufacturing />} />
              <Route path='/manufacturing/businessinfo/inquiry' element={<MF_Inquiry />} />

              <Route path='/manufacturing/businessinfo/estcost/create' element={<MF_EstCost_Create />} />
              <Route path='/manufacturing/businessinfo/estcost/index' element={<MF_EstCost_Index />} />
              <Route path='/manufacturing/businessinfo/estcost/view/:id' element={<MF_EstCost_View />} />

              <Route path='/manufacturing/businessinfo/estinput/index' element={<MF_EstInput_Index />} />

              <Route path='/manufacturing/prodinfo/invsys/create' element={<MF_InvSys_Create />} />

              <Route path='/manufacturing/prodinfo/processreg/create' element={<MF_ProcessReg_Create />} />
              <Route path='/manufacturing/prodinfo/processreg/index' element={<MF_ProcessReg_Index />} />

              <Route path='/manufacturing/purchase/requisition/create' element={<MF_PurchaseReq_Create />} />
            </Routes>
          </div>
          </div>
        </div>
    </Router>
  );
}

export default App;