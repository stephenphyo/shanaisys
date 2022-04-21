import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import Axios from '../../../utils/Axios';
import '../../../FormTemplate.css';
import './DynamicTableTemplate.css';

/* MUI Imports */
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

function MF_ProcessReg_Create() {

    /* useNavigate */
    const navigate = useNavigate();

    /* useState */
    const [drawingNum, setDrawingNum] = useState('');
    const processArr = [];

    /* Functions */
    const addNewProcess = () => {

    }

    const editProcess = () => {

    }

    const delProcess = () => {

    }

    const save = () => {
        Axios.post('/manufacturing/')
    }

    return (
        <div className='form'>
            <div className='form__content'>
                <div className='form__header'>
                    <p>Create a Product Process</p>
                </div>
                <div className='form__body'>
                    <div className='form__row'>
                        <div className='form__info col_1'>
                            <label>Drawing Number</label>
                            <select onChange={(e) => setDrawingNum(e.target.value)}>
                                <option value='' hidden>Please select a Drawing Number</option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                                <option>Option 3</option>
                            </select>
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__info col__1">
                            <div className='dynamic__table'>
                                    <div className='dynamic__thead'>
                                        <div className='dynamic__td first'>No.</div>
                                        <div className='dynamic__td second'>Process Number</div>
                                        <div className='dynamic__td third'>Estimated Duration</div>
                                        <div className='dynamic__td fourth'>
                                            <AddCircleIcon
                                                id='add_button'
                                                onClick={(e) => addNewProcess(e)} />
                                        </div>
                                    </div>
                                    <div className='dynamic__tbody'>
                                        {
                                            processArr.map((proc, index) => (
                                                <div className="dynamic__tr" key={index}>
                                                    <div className="dynamic__td first">{index+1}</div>
                                                    <div className="dynamic__td second">
                                                        <select
                                                            required
                                                            name='procNum'
                                                            value={proc.procNum}
                                                            onChange={(e) => editProcess(e, proc.id)} >
                                                            <option value='' hidden>Select Number</option>
                                                            <option value='p1'>Process 1</option>
                                                            <option value='p2'>Process 2</option>
                                                            <option value='p3'>Process 3</option>
                                                        </select>
                                                    </div>
                                                    <div className="dynamic__td third">
                                                        <input
                                                            type='text'
                                                            name='duration'
                                                            placeholder='0'
                                                            value={proc.duration}
                                                            onChange={(e) => editProcess(e, proc.id)} />
                                                    </div>
                                                    <div className="dynamic__td fourth">
                                                        <DeleteIcon
                                                            id='del_button'
                                                            onClick={() => delProcess(proc.id)} />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form__row footer">
                        <button id='save' onClick={() => save()}>SAVE</button>
                        <button id='cancel' onClick={() => navigate('/manufacturing/prodinfo/processreg/index')}>CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MF_ProcessReg_Create;