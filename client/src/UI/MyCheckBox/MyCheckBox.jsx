import React from "react";
import inputStyle from "./MyCheckBox.module.css"

const MyInput = (props) => {
    return (
        <div>
            <input value={props.id} name={props.id} type="checkbox" {...props} className={inputStyle.inpt} />
            <label htmlFor={props.id}>{props.description}</label>
        </div>
    )
}

export default MyInput