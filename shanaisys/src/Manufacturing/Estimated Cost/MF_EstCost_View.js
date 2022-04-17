import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from '../../utils/Axios';
import '../../FormTemplate.css';
import './MF_EstCost_Create.css';

/* MUI Imports */
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';

/* Reducer */
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, result: action.payload }
        case 'FETCH_FAILED':
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

const initialState = { loading: false, result: {}, error: '' };

function MF_EstCost_View() {

    /* useNavigate */
    const navigate = useNavigate();

    /* useParams */
    const params = useParams();
    const { id: estcostId } = params;

    /* useReducer */
    const [{ loading, result, error }, dispatch] = useReducer(reducer, initialState);

    /* useState */
    const [date, setDate] = useState('');
    const [id, setId] = useState(1);

    const initialProcessData = {
        id: id,
        procNum: '',
        duration: ''
    }
    const [processArr, setProcessArr] = useState([initialProcessData]);
    const [varCost, setVarCost] = useState(0);
    const [totalHrs, setTotalHrs] = useState(0);
    const [manpowerCost, setManpowerCost] = useState(0);
    const [prodCost, setProdCost] = useState(0);
    const [salePrice, setSalePrice] = useState(0);
    const [profitExp, setProfitExp] = useState(0);
    const [special, setSpecial] = useState('');
    const [multiplier, setMultiplier] = useState(0);

    /* useEffect */
    useEffect(() => {
        dispatch({ type: 'FETCH_REQUEST' });
        Axios
            .get(`/manufacturing/estcost/view/${estcostId}`)
            .then((res) => {
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
            })
            .catch((err) => {
                dispatch({ type: 'FETCH_FAIL', payload: err.message })
            })
        console.log(result)
    }, []);

    return (
        <div className='form'>
            <div className="form__content">
                <div className="form__header">
                    <p>{`Estimated Cost (id: ${result.id}`}</p>
                </div>
                <div className="form__body">
                    <div className="form__row">
                        <div className='form__info col_1'>
                            <label>Customer Name
                                <span className='required'>*</span>
                            </label>
                            <input value={result.customer_id} />
                        </div>
                    </div>
                    <div className="form__row">
                        <div className='form__info col_4'>
                            <label>Inquiry ID</label>
                            <input value={result.inquiry_id} />
                        </div>
                        <div className="form__info col_4">
                            <label id='red'>Parent-Child Classification</label>
                            <input value={result.classification} />
                        </div>
                        <div className='form__info col_4'>
                            <label>Drawing ID
                                <span className='required'>*</span>
                            </label>
                            <input value={result.drawing_id} />
                        </div>
                        <div className='form__info col_4'>
                            <label>Product Name
                                <span className='required'>*</span>
                            </label>
                            <input value={result.product_name} />
                        </div>
                    </div>
                    <div className="form__row">
                        <div className='form__info col_2'>
                            <label>
                                Updated Date
                                <span className='required'>*</span>
                            </label>
                            <input value={result.change_date} />
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info col_2">
                            <div className="table">
                                <div className="tr">
                                    <div className="tr left">
                                        <label>Material Cost</label>
                                    </div>
                                    <div className="tr right">
                                        <div className='currency'>
                                            <span>¥
                                                <input
                                                    type='text'
                                                    name='cst_mat'
                                                    placeholder='0.00'
                                                    maxLength={12} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="tr">
                                    <div className="tr left">
                                        <label>Purchase Cost</label>
                                    </div>
                                    <div className="tr right">
                                        <div className='currency'>
                                            <span>¥
                                                <input
                                                    type='text'
                                                    name='cst_pur'
                                                    placeholder='0.00'
                                                    maxLength={12} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="tr">
                                    <div className="tr left">
                                        <label>Outsourcing Cost</label>
                                    </div>
                                    <div className="tr right">
                                        <div className='currency'>
                                            <span>¥
                                                <input
                                                    type='text'
                                                    name='cst_out'
                                                    placeholder='0.00'
                                                    maxLength={12} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="tr">
                                    <div className="tr left">
                                        <label>Surface Treatment Cost</label>
                                    </div>
                                    <div className="tr right">
                                        <div className='currency'>
                                            <span>¥
                                                <input
                                                    type='text'
                                                    name='cst_sur'
                                                    placeholder='0.00'
                                                    maxLength={12} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="tr">
                                    <div className="tr left">
                                        <label>Transportation Cost</label>
                                    </div>
                                    <div className="tr right">
                                        <div className='currency'>
                                            <span>¥
                                                <input
                                                    type='text'
                                                    name='cst_tran'
                                                    placeholder='0.00'
                                                    maxLength={12} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="tr">
                                    <div className="tr left">
                                        <label>Variable Cost</label>
                                    </div>
                                    <div className="tr right">
                                        <label className='display'>
                                            <span>¥</span>
                                            {varCost === 0 ? '0.00' : varCost}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form__info col_2" id='table2'>
                            <div className='table'>
                                <div className='thead'>
                                    <div className='td first'>No.</div>
                                    <div className='td second'>Process Number</div>
                                    <div className='td third'>Estimated Duration</div>
                                    <div className='td fourth'>
                                        <AddCircleIcon
                                            id='add_button' />
                                    </div>
                                </div>
                                <div className='tbody'>
                                    {
                                        processArr.map((proc, index) => (
                                            <div className="tr" key={index}>
                                                <div className="td first">{index+1}</div>
                                                <div className="td second">
                                                    <select
                                                        required
                                                        name='procNum'
                                                        value={proc.procNum}>
                                                        <option value='' hidden>Select Number</option>
                                                        <option value='p1'>Process 1</option>
                                                        <option value='p2'>Process 2</option>
                                                        <option value='p3'>Process 3</option>
                                                    </select>
                                                </div>
                                                <div className="td third">
                                                    <input
                                                        type='text'
                                                        name='duration'
                                                        placeholder='0'
                                                        value={proc.duration} />
                                                </div>
                                                <div className="td fourth">
                                                    <DeleteIcon
                                                        id='del_button' />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='table'>
                                <div className='tr'>
                                    <div className='td fifth'>
                                        <label>Total Time (hr)</label>
                                    </div>
                                    <div className='td fifth'>
                                        <label className='display'>
                                            {totalHrs}
                                            {/* {processArr.reduce((prev, cur) =>
                                                round2(prev + parseFloat(cur.duration === '' ? 0 : cur.duration)), 0)} */}
                                        </label>
                                    </div>
                                </div>
                                <div className='tr'>
                                    <div className='td sixth'>
                                        <label>Amount (rate/hr)</label>
                                    </div>
                                    <div className='td sixth'>
                                        <label>¥ 5000 / hr</label>
                                    </div>
                                    <div className='td fifth'>
                                        <label className='display'>
                                            <span>¥</span>
                                            {manpowerCost === 0 ? '0.00' : manpowerCost}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info col_2">
                            <label>Special Note</label>
                            <input
                                type='text'
                                placeholder='Special Note'
                                onChange={(e) => setSpecial(e.target.value)} />
                        </div>
                        <div className="form__info col_2">
                            <label>Multiplier</label>
                            <input
                                type='text'
                                placeholder='Multiplier'
                                onChange={(e) => setMultiplier(e.target.value)} />
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__row__right">
                            <div className="form__info col_3">
                                <label>Production Cost</label>
                                <label className='display'>
                                    <span>¥</span>
                                    {prodCost}
                                </label>
                            </div>
                            <div className="form__info col_3">
                                <label>Product Sale Price</label>
                                <label className='display'>
                                    <span>¥</span>
                                    {salePrice}
                                </label>
                            </div>
                            <div className="form__info col_3">
                                <label>Indirect Profit Expenses</label>
                                <label className='display'>
                                    <span>¥</span>
                                    {profitExp}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form__row footer">
                        <button id='save'>EDIT</button>
                        <button id='cancel' onClick={() => navigate('/manufacturing/estcost/index')}>CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MF_EstCost_View;