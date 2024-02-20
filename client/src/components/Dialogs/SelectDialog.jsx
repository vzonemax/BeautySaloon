import React, { useState } from 'react';

const SelectDialog = ({ description, values, onConfirm }) => {
    const [selectValue, setSelectValue] = useState(0)
    return (
        <div className='inner_dialog'>
            <p>{description}</p>
            <select className="auth_btn" onChange={(e)=>setSelectValue(e.target.value)}>
                {values.map((val) => {
                    return (
                        <option key={val.id} value={val.id} >{val.name}</option>
                    )
                })}
            </select>
            <button onClick={()=>onConfirm(selectValue)} className='auth_btn'>Да</button>
        </div>
    )

}

export default SelectDialog;