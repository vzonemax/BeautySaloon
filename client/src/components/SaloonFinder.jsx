import React from "react";
import MyInput from "../UI/MyInput/MyInput";

const SaloonFinder = ({ saloonFilter, setSaloonFilter }) => {
    const handlerChange = (e) => {
        setSaloonFilter(e.target.value)
    }
    return (
        <MyInput
            type="text"
            placeholder="Поиск"
            value={saloonFilter}
            onChange={handlerChange}
        />
    )
}

export default SaloonFinder