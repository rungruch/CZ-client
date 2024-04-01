import { useEffect, useState } from "react"
import { useLoaderData,useNavigate } from "react-router-dom"
import React from "react"
import CreateTicket from "../component/CreateTicket"
import MenuEditTicket from "../component/MenuEditTicket"
import ShowEditTicket from "../component/ShowEditTicket"
import EditTicket from "../component/EditTicket"
import "../component/addticket.css"
import { useAuth } from "../utils/AuthProvider"


const ManageTicket = ()=>{

    const [ticket , setTicket]=useState(useLoaderData());
    const [stage , setStage] = useState(1);
    const [ticketEdit , setTicketEdit]=useState({});
    const auth= useAuth();
    const navigate=useNavigate;

    useEffect(()=>{
        if(!auth.user?.email)
        {
            navigate('/')
        }
    },[])

    return(
        
        <>
         <div className="addticket-container">
         <div className='select-info'>
            {
                stage === 1&&(
                    <>                    
                    <CreateTicket setTicket={setTicket}/>
                    </>
                )
            }
            {
                stage=== 2 &&(
                    <>
                        <ShowEditTicket ticket={ticket} setTicket={setTicket} setStage={setStage} setTicketEdit={setTicketEdit}/>
                    </>
                )
            }
            {
                stage===3 &&(
                    <EditTicket ticketEdit={ticketEdit} setTicketEdit={setTicketEdit} ticket={ticket} setTicket={setTicket} setStage={setStage}/>
                )
            }
         </div>
         <div className="ticket-menu">
            <MenuEditTicket stage={stage} setStage={setStage}/>
         </div>   
         </div>
        </>
    )
}

export default ManageTicket

export const ticketmanageLoader = async ()=>{

    const res = await fetch("https://cz-server-rungruch.azurewebsites.net/api/ticket")
    if (!res.ok)
    {
        throw Error("Cannot fect ticket")
    }
    return res.json()

}