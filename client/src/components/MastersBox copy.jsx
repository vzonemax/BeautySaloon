import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import { useFetching } from "../hooks/useFetching";
import Master from "./Master";

const MastersBox = ({ isLoading, services }) => {

    // const [fetchService, isLoading, error] = useFetching(async () => {
    //     const response = await axios("http://localhost:5000/api/saloons/get")
    //     setSaloons(response.data)
    //     setSearchedSaloons(response.data)
    //   })

    // const [togglerSwitch, setTogglerSwitch] = useState({
    //     isMaster: true,
    //     masterStyle: 'toggle_btn toggle_btn_active',
    //     serviceStyle: 'toggle_btn',
    // })

    // const handleSetIsMasterToggle = (value, e) => {
    //     if (togglerSwitch.isMaster === value) {
    //         return
    //     }
    //     console.log(value)
    //     setTogglerSwitch({
    //         isMaster: value,
    //         masterStyle: togglerSwitch.serviceStyle,
    //         serviceStyle: togglerSwitch.masterStyle
    //     })
    // }

    // useMemo(() => {
    //     console.log("toggle", togglerSwitch.isMaster)
    // }, [togglerSwitch])

    return (
        <div>
            {/* <div className="toggle">
                <button onClick={(e) => handleSetIsMasterToggle(true)} className={togglerSwitch.masterStyle}>Мастера</button>
                <button onClick={(e) => handleSetIsMasterToggle(false)} className={togglerSwitch.serviceStyle}>Услуги</button>
            </div> */}
            {(services.length === 0)
                ? <p> Loading </p>
                : services.map((val) => {
                    return <Master val={val} key={val.id} />
                })
            }
        </div>
    )
}

export default MastersBox