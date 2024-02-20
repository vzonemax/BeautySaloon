import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import axios from "axios";
import Modal from "../components/Modal";
import AlertDialog from "../components/Dialogs/AlertDialog";

const AuthPage = () => {
    const navigate = useNavigate()
    const [inputData, setInputData] = useState({
        login: "",
        pass: "",
    })
    const [dialog, setDialog] = useState({
        isActive: false,
        description: "",
    })

    const dispatch = useDispatch()
    const loginStore = useSelector((state) => state)

    const [auth, isConfirming, error] = useFetching(async () => {
        const response = await axios(`http://localhost:5000/api/users/auth/${inputData.login}/${inputData.pass}`)
        console.log(response.data)
        if (response.data[0].length === 0) {
            setDialog({ isActive: true, description: <AlertDialog description="Проверьте входные данные" /> })
        } else {
            dispatch({
                type: "SET_LOGIN",
                newLogin: inputData.login,
                newPass: inputData.pass,
                isAuth: "true",
                newUserId: response.data[0].id,
                // newUserName: response.data[0].name,
                // newPhoneNumber: response.data[0].phoneNumber,
                // newRole: response.data[0].role,
                // newUserImage: response.data[0].userImage,
            })
            navigate("/account")
        }
    })

    const onClose = () => {
        setDialog({
            ...dialog,
            isActive: false,
        })
    }

    const resetLogin = () => {
        dispatch({ type: "RESET_LOGIN" })
    }

    useEffect(() => {
        if (loginStore.isAuth === "true") {
            navigate("/account")
        }
    }, [])

    return (
        <div className="App auth">
            {dialog.isActive
                ? <Modal onClose={onClose}>
                    <AlertDialog description={dialog.description} />
                </Modal>
                : null
            }
            <div>
                <p>Авторизация:</p>
            </div>
            <div className="auth_inputs">
                <input type="text" value={inputData.login} onChange={(e) => setInputData({ ...inputData, login: e.currentTarget.value })} placeholder="Введите логин" />
                <input type="text" value={inputData.pass} onChange={(e) => setInputData({ ...inputData, pass: e.currentTarget.value })} placeholder="Введите пароль" />
            </div>
            <div className="auth_submit">
                <button className="auth_btn" onClick={auth}>Войти</button>
                <div>Нет аккаунта? <Link to='/registration'>Зарегистрироваться</Link></div>
            </div>
        </div>
    )
}

export default AuthPage