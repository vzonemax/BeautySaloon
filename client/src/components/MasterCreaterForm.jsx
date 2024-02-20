import React, { useState } from "react";
import MyCheckBox from "../UI/MyCheckBox/MyCheckBox"
import axios from "axios";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import AlertDialog from "./Dialogs/AlertDialog";

const MasterCreaterForm = ({ saloonId }) => {
    const loginStore = useSelector((state) => state)
    const [dialog, setDialog] = useState({ isActive: false, description: "", })
    const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    const [formState, setFormState] = useState({
        isActive: false,
        description: "Добавить мастера",
        endWorkHour: hours
    })
    const [inputData, setInputData] = useState({
        startWorkDay: 0,
        endtWorkDay: 0,
        login: "",
        description: "",
    })
    const [checkBoxValues, setCheckBoxValues] = useState([{ id: 1, description: "Понедельник", isActive: false }, { id: 2, description: "Вторник", isActive: false }, { id: 3, description: "Среда", isActive: false }, { id: 4, description: "Четверг", isActive: false }, { id: 5, description: "Пятница", isActive: false }, { id: 6, description: "Суббота", isActive: false }, { id: 7, description: "Воскресенье", isActive: false }])
    const setStartWorkDay = (day) => {
        setInputData({ ...inputData, startWorkDay: day, endtWorkDay: +day + 1 })
        setFormState({ ...formState, endWorkHour: hours.splice(+day + 1) })
    }
    const activateForm = () => {
        if (formState.isActive) {
            setFormState({
                isActive: false,
                description: "Добавить мастера",
            })
            return
        }
        setFormState({
            isActive: true,
            description: "Отмена",
            endWorkHour: hours
        })

    }
    const handlerCheckBox = (event) => {
        checkBoxValues[event.target.value - 1].isActive = event.target.checked
    }
    const handlerCreateMaster = async () => {
        if (inputData.login === "") {
            setDialog({ isActive: true, description: "Поле с логином должно быть заполнено" })
            return
        }
        if (inputData.endtWorkDay === 0) {
            setDialog({ isActive: true, description: "Рабочий день должен длиться хотябы один час" })
            return
        }
        if (inputData.description === "") {
            setDialog({ isActive: true, description: "Необходимо ввести должность мастера" })
            return
        }
        let days = []
        checkBoxValues.forEach(element => {
            if (element.isActive) {
                days.push(element.id)
            }
        });
        if (days.length === 0) {
            setDialog({ isActive: true, description: "Необходимо выбрать хотябы один день недели" })
            return
        }
        const response = (await axios(`http://localhost:5000/api/masters/setNewMaster/${loginStore.login}/${loginStore.pass}/${saloonId}/${inputData.login}/${inputData.startWorkDay}/${inputData.endtWorkDay}/${inputData.description}/${days.toString()}`)).data

        setDialog({ isActive: true, description: response.description })
    }
    const onClose = () => {
        setDialog({ isActive: false, description: "" })
    }
    return (
        <div className="masters_cards">
            {dialog.isActive
                ? <Modal onClose={onClose}>
                    <AlertDialog description={dialog.description} />
                </Modal>
                : null
            }
            <button onClick={activateForm} className="master_btn">{formState.description}</button>
            {formState.isActive
                ? <>
                    <p>Введите логин зарегестрированного пользователя:</p>
                    <input onChange={(e) => setInputData({ ...inputData, login: e.target.value })} value={inputData.login} className="auth_btn" type="text" />
                    <p>Выберите рабочие дни:</p>
                    <div>
                        {checkBoxValues.map((val) => {
                            return <MyCheckBox onChange={(e) => handlerCheckBox(e)} id={val.id} description={val.description} key={val.id} />

                        })}
                    </div>
                    <p>Выберите начало и конец рабочего дня:</p>
                    <div>
                        <select onChange={(e) => setStartWorkDay(e.target.value)} value={inputData.startWorkDay} className="auth_btn">
                            {hours.map((val) => {
                                return <option key={val} value={val}>{val}</option>
                            })}
                        </select>
                        <select onChange={(e) => setInputData({ ...inputData, endtWorkDay: e.target.value })} value={inputData.endtWorkDay} className="auth_btn" name="" id="">
                            {formState.endWorkHour.map((val) => {
                                return <option key={val} value={val}>{val}</option>
                            })}
                        </select>
                    </div>
                    <p>Введите должность мастера:</p>
                    <input onChange={(e) => setInputData({ ...inputData, description: e.target.value })} value={inputData.description} className="auth_btn" type="text" />
                    <button onClick={handlerCreateMaster} className="auth_btn">Добавить</button>
                </>
                : null
            }

        </div>
    )
}

export default MasterCreaterForm