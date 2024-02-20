import React, { useEffect, useState } from "react";
import Service from "./Service";
import { useSelector } from "react-redux";
import { useFetching } from "../hooks/useFetching";
import axios from "axios";
import ServiceCreaterCard from "./ServiceCreaterCard";
import Modal from "./Modal";
import AlertDialog from "./Dialogs/AlertDialog";

const Master = ({ val, saloonId, isSaloonAdmin }) => {
    const loginStore = useSelector((state) => state)
    const [dialog, setDialog] = useState({ isActive: false, description: "", })
    const [selectMaster, setSelectMaster] = useState({
        isSelect: false,
        description: "Показать услуги",
        style: "master_services"
    })
    const toggleSelectedMaster = () => {
        selectMaster.isSelect
            ? setSelectMaster({ isSelect: false, description: "Показать услуги", style: "master_services" })
            : setSelectMaster({ isSelect: true, description: "Скрыть услуги", style: "master_services_active" })
    }
    const parseDate = (data) => {
        const tbl = { 1: 'пн', 2: 'вт', 3: 'ср', 4: 'чт', 5: 'пт', 6: 'сб', 7: 'вс' }
        let days = data.split(',').map(val => tbl[val] + "; ")
        return days
    }
    const deleteMaster = async () => {
        const response = (await axios(`http://localhost:5000/api/masters/dellMaster/${loginStore.login}/${loginStore.pass}/${saloonId}/${val.id}`)).data
        setDialog({ isActive: true, description: response.description })
    }
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
            <div className="masters_cards" key={val.id}>
                <div className="masters">
                    <img className="card_image" src={val.userImage} alt="no image" />
                    <div className="card_description">
                        <h2>{val.name}</h2>
                        <p>{val.description}</p>
                        <p>Дни работы: {parseDate(val.workDates)}</p>
                        <p>Время работы: с {val.workTimeStart} до {val.workTimeEnd}</p>
                        {isSaloonAdmin
                            ? <button onClick={deleteMaster} className="auth_btn">Удалить мастера</button>
                            : null
                        }
                    </div>
                </div>
                <div className={selectMaster.style}>
                    {val.services.map((service) => {
                        return <Service
                            key={service.idService}
                            service={service}
                            workDates={val.workDates}
                            masterId={val.id}
                            isSaloonAdmin={isSaloonAdmin}
                            saloonId={saloonId}
                        />
                    })
                    }
                    {isSaloonAdmin
                        ? <ServiceCreaterCard masterVal={val} saloonId={saloonId} />
                        : null
                    }

                </div>
                <button className="master_btn" onClick={toggleSelectedMaster}>
                    {selectMaster.description}
                </button>
            </div>
        </>
    )
}

export default Master