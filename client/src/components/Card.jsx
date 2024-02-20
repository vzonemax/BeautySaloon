import React from "react";
import MyButton from "../UI/MyButton/MyButton";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
    const router = useNavigate()
    return (
        <div onClick={()=>router(`/saloons/${props.val.idSaloon}`)} className='cards' key={props.val.idSaloon}>
            <img className='card_image' src={props.val.saloonImage} alt='no image' />
            <div className='card_description'>
                <h2>{props.val.SaloonName}</h2>
                <p>{props.val.SaloonDescription}</p>
            </div>
            {/* <div className='saloon_btns'>
                <MyButton>Выбрать услугу</MyButton>
                <MyButton>Выбрать мастера</MyButton>
            </div> */}
        </div>
    )
}

export default Card