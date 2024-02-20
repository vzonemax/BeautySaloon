import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetching } from "../hooks/useFetching";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AcccountCard from "../components/AccountCard";

const AccountPage = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})

    const dispatch = useDispatch()
    const loginStore = useSelector((state) => state)

    const [auth, isConfirming, error] = useFetching(async () => {
        const response = (await axios(`http://localhost:5000/api/users/get/${loginStore.login}/${loginStore.pass}`)).data[0]
        if (response.length === 0) {
            resetLogin()
        } else {
            dispatch({
                type: "SET_LOGIN",
                newLogin: response[0].login,
                newPass: response[0].pass,
                isAuth: "true",
                newUserName: response[0].name,
                newUserId: response[0].id,
                newPhoneNumber: response[0].phoneNumber,
                newUserImage: response[0].userImage,
                newRole: response[0].role,
                newRoleName: response[0].roleName,
                newDescription: response[0].description,
            })
            navigate("/account")
        }
    })

    const resetLogin = () => {
        dispatch({ type: "RESET_LOGIN" })
        navigate("/auth")
    }

    useEffect(() => {
        if (loginStore.isAuth === "true") {
            auth()
        } else {
            navigate("/auth")
        }
    }, [])

    return (
        <div className="App auth">
            <AcccountCard loginStore={loginStore} />
            <button onClick={()=> navigate("/orders")} className="auth_btn">Просмотр записей</button>
            <button onClick={resetLogin} className="auth_btn">Выйти</button>

        </div>
    )
}

export default AccountPage