import React, { useEffect, useMemo, useState } from "react";
import Master from "./Master";
import { useFetching } from "../hooks/useFetching";
import { useSelector } from "react-redux";
import axios from "axios";
import MasterCreaterForm from "./MasterCreaterForm";

const MastersBox = ({ isLoading, services, saloonId }) => {
    const loginStore = useSelector((state) => state)
    const [isSaloonAdmin, setSaloonAdmin] = useState(false)
    const [checkAdminAccess, isConfirming, error] = useFetching(async () => {
        if (loginStore.role === undefined || +loginStore.role !== 2 || saloonId === undefined) {
            return
        } else {
            const response = (await axios(`http://localhost:5000/api/saloons/getAdminAccess/${loginStore.login}/${loginStore.pass}/${saloonId}`)).data
            if (response.status === 0) {
                setSaloonAdmin(false)
                return
            } else {
                setSaloonAdmin(true)
            }
        }
    })
    useEffect(() => {
        checkAdminAccess()
    }, [loginStore.role])
    return (
        <div>
            {isSaloonAdmin
                ? <MasterCreaterForm saloonId={saloonId} />
                : null
            }
            {(services.length === 0)
                ? <p> Loading </p>
                : services.map((val) => {
                    return <Master isSaloonAdmin={isSaloonAdmin} val={val} key={val.id} saloonId={saloonId} />
                })
            }
        </div>
    )
}

export default MastersBox