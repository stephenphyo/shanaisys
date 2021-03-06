import React from 'react';
import { useNavigate } from 'react-router';
import './MF_Manufacturing.css';

function MF_Manufacturing() {

    /* useNavigate */
    const navigate = useNavigate();

    return (
        <div className='manufacture'>
            <div className="manufacture__content">
                <div className="manufacture__header">
                    <p>Production Information Management</p>
                </div>
                <div className="manufacture__body">
                    <div className="manufacture__col">
                        <div className="manufacture__col__header">
                            Business Information
                        </div>
                        <div className="manufacture__col__body">
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/businessinfo/inquiry')}>
                                Inquiry Input
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/businessinfo/estcost/index')}>
                                Estimated Cost
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/businessinfo/estinput/index')}>
                                Estimated Input
                            </button>
                            <button
                                className='black'
                                onClick={() => navigate('/manufacturing/businessinfo/edicapture')}>
                                EDI Capture
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/businessinfo/orderentry')}>
                                Order Entry
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/businessinfo/orderlist')}>
                                Order List
                            </button>
                            <button
                                className='black'
                                onClick={() => navigate('/manufacturing/businessinfo/salesinput')}>
                                Sales Input
                            </button>
                            <button
                                className='black'
                                onClick={() => navigate('/manufacturing/businessinfo/shipping')}>
                                Shipping
                            </button>
                        </div>
                    </div>
                    <div className="manufacture__col">
                        <div className="manufacture__col__header">
                            <p>Production Information</p>
                        </div>
                        <div className="manufacture__col__body">
                            <button
                                className='black'
                                onClick={() => navigate('/manufacturing/prodinfo/shipping')}>
                                Production Plan Input
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/prodinfo/shipping')}>
                                Production Planning Data
                            </button>
                            <button
                                className='black'
                                onClick={() => navigate('/manufacturing/prodinfo/shipping')}>
                                Process Setting
                            </button>
                            <button
                                className='black'
                                onClick={() => navigate('/manufacturing/prodinfo/invsys/index')}>
                                Inventory System
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/prodinfo/processreg/index')}>
                                Product Process Registration
                            </button>
                        </div>
                    </div>
                    <div className="manufacture__col">
                        <div className="manufacture__col__header">
                            <p>Purchasing Relationship</p>
                        </div>
                        <div className="manufacture__col__body">
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/shipping')}>
                                Material Outsourcing Management
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/purchase/requisition/create')}>
                                Purchase Requisition
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/purchase/approval/create')}>
                                Purchase Approval
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/purchase/order')}>
                                Purchase Order
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/shipping')}>
                                Purchase Input
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MF_Manufacturing;