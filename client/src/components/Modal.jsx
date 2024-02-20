import React from "react"
import { createPortal } from "react-dom"

const Modal = ({ children, onClose }) => {

    const modalElement = document.querySelector("#modal")
    return createPortal(
        (
            <div className="modal">
                <div className="outer_modal">
                    <div className="inner_modal">
                        {children}
                        <button className="auth_btn" onClick={() => onClose()}>Закрыть</button>
                    </div>
                </div>
            </div>
        ), modalElement)
}

export default Modal