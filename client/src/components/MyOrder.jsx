import React from "react";

const MyOrder = ({ value }) => {
    const getDate = (date) => {
        console.log(date)
        if (date > 360000000) {
            return new Date(+date).getDate() + "." + (+(new Date(+date).getMonth())+1) + "." + new Date(+date).getFullYear() + " - " +  (+new Date(+date).getHours()) + "ч " + (new Date(+date).getMinutes()) + "мин"
        }
        return (new Date(date).getUTCHours()) + "ч " + (new Date(date).getUTCMinutes()) + "мин"
    }
    return (
        <div className="orders_cards" key={value.id}>
            <div className="orders_cards_content">
                [id:{value.id}] - {value.statusName}
                <p>{value.saloonName} - {value.serviceName}</p>
                <p>{value.name}</p>
                <p>Дата: {getDate(value.date)}</p>
                <p>Продолжительность: {getDate(value.time)}</p>
            </div>
        </div>
    )
}

export default MyOrder