import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetching } from "../hooks/useFetching";
import axios from "axios";
import ConfirmDialog from "./Dialogs/ConfirmDialog";
import Modal from "./Modal";
import AlertDialog from "./Dialogs/AlertDialog";

const OrderTime = ({ time, serviceId }) => {
    // const dispatch = useDispatch()
    const loginStore = useSelector((state) => state)
    const [dialog, setDialog] = useState({
        isActive: false,
        description: "",
        isConfirm: false
    })
    const [orderFetch, isProccesing, error] = useFetching(async () => {
        const response = await axios(`http://localhost:5000/api/orders/order/${loginStore.login}/${loginStore.pass}/${serviceId}/${time}/new`)
        // alert("Статус:" + response.data.status + ", " + response.data.description)
        setDialog({ isActive: true, description: <AlertDialog description={"Статус_" + response.data.status + ": " + response.data.description} /> })
    })

    const onClose = () => {
        setDialog({
            ...dialog,
            isActive: false,
        })
    }

    const order = () => {
        orderFetch()
    }

    const orderConfirm = () => {
        console.log(loginStore)
        if (loginStore.isAuth !== 'true') {
            setDialog({ isActive: true, description: <AlertDialog description="Необходимо авторизироваться для осуществления записи" /> })
            return
        }
        setDialog({ isActive: true, description: <ConfirmDialog description="Вы уверены, что хотите выполнить запись?" onConfirm={order} /> })
    }

    return (
        <>
            {dialog.isActive
                ? <Modal onClose={onClose}> {dialog.description} </Modal>
                : null
            }
            <div
                className="order_time_item"
                onClick={orderConfirm}
            >
                <p>{new Date(time).getHours()}ч {new Date(time).getMinutes()}м</p>
            </div>
        </>
    )
}

export default OrderTime