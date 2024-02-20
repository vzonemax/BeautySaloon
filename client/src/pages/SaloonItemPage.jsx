import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import axios from "axios";
import Card from "../components/Card";
import MastersBox from "../components/MastersBox";

const ServicesPage = () => {
    const [saloon, setSaloon] = useState({})
    const [services, setServices] = useState([])

    const params = useParams()

    const [getService, isLoading, error] = useFetching(async () => {
        const response = await axios("http://localhost:5000/api/services/get/" + params.saloonId)
        setSaloon(response.data["saloon"][0])
        setServices(response.data["masters"])
    })

    useEffect(() => {
        getService()
    }, [])


    return (
        <div className="App">
            <h2>На этой странице вы можете ознакомиться с услугами {saloon.SaloonName} и произвести запись</h2>
            {(isLoading)
                ? <p>Loading</p>
                :
                <div> 
                    <Card val={saloon} />
                    <div>
                        <MastersBox saloonId={saloon.idSaloon} isLoading={isLoading} services={services} />

                    </div>
                </div>
            }

        </div>
    )
}

export default ServicesPage