import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../ViewTemplate.css';

function MF_EstCost_View() {

    /* useNavigate */
    const navigate = useNavigate('');

    return (
        <div className='view'>
            <div className='view__controller'>
                <button
                    className='addEntry'
                    onClick={() => navigate('/manufacturing/estcost/create')}>
                    Add an entry</button>
                <button
                    className='returnBack'
                    onClick={() => navigate('/manufacturing/')}>
                    Return back
                </button>
            </div>
            <div className="view__content">
                <div className="view__header">
                    <p>Estimated Cost</p>
                </div>
                <div className="view__body">
                    <div className="view__table">
                        <div className="view__table__scroll">
                            <div className="view__thead">
                                    <div className="view__td" style={{width: '10px'}}>No.</div>
                                    <div className="view__td" style={{width: '300px'}}>Customer Name</div>
                                    <div className="view__td" style={{width: '100px'}}>Drawing No.</div>
                                    <div className="view__td" style={{width: '300px'}}>Product Name</div>
                                    <div className="view__td" style={{width: '300px'}}>Variable Cost</div>
                                    <div className="view__td" style={{width: '300px'}}>Total Manhours</div>
                                    <div className="view__td" style={{width: '300px'}}>In-house Manhour Cost</div>
                                    <div className="view__td" style={{width: '300px'}}>Product Cost</div>
                                    <div className="view__td" style={{width: '300px'}}>Product Sale Price</div>
                                    <div className="view__td" style={{width: '300px'}}>Action</div>
                            </div>
                            <div className="view__tbody">
                                <div className="view__tr">
                                    <div className="view__td" style={{width: '10px'}}>1</div>
                                    <div className="view__td" style={{width: '300px'}}>2</div>
                                    <div className="view__td" style={{width: '100px'}}>3</div>
                                    <div className="view__td" style={{width: '300px'}}>4</div>
                                    <div className="view__td" style={{ width: '300px' }}>5</div>
                                    <div className="view__td" style={{width: '300px'}}>6</div>
                                    <div className="view__td" style={{width: '300px'}}>7</div>
                                    <div className="view__td" style={{width: '300px'}}>8</div>
                                    <div className="view__td" style={{width: '300px'}}>9</div>
                                    <div className="view__td" style={{width: '300px'}}>10</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MF_EstCost_View;