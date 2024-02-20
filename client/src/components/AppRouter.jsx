import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SaloonsPage from "../pages/SaloonsPage";
import SaloonItemPage from "../pages/SaloonItemPage";
import ErrorPage from "../pages/ErrorPage";
import NavBar from "./NavBar";
import AuthPage from "../pages/AuthPage";
import RegistrationPage from "../pages/RegistrationPage";
import AccountPage from "../pages/AccountPage";
import OrdersPage from "../pages/OrdersPage";

const AppRouter = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route exact path="/saloons" element={<SaloonsPage />} />
                <Route exact path="/saloons/:saloonId" element={<SaloonItemPage />} />
                <Route exact path="/orders" element={<OrdersPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="/" element={<Navigate to='/saloons' />} />
                <Route path="*" element={<Navigate to='/error' />} />
            </Routes>
        </>
    )
}

export default AppRouter