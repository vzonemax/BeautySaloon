import React, { useState } from "react";

const Service = ({ service }) => {
    const currentDay = new Date()
    const [orderTimeToggler, setOrderTimeToggler] = useState({
        isActive: false,
        description: "Выбрать время"
    })
    const [orderTime, setOrderTime] = useState({
        year: '2024',
        month: '0',
        date: '25'
    })
    const [selectedDate, setSelectedDate] = useState({
        year: currentDay.getFullYear(),
        months: currentDay.getMonth(),
        date: currentDay.getDate(),
    })
    const years = [currentDay.getFullYear(), currentDay.getFullYear() + 1]
    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]

    const activateOrderTime = () => {
        if (orderTimeToggler.isActive) {
            setOrderTimeToggler({
                isActive: false,
                // currentDay: new Date(),
                description: "Выбрать время"
            })
        } else {
            setOrderTimeToggler({
                isActive: true,
                // currentDay: new Date(),
                description: "Свернуть время"
            })
            // for (let i = orderTime.currentDay.getMonth(); i < 12; i++) {
            //     console.log(i)
            // }
            // // setOrderTimeToggler({...orderTime, })
        }
    }
    const setYear = (yearValue) => {
        setOrderTime({ ...orderTime, year: yearValue })
        console.log(currentDay.getFullYear())
        if (currentDay.getFullYear() === currentDay.getFullYear) {
            console.log("current year")
        }
        // NOT WORKING:!!!
        // if (dateValue === orderTimeToggler.currentDay.getFullYear()) {
        //     monthOption = monthOption.slice(12-orderTimeToggler.currentDay.getMonth())
        // }
    }
    const setMonth = (monthValue) => {
        console.log(orderTime.year, monthValue, ":")
        let maxDate = new Date(orderTime.year, monthValue, 0)

        console.log(maxDate.getDate())

        setOrderTime({ ...orderTime, month: (monthValue - 1) })
    }
    const setDate = (dateValue) => {
        setOrderTime({ ...orderTime, date: dateValue })
    }

    return (
        <div>
            <div className='service_cards' >
                <div className="service_description">
                    <p>Название услуги: {service.ServiceName}</p>
                    <p>Стоимость услуги: {service.Price} BYN</p>
                    <p>Продолжительность: {service.ServiceTime}</p>
                </div>

                <button
                    className="service_btn"
                    onClick={activateOrderTime}
                >
                    {orderTimeToggler.description}
                </button>
            </div>
            {orderTimeToggler.isActive
                ? <div>
                    <p>Выберите год</p>
                    <select value={currentDay.getFullYear()} onChange={(e) => setYear(e.target.value)}>
                        {years.map((val) => {
                            return <option key={val} value={val}>{val}</option>
                        })}
                    </select>
                    <p>Выберите месяц</p>
                    <select onChange={(e) => setMonth(e.target.value)}>
                        {months.map((val, i) => {
                            return <option key={val} value={i}>{val}</option>
                        })}
                    </select>
                    <p>Выберите день</p>
                    <select value={1} onChange={(e) => setDate(e.target.value)}>
                        { }
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                    <button
                        onClick={() => console.log(orderTime)}
                    >
                        Показать доступное время для записи
                    </button>
                </div>
                : null
            }
        </div>
    )
}

export default Service