import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import '../FormTemplate.css';

function MF_EstInput() {

    /* useStage */
    const [customerNum, setCustomerNum] = useState('');
    const [departmentInCharge, setDepartmentInCharge] = useState('');
    const [paymentTerms, setPaymentTerms] = useState('');
    const [deliveryPlace, setDeliveryPlace] = useState('');
    const [constructionNum, setConstructionNum] = useState('');
    const [requestNum, setRequestNum] = useState('');
    const [personInChargeNum, setPersonInChargeNum] = useState('');
    const [description, setDescription] = useState('');

    /* useNavigate */
    const navigate = useNavigate();

  return (
    <div className='form'>
        <div className='form__content'>
            <div className='form__header'>
                <p>Create a quote</p>
            </div>
            <div className='form__body'>
                <div className='form__row'>
                    <div className='form__info col_1'>
                        <label>Customer Number</label>
                        <select onChange={(e) => setCustomerNum(e.target.value)}>
                        <option value='' hidden>--Please select a Customer--</option>
                        <option value='Op1'>Option 1</option>
                        <option value='Op2'>Option 2</option>
                        <option value='Op3'>Option 3</option>
                        </select>
                    </div>
                </div>  
                <div className='form__row'>
                    <div className='form__info col_4'>
                        <label>Department in charge</label>
                        <input 
                            type='text'
                            onChange={(e) => setDepartmentInCharge(e.target.value)}
                        />
                    </div>
                    <div className='form__info col_4'>
                        <label>Delivery date (after receiving an order)</label>
                        <input type='date'/>
                    </div>
                    <div className='form__info col_4'>
                        <label>Payment Terms</label>
                        <input 
                            type='text'
                            onChange={(e) => setPaymentTerms(e.target.value)}
                        />
                    </div>
                    <div className='form__info col_4'>
                        <label>Estimated expiration date</label>
                        <input type='date'/>
                    </div>
                </div>
                <div className='form__row'>
                    <div className='form__info col_4'>
                        <label>Delivery Place</label>
                        <input 
                            type='text'
                            onChange={(e) => setDeliveryPlace(e.target.value)}
                        />
                    </div>
                    <div className='form__info col_4'>
                        <label>Construction Number</label>
                        <input 
                            type='text'
                            onChange={(e) => setConstructionNum(e.target.value)}
                        />
                    </div>
                    <div className='form__info col_4'>
                        <label>Request Number</label>
                        <input 
                            type='text'
                            onChange={(e) => setRequestNum(e.target.value)}
                        />
                    </div>
                    <div className='form__info col_4'>
                        <label>Person in charge Number</label>
                        <select onChange={(e) => setPersonInChargeNum(e.target.value)}>
                            <option value='' hidden>--Select Employee--</option>
                            <option value='Op1'>Option 1</option>
                            <option value='Op2'>Option 2</option>
                            <option value='Op3'>Option 3</option>
                        </select>
                    </div>
                </div>
                <div className='form__row'>
                    <div className='form__info col_1'>
                        <label>Description</label>
                        <input 
                            type='text'
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form__row footer">
                    <button id='save'>SAVE</button>
                    <button id= 'cancel' onClick={() => navigate('../manufacturing')}>CANCEL</button>
                </div>
            </div>
        </div>
        <div className='form__content'>
            <div className='form__header'>
                <p>Show all product original costs</p>
            </div>
            <div className='form__body'>
                
            </div>
        </div>
    </div>
  );
}

export default MF_EstInput;