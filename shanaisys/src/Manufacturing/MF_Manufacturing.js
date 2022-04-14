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
                                onClick={() => navigate('/manufacturing/inquiry')}>
                                Inquiry Input
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/estcost')}>
                                Estimated Cost
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/estinput')}>
                                Estimated Input
                            </button>
                            <button
                                className='black'
                                onClick={() => navigate('/manufacturing/edicapture')}>
                                EDI Capture
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/orderentry')}>
                                Order Entry
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/orderlist')}>
                                Order List
                            </button>
                            <button
                                className='black'
                                onClick={() => navigate('/manufacturing/salesinput')}>
                                Sales Input
                            </button>
                            <button
                                className='black'
                                onClick={() => navigate('/manufacturing/shipping')}>
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
                                onClick={() => navigate('/manufacturing/shipping')}>
                                Production Plan Input
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/shipping')}>
                                Production Planning Data
                            </button>
                            <button
                                className='black'
                                onClick={() => navigate('/manufacturing/shipping')}>
                                Process Setting
                            </button>
                            <button
                                className='black'
                                onClick={() => navigate('/manufacturing/shipping')}>
                                Inventory System
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/shipping')}>
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
                                onClick={() => navigate('/manufacturing/shipping')}>
                                Purchase Application Input
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/shipping')}>
                                Purchase Approval Input
                            </button>
                            <button
                                className='blue'
                                onClick={() => navigate('/manufacturing/shipping')}>
                                Order Entry
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