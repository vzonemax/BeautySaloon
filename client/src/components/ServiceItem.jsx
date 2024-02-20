import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import ConfirmDialog from "./Dialogs/ConfirmDialog";
import { useFetching } from "../hooks/useFetching";
import axios from "axios";
import AlertDialog from "./Dialogs/AlertDialog";
import { useNavigate } from "react-router-dom";

const ServiceItem = ({ service, buttonDescription, handlerOrderTimeToggler, isSaloonAdmin, saloonId }) => {
    const loginStore = useSelector((state) => state)
    const navigate = useNavigate()
    const [dialog, setDialog] = useState({
        isActive: false,
        description: "",
        isConfirm: false
    })
    const [deleteService, isProcessing, error] = useFetching(async () => {
        const adminId = (await axios(`http://localhost:5000/api/services/dellService/${loginStore.login}/${loginStore.pass}/${service.idService}/${saloonId}`)).data
        setDialog({
            isActive: true,
            description: <AlertDialog description={adminId.description} />
        })
        if (adminId.status === 1) {
            navigate(0)
        }
    })
    const getDeleteServiceDialog = async () => {
        setDialog({
            isActive: true,
            description: <ConfirmDialog onConfirm={deleteService} description={"Вы уверены, что хотите удалить?"} />
        })
    }
    const onClose = () => {
        setDialog({
            isActive: false,
            description: ""
        })
    }
    const parseTime = (time) => {
        const result = new Date(time)
        return `${result.getHours() - 3} часов ${result.getMinutes()} минут`
    }
    return (
        <>
            {dialog.isActive
                ? <Modal onClose={onClose}> {dialog.description} </Modal>
                : null
            }
            <div className='service_cards' >
                <div className="service_description">
                    <p>Название услуги: {service.ServiceName}</p>
                    <p>Стоимость услуги: {service.Price} BYN</p>
                    <p>Продолжительность: {parseTime(service.ServiceTime)}</p>
                </div>
                <div className="service_btn_box">
                    <button
                        className="service_btn"
                        onClick={handlerOrderTimeToggler}
                    >
                        {buttonDescription}
                    </button>
                    {isSaloonAdmin
                        ? <button onClick={getDeleteServiceDialog} className="service_btn">Удалить</button>
                        : null
                    }
                </div>
            </div>
        </>
    )
}

export default ServiceItem