import { useState } from "react"
import Modal from "react-modal";

const ShowEditTicket = ({ticket , setTicket , setStage ,setTicketEdit})=>{

    const[confirmDelte,setConDel] = useState(false);
    const[showModal , setShowModal] = useState(false);
    const [ticketDel , setTicketDel] = useState({});

    const customStyles = {
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          height: "300px"
        },
      };
    const onEditpress = (e)=>{
        setTicketEdit(e)
        setStage(3)
       
    }

    const afterDeleted = (id)=>{

        let newTickets = ticket.filter(ticket=>ticket.Ticketid!==id)
        setTicket(newTickets)

    }
    const deleteTicket = async(id)=>{
        let ticketRemove={
            Ticketid : id
        }
        try{
        let respose = await fetch('/api/ticket/'+id,{
            method:"DELETE",
            body : JSON.stringify(ticketRemove),
            headers: new Headers({ 'Content-Type': 'application/json' })
        }).then((res) =>{
            if(!res.ok)
            {
                throw Error({error:"could not add new Ticket"})
                
            }
            return res.json()
        })
        afterDeleted(id);
        
        }
        catch (err)
        {
            console.error("error"+err)
        }
    }   
    

    const list = ticket.map((ticket)=>(
        <div key={ticket.Ticketid} className="ticket-card">
            <h3>{ticket.Date}</h3>
            <h3>{ticket.TicketType}</h3>
            <h3>{ticket.Price}</h3>
            <h3>{ticket.Remaining}</h3>
            <button onClick={()=>{onEditpress(ticket)}}>Edit</button>
            <button onClick={()=>{setTicketDel(ticket); setShowModal(true)}}>Delete</button>
        </div>
    ))

    return (
        <>
        {
            showModal&&(
                <Modal style={customStyles} isOpen={showModal}>
                    <div className="nonti-popup">
                    <h1>Are you sure you want to deleted Ticket</h1>
                        <div className="button-container">
                            <button onClick={()=>{deleteTicket(ticketDel.Ticketid) ; setShowModal(false)}}>Sure!</button>
                            <button onClick={()=>{setTicketDel({}); setShowModal(false)}}>cancel</button>
                        </div>
                    </div>
                </Modal>
            )
        }
        <div className="list-ticket">
            <div className="ticket-card">
            <h3>Date</h3>
            <h3>Type</h3>
            <h3>Price</h3>
            <h3>Remaining</h3>
            </div>
            {list}
        </div>
        </>
    )
}

export default ShowEditTicket