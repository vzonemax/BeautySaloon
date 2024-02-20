import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetching } from "../hooks/useFetching";
import axios from "axios";
import MyOrder from "../components/MyOrder";
import SaloonOrders from "../components/SaloonOrders";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
    const loginStore = useSelector((state) => state)
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [orderStatuses, setOrderStatuses] = useState([])
    const [selectedMap, setSelectedMap] = useState({
        myOrderStyle: "tab_btn tab_btn_active",
        saloonOrderStyle: "tab_btn",
        isMyOrder: true,
    })

    // const [getOrders, isLoading, error] = useFetching(async () => {
    //     const response = (await axios(`http://localhost:5000/api/orders/getClientOrders/${loginStore.login}/${loginStore.pass}`))
    //     if (response.data !== 0) {
    //         setOrders(response.data)
    //     }
    // })

    const loadMyOrders = async () => {
        setSelectedMap({
            myOrderStyle: "tab_btn tab_btn_active",
            saloonOrderStyle: "tab_btn",
            isMyOrder: true,
        })
        const response = (await axios(`http://localhost:5000/api/orders/getClientOrders/${loginStore.login}/${loginStore.pass}`))
        if (response.data !== 0) {
            setOrders(response.data)
        }
    }

    const loadSaloonOrders = async () => {
        setSelectedMap({
            myOrderStyle: "tab_btn",
            saloonOrderStyle: "tab_btn tab_btn_active",
            isMyOrder: false,
        })
        const response = (await axios(`http://localhost:5000/api/orders/getSaloonOrders/${loginStore.login}/${loginStore.pass}`))
        if (response.data !== 0) {
            setOrders(response.data)
        }
    }

    const loadOrderStatuses = async () => {
        const response = (await axios(`http://localhost:5000/api/statuses/get/`))
        setOrderStatuses(response.data)
    }


    useEffect(() => {
        if (!loginStore.isAuth) {
            navigate("/auth")
        }
        loadMyOrders()
        loadOrderStatuses()
    }, [loginStore])

    return (
        <div className="App">
            <h2>Записи на услуги</h2>
            <div className="tab">
                <div className="tab_nav">
                    <button onClick={loadMyOrders} className={selectedMap.myOrderStyle}>Мои записи</button>
                    {loginStore.role === 0
                        ? null
                        : <button onClick={loadSaloonOrders} className={selectedMap.saloonOrderStyle}>Записи пользователй в салон красоты</button>
                    }
                </div>
                <div className="tab_content">
                        {selectedMap.isMyOrder
                            ? orders.map(value => {
                                return (
                                    <MyOrder key={value.id} value={value} />
                                )
                            })
                            : orders.map(value => {
                                return (
                                    <SaloonOrders key={value.id} value={value} orderStatuses={orderStatuses} />
                                )
                            })
                        }
                    </div>

            </div>
        </div>
    )
}

export default OrdersPage