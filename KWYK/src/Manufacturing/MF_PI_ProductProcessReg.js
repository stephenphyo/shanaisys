import React, {useState} from 'react';
import './FormTemplate.css';

// const handleChange = (e) => {
//     setValue(e.target.value);
//   };

function MF_PI_ProductProcessReg() {
  const [value] = useState('default');
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
                        <select defaultValue={value}>
                            <option value='default' disabled hidden>--Please select a Drawing Number--</option>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MF_PI_ProductProcessReg