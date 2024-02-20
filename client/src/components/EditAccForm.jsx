import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import AlertDialog from "./Dialogs/AlertDialog";
import ConfirmDialog from "./Dialogs/ConfirmDialog";
import axios from "axios";

const EditAccForm = ({ loginStore }) => {
    const router = useNavigate()
    const [dialog, setDialog] = useState({
        isActive: false,
        description: "",
        isConfirm: false
    })
    const [inputValues, setInputValues] = useState({
        setLogin: "",
        setPass: "",
        setNumber: "",
        setName: "",
        setPhoto: "",
    })

    const changeConfirm = (value) => {
        if (loginStore.isAuth !== 'true') {
            console.log("no auth")
            setDialog({ isActive: true, description: <AlertDialog description="Необходимо авторизироваться!" /> })
            setTimeout(() => {
                router("/auth")
            }, 3000);
            return
        }
        setDialog({ isActive: true, description: <ConfirmDialog description="Вы уверены, что хотите выполнить запись?" onConfirm={() => change(value)} /> })
    }

    const change = async (value) => {
        console.log(inputValues[value])
        const response = await axios(`http://localhost:5000/api/users/${value}/${loginStore.login}/${loginStore.pass}/${inputValues[value]}`);
        setDialog({ isActive: true, description: <AlertDialog description={response.data.description} /> })
        setTimeout(() => {
            router("/auth")
        }, 3000);
    }

    const loadPhoto = async () => {
        let formData = new FormData()
        formData.append('image', inputValues.setPhoto, (new Date().getTime() + "-" + loginStore.userId + "." + inputValues.setPhoto.type.split("/")[1]))
        const response = await axios.post(`http://localhost:5000/api/users/loadImage/${loginStore.userId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        console.log(response)
        setDialog({ isActive: true, description: <AlertDialog description={response.data} /> })
        setTimeout(() => {
            router("/auth")
        }, 3000);
    }

    return (
        <>
            <div>
                <div>
                    <p>Сменить логин:</p>
                    <input value={inputValues.setLogin} onChange={(e) => setInputValues({ ...inputValues, setLogin: e.target.value })} type="text" />
                    <button value="setLogin" onClick={(e) => changeConfirm(e.target.value)}>OK</button>
                </div>
                <div>
                    <p>Сменить пароль:</p>
                    <input value={inputValues.setPass} onChange={(e) => setInputValues({ ...inputValues, setPass: e.target.value })} type="text" />
                    <button value="setPass" onClick={(e) => changeConfirm(e.target.value)}>OK</button>
                </div>
                <div>
                    <p>Сменить имя:</p>
                    <input value={inputValues.setName} onChange={(e) => setInputValues({ ...inputValues, setName: e.target.value })} type="text" />
                    <button value="setName" onClick={(e) => changeConfirm(e.target.value)}>OK</button>
                </div>
                <div>
                    <p>Сменить номер:</p>
                    <input value={inputValues.setNumber} onChange={(e) => setInputValues({ ...inputValues, setNumber: e.target.value })} type="text" />
                    <button value="setNumber" onClick={(e) => changeConfirm(e.target.value)}>OK</button>
                </div>
                <div>
                    <p>Сменить фото:</p>
                    <input onChange={(e) => setInputValues({ ...inputValues, setPhoto: e.target.files[0] })} type="file" method="post" encType="multipart/form-data" name="avatar" />
                    <button onClick={loadPhoto}>OK</button>
                </div>
            </div>
            {dialog.isActive
                ? <Modal onClose={() => setDialog({ ...dialog, isActive: false })} > {dialog.description} </Modal>
                : null
            }
        </>
    )
}

export default EditAccForm