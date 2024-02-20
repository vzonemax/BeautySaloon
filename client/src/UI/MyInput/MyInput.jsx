import React from "react";
import inputStyle from "./MyInput.module.css"


const MyInput = (props) => {
    return (
        <input {...props} className={inputStyle.inpt} />
    )
}

export default MyInput