import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditAccForm from "./EditAccForm";

const AcccountCard = ({ loginStore }) => {
    const router = useNavigate()
    const [isActiveEditAccForm, setIsActiveEditAccForm] = useState(false)

    return (
        <>
            <div className='cards' key={loginStore.userId}>
                <img className='card_image' src={loginStore.userImage} alt='no image' />
                <div className='card_description'>
                    <h4>{loginStore.roleName}:</h4>
                    <h3>{loginStore.userName} [id:{loginStore.userId}]</h3>
                    <p>Логин: {loginStore.login}</p>
                    <p>Номер телефона: {loginStore.phoneNumber}</p>
                    <button onClick={() => setIsActiveEditAccForm(!isActiveEditAccForm)} className="auth_btn">Настройка профиля</button>
                </div>
            </div>
            {isActiveEditAccForm
                ? <EditAccForm loginStore={loginStore} />
                : null
            }
        </>
    )
}

export default AcccountCard