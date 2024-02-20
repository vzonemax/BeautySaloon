import React, {useState, useEffect} from "react";
import OrderTime from "./OrderTime";
import { useFetching } from "../hooks/useFetching";
import axios from "axios";

const DateSelector = ({ workDates, orderTimeToggler, freeTime, setFreeTime, serviceId, masterId }) => {

    const currentDay = new Date()
    const years = [currentDay.getFullYear(), currentDay.getFullYear() + 1]
    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
    
    const [selectedDate, setSelectedDate] = useState({
        year: currentDay.getFullYear(),
        month: currentDay.getMonth(),
        day: currentDay.getDate(),
    })    
    const [currentMonths, setCurrentMonths] = useState(months.slice(currentDay.getMonth()))
    const [currentDates, setCurrentDates] = useState([])
    
    const handlerSetYear = (yearValue) => {
        if (currentDay.getFullYear() === +yearValue) {
            setCurrentMonths(months.slice(currentDay.getMonth()))
        } else {
            setCurrentMonths([...months])
        }
        setSelectedDate({ ...selectedDate, "year": +yearValue, "month": currentDay.getMonth() })
    }
    const handlerSetMonth = (monthValue) => {
        setSelectedDate({ ...selectedDate, "month": +monthValue })
    }
    const [getFreeTime, isLoading, error] = useFetching(async () => {
        const day = new Date(selectedDate.year, selectedDate.month, selectedDate.day).getTime()
        const response = await axios(`http://localhost:5000/api/masters/getfreetime/${masterId}/${serviceId}/${day}`)
        setFreeTime(response.data)
    })
    useEffect(() => {
        const masterWorkDays = []
        const selectDay = new Date(selectedDate.year, selectedDate.month + 1, 0)
        let startIndex = 1
        if (currentDay.getFullYear() === selectedDate.year && currentDay.getMonth() === selectedDate.month) {
            startIndex = currentDay.getDate()
        }
        for (let i = startIndex; i < selectDay.getDate(); i++) {
            if (workDates.includes(new Date(selectedDate.year, selectedDate.month, i).getDay())) {
                masterWorkDays.push(i)
            }
        }
        setCurrentDates(masterWorkDays)
    }, [selectedDate.year, selectedDate.month])

    useEffect(() => {
        setSelectedDate({ ...selectedDate, "day": currentDates[0] })
    }, [currentDates])

    useEffect(() => {
        if (orderTimeToggler.isActive) {
            getFreeTime()
        }
    }, [orderTimeToggler, selectedDate.day])

    return (
        <div>
            <div className="order_time_selector">
                <div className="order_time_selector_item">
                    <p>Выберите год</p>
                    <select value={selectedDate.year} onChange={(e) => handlerSetYear(e.target.value)}>
                        {years.map((val) => {
                            return <option key={val} value={val}>{val}</option>
                        })}
                    </select>
                </div>
                <div className="order_time_selector_item">
                    <p>Выберите месяц</p>
                    <select value={selectedDate.month} onChange={(e) => handlerSetMonth(e.target.value)}>
                        {currentMonths.map((val, i) => {
                            return <option key={val} value={i}>{val}</option>
                        })}
                    </select>
                </div>
                <div className="order_time_selector_item">
                    <p>Выберите день</p>
                    <select value={selectedDate.day} onChange={(e) => setSelectedDate({ ...selectedDate, "day": e.target.value })}>
                        {currentDates.map((val, i) => {
                            return <option key={val} value={val}>{val}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="order_times">
                {isLoading || freeTime.length === 0
                    ? <p>На эту дату окошки не найдены</p>
                    // : null
                    : freeTime.map(val => {
                        return <OrderTime time={val} />
                    })
                }
            </div>
        </div>
    )
}

export default DateSelector