import React, { useState } from "react";
import { useSelector } from "react-redux";
import AlertDialog from "./Dialogs/AlertDialog";
import Modal from "./Modal";
import SelectDialog from "./Dialogs/SelectDialog";
import axios from "axios";
import ConfirmDialog from "./Dialogs/ConfirmDialog";

const SaloonOrders = ({ value, orderStatuses }) => {
    const loginStore = useSelector((state) => state)
    const [dialog, setDialog] = useState({
        isActive: false,
        description: "",
        type: ""
    })
    const onClose = () => {
        setDialog({ ...dialog, isActive: false })
    }
    const setOrderStatus = async (newStatusValue) => {
        const response = (await axios(`http://localhost:5000/api/statuses/setStatus/${loginStore.login}/${loginStore.pass}/${value.id}/${newStatusValue}`)).data
        setDialog({
            isActive: true,
            type: <AlertDialog description={response.description} />,
        })
        if(response.status === 0) {
            return
        }
        console.log(orderStatuses, newStatusValue)
        value.statusName = orderStatuses[newStatusValue].name
    }
    const deleteOrderRequest = async () => {
        const response = (await axios(`http://localhost:5000/api/orders/dellOrder/${loginStore.login}/${loginStore.pass}/${value.id}/`)).data
        setDialog({
            isActive: true,
            type: <AlertDialog description={response.description} />,
        })
        if(response.status === 0) {
            return
        }
        value.statusName = "Удален!"
    }
    const getSelectedDialog = () => {
        setDialog({
            isActive: true,
            type: <SelectDialog onConfirm={setOrderStatus} description="Укажите новый стаус записи" values={orderStatuses} />,
        })
    }
    const getDeletingDialog = () => {
        setDialog({
            isActive: true,
            type: <ConfirmDialog onConfirm={deleteOrderRequest} description="Подтвердите удаление записи" values={orderStatuses} />,
        })
    }
    const getDate = (date) => {
        if (date > 360000000) {
            return new Date(+date).getDate() + "." + (+(new Date(+date).getMonth())+1) + "." + new Date(+date).getFullYear() + " - " + new Date(+date).getHours() + "ч " + (new Date(+date).getMinutes()) + "мин"
            }
        return (new Date(date).getUTCHours()) + "ч " + (new Date(date).getUTCMinutes()) + "мин"
    }
    return (
        <>
            {dialog.isActive
                ? <Modal onClose={onClose}>
                    {dialog.type}
                </Modal>
                : null
            }
            <div className="orders_cards" key={value.id}>
                <div className="orders_cards_content">
                    [id:{value.id}] - {value.statusName}
                    <p>{value.saloonName} - {value.serviceName}</p>
                    <p>{value.clientName}</p>
                    <p>Телефон: {value.phoneNumber}</p>
                    <p>Дата: {getDate(value.date)}</p>
                    <p>Продолжительность: {getDate(value.time)}</p>
                </div>
                <div className="orders_cards_btns_box">
                    <button onClick={getSelectedDialog} className="orders_cards_btns">Сменить статус записи</button>
                    <button onClick={getDeletingDialog} className="orders_cards_btns">Удалить запись</button>
                </div>
            </div>
        </>
    )
}

export default SaloonOrders