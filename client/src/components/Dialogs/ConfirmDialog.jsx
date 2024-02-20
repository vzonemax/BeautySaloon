import React from 'react';

const ConfirmDialog = ({ description, onConfirm }) => {
    return (
        <div className='inner_dialog'>
            <p>{description}</p>
            <button onClick={onConfirm} className='auth_btn'>Да</button>
        </div>
    )

}

export default ConfirmDialog;