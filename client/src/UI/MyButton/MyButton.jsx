import React from "react";
import buttonStyle from "./MyButton.module.css"

const MyButton = ({children, props}) => {
    return (
        <button {...props} className={buttonStyle.btn}>{children}</button>
    )
}

export default MyButton