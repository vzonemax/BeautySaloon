import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import AlertDialog from "../components/Dialogs/AlertDialog";
import { useFetching } from "../hooks/useFetching";
import axios from "axios";

const RegistrationPage = () => {
    const navigate = useNavigate()
    const [inputData, setInputData] = useState({
        login: "",
        name: "",
        phoneNumber: "",
        pass: "",
    })
    const [dialog, setDialog] = useState({ isActive: false, description: "", })

    const [registration, isLoading, error] = useFetching(async () => {
        if (inputData.login === "" || inputData.name === "" || inputData.phoneNumber === "" || inputData.pass === "") {
            setDialog({ isActive: true, description: "Все поля должны быть заполнены" })
        }
        const response = (await axios(`http://localhost:5000/api/users/registration/${inputData.login}/${inputData.name}/${inputData.phoneNumber}/${inputData.pass}/`)).data
        console.log(response)
        if (response.status === 0) {
            setDialog({ isActive: true, description: response.description })
            setTimeout(() => {
                navigate("/auth")
            }, 3000);
        } else {
            setDialog({ isActive: true, description: response.description })
        }
    })

    const onClose = () => {
        setDialog({ isActive: false, description: "" })
    }


    return (
        <>
            {dialog.isActive
                ? <Modal onClose={onClose}>
                    <AlertDialog description={dialog.description} />
                </Modal>
                : null
            }
            <div className="App auth">
                <div>Регистрация</div>
                <div className="auth_inputs">
                    <input onChange={(e) => setInputData({ ...inputData, login: e.target.value })} value={inputData.login} type="text" placeholder="Введите логин" />
                    <input onChange={(e) => setInputData({ ...inputData, name: e.target.value })} value={inputData.name} type="text" placeholder="Введите имя" />
                    <input onChange={(e) => setInputData({ ...inputData, phoneNumber: e.target.value })} value={inputData.phoneNumber} type="text" placeholder="Введите номер телефона" />
                    <input onChange={(e) => setInputData({ ...inputData, pass: e.target.value })} value={inputData.pass} type="text" placeholder="Введите пароль" />
                </div>
                <div className="auth_submit">
                    <button onClick={registration} className="auth_btn">Зарегистрироваться</button>
                    <div>Есть аккаунт? <Link to='/auth'>Войти</Link></div>
                </div>
            </div>
        </>
    )
}

export default RegistrationPage