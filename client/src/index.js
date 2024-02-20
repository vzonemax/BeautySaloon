import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const defaultStore = {
    login: localStorage.getItem("login"),
    pass: localStorage.getItem("pass"),
    isAuth: localStorage.getItem("isAuth"),
    userName: localStorage.getItem("userName"),
    userId: localStorage.getItem("userId"),
    phoneNumber: localStorage.getItem("phoneNumber"),
    userImage: localStorage.getItem("userImage"),
    role: localStorage.getItem("role"),
    roleName: localStorage.getItem("roleName"),
    description: localStorage.getItem("description"),
}
const reducer = (state = defaultStore, action) => {
    switch (action.type) {
        case "SET_LOGIN": {
            localStorage.setItem("login", action.newLogin)
            localStorage.setItem("pass", action.newPass)
            localStorage.setItem("isAuth", action.isAuth)
            localStorage.setItem("userName",action.newUserName)
            localStorage.setItem("userId",action.newUserId)
            localStorage.setItem("phoneNumber",action.newPhoneNumber)
            localStorage.setItem("userImage",action.newUserImage)
            localStorage.setItem("role",action.newRole)
            localStorage.setItem("roleName",action.newRoleName)
            localStorage.setItem("description",action.newDescription)
            return { 
                login: action.newLogin, 
                pass: action.newPass, 
                isAuth: action.isAuth, 
                userName: action.newUserName, 
                userId: action.newUserId, 
                phoneNumber: action.newPhoneNumber,
                userImage: action.newUserImage,
                role: action.newRole,
                roleName: action.newRoleName,
                description: action.newDescription,
            }
            break;
        }
        case "RESET_LOGIN": {
            localStorage.clear()
            return { login: "", pass: "", isAuth: "false", }
            break;
        }
        default:
            return state
            break;
    }
}
const store = configureStore({ reducer })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
