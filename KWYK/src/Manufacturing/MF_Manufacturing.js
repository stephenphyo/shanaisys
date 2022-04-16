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
                                onClick={() => navigate('/manufacturing/business-info/inquiry')}>
                                Inquiry Input
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/business-info/estcost')}>
                                Estimated Cost
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/business-info/estinput')}>
                                Estimated Input
                            </button>
                            <button
                                className='black'
                                onClick={() => navigate('/manufacturing/business-info/edicapture')}>
                                EDI Capture
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/business-info/orderentry')}>
                                Order Entry
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/business-info/orderlist')}>
                                Order List
                            </button>
                            <button
                                className='black'
                                onClick={() => navigate('/manufacturing/business-info/salesinput')}>
                                Sales Input
                            </button>
                            <button
                                className='black'
                                onClick={() => navigate('/manufacturing/business-info/shipping')}>
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
                                onClick={() => navigate('/manufacturing/production-info/prodplaninput')}>
                                Production Plan Input
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/production-info/prodplanningdata')}>
                                Production Planning Data
                            </button>
                            <button
                                className='black'
                                onClick={() => navigate('/manufacturing/production-info/processset')}>
                                Process Setting
                            </button>
                            <button
                                className='black'
                                onClick={() => navigate('/manufacturing/production-info/invsys')}>
                                Inventory System
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/production-info/prodprocessregist')}>
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
                                onClick={() => navigate('/manufacturing/purchasing-relationship/matoutsourcemgmt')}>
                                Material Outsourcing Management
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/purchasing-relationship/purchaseappinput')}>
                                Purchase Application Input
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/purchasing-relationship/purchaseapprovinput')}>
                                Purchase Approval Input
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/purchasing-relationship/orderentry')}>
                                Order Entry
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/purchasing-relationship/purchaseinput')}>
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