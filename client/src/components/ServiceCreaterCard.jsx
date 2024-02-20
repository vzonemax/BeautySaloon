import React, { useState } from "react";
import Modal from "./Modal";
import AlertDialog from "./Dialogs/AlertDialog";
import { useFetching } from "../hooks/useFetching";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ServiceCreaterCard = ({ masterVal, saloonId }) => {
    const loginStore = useSelector((state) => state)
    const navigate = useNavigate()
    const [newServiceForm, setNewServiceForm] = useState({
        isActive: false,
        btnDescription: "Добавить услугу",
    })
    const [inputData, setInputData] = useState({
        name: "",
        hours: 0,
        minutes: 0,
        price: 0,
    })
    const [dialog, setDialog] = useState({ isActive: false, description: "", })
    const [createService, isCreating, error] = useFetching(async () => {
        if (inputData.name === "") {
            setDialog({ isActive: true, description: "Название должно быть заполнено" })
            return
        }
        if (+inputData.hours === 0 && +inputData.minutes === 0) {
            setDialog({ isActive: true, description: "Продолжительность не может быть 0 часов и 0 минут" })
            return
        }
        if (!isFinite(inputData.price) || (inputData.price % 1 !== 0)) {
            setDialog({ isActive: true, description: "Стоимость должна быть целым числом" })
            return
        }
        const totalTime = +inputData.hours + +inputData.minutes
        console.log(masterVal.id, inputData.name, totalTime, inputData.price)
        const response = (await axios(`http://localhost:5000/api/services/addService/${loginStore.login}/${loginStore.pass}/${saloonId}/${masterVal.id}/${inputData.name}/${totalTime}/${inputData.price}`)).data
        setDialog({ isActive: true, description: response.description })
        if (response.status === 0) {
            setTimeout(() => {
                navigate(0)
            }, 5000);
        }
    })
    const hours = [{ "ms": 0, "description": "0ч" }, { "ms": 3600000, "description": "1ч" }, { "ms": 7200000, "description": "2ч" }, { "ms": 10800000, "description": "3ч" }, { "ms": 14400000, "description": "4ч" }, { "ms": 18000000, "description": "5ч" }, { "ms": 21600000, "description": "6ч" }, { "ms": 25200000, "description": "7ч" }, { "ms": 28800000, "description": "8ч" }, { "ms": 32400000, "description": "9ч" }, { "ms": 36000000, "description": "10ч" }, { "ms": 39600000, "description": "11ч" }]
    const minutes = [{ "ms": 0, "description": "0мин" }, { "ms": 300000, "description": "5мин" }, { "ms": 600000, "description": "10мин" }, { "ms": 900000, "description": "15мин" }, { "ms": 1200000, "description": "20мин" }, { "ms": 1500000, "description": "25мин" }, { "ms": 1800000, "description": "30мин" }, { "ms": 2100000, "description": "35мин" }, { "ms": 2400000, "description": "40мин" }, { "ms": 2700000, "description": "45мин" }, { "ms": 3000000, "description": "50мин" }, { "ms": 3300000, "description": "55мин" }]

    const onClose = () => {
        setDialog({ isActive: false, description: "", })
    }

    const openNewServiceForm = () => {
        if (newServiceForm.isActive) {
            setNewServiceForm({ isActive: false, btnDescription: "Добавить услугу" })
        } else {
            setNewServiceForm({ isActive: true, btnDescription: "Отменить" })
        }
    }

    return (
        <>
            {dialog.isActive
                ? <Modal onClose={onClose}>
                    <AlertDialog description={dialog.description} />
                </Modal>
                : null
            }
            <div>
                {newServiceForm.isActive
                    ? <div className="new_service_from">
                        <p>Создание новой услуги для "{masterVal.name}"</p>
                        <p>Введите название услуги:</p>
                        <input onChange={(e) => setInputData({ ...inputData, name: e.target.value })} value={inputData.name} className="auth_btn" type="text" />
                        <p>Выберите продолжительность услуги:</p>
                        <div>
                            <select onChange={(e) => setInputData({ ...inputData, hours: e.target.value })} value={inputData.hours} className="auth_btn">
                                {hours.map((val) => {
                                    return <option key={val.ms} value={val.ms}>{val.description}</option>
                                })}
                            </select>
                            <select onChange={(e) => setInputData({ ...inputData, minutes: e.target.value })} value={inputData.minutes} className="auth_btn" name="" id="">
                                {minutes.map((val) => {
                                    return <option key={val.ms} value={val.ms}>{val.description}</option>
                                })}
                            </select>
                        </div>
                        <p>Введите стоимость услуги (BYN):</p>
                        <input onChange={(e) => setInputData({ ...inputData, price: e.target.value })} value={inputData.price} className="auth_btn" type="text" />
                        <button onClick={createService} className="auth_btn">Создать услугу</button>
                    </div>
                    : null
                }

                <div className="service_cards">
                    <button onClick={openNewServiceForm} className="auth_btn">{newServiceForm.btnDescription}</button>
                </div>
            </div>
        </>
    )
}

export default ServiceCreaterCard