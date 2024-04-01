import { useEffect, useState } from 'react';
import Modal from "react-modal";
const EditTicket =({ticketEdit, setTicketEdit, ticket, setTicket , setStage})=>{
    
    const [quantity , setQuantity]= useState(ticketEdit.Remaining);
    const [price , setPrice]=useState(ticketEdit.Price)
    const [date , setDate]= useState(ticketEdit.Date)
    const [showModal , setShowModal] = useState(false)
    const [success , setSuccess] = useState(false)
    const [allertMessage , setAllertMessage] = useState('')

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
          width: "350px",
          height:"300px"
        },
      };

    const QuantityHandle = (e)=>{
        let newval = e.currentTarget.value;
        if (newval === "")        
        {
            setQuantity(0)
        }
        else if (newval.length>1 && newval.startsWith("0"))
        {
            setQuantity(newval.slice(1))
        }
        else
        {
            setQuantity(newval)
        }
    }
    const PriceHandle = (e)=>
    {
        let newval = e.currentTarget.value;
        if (newval === "")        
        {
            setPrice(0)
        }
        else if (newval.length>1 && newval.startsWith("0"))
        {
            setPrice(newval.slice(1))
        }
        else
        {
            setPrice(newval)
        }
    }
    
    const updatetoDB = async(data)=>{
        try{
            let response = await fetch('/api/ticket/'+ticketEdit.Ticketid,{
                method: "PUT",
                body : JSON.stringify(data),
                headers: new Headers({ 'Content-Type': 'application/json' })

            }).then((res) =>{
                if(!res.ok)
                {
                    throw Error({error:"could not add new Ticket"})
                    
                }
                return res.json()
            })
          setAllertMessage("Update success");
          setSuccess(true);
        }
        catch(err)
        {
            throw Error("Error with update")
        }
        
    }
    const upDateTicket= ()=>{
        const ticketUpdate = ticket.map((ticket)=>{
            if (ticket.Ticketid===ticketEdit.Ticketid)
            {
                console.log("aaa")
                console.log(ticket)
                return {...ticket,...ticketEdit}
                
            }
            return ticket
        })
        setTicket(ticketUpdate)
    }   

    const Update = async ()=>
    {
        if(price >0 && quantity >0)
        {
        const data ={
            
                Ticketid : ticketEdit.Ticketid,
                TicketType :ticketEdit.TicketType,
                Date :ticketEdit.Date,
                Price :price,
                Remaining :quantity,
        }
        await updatetoDB(data)
        setTicketEdit(data)
        setShowModal(true);
        }
        else{
            setAllertMessage("Price and quantity must greater than 0")
            setSuccess(false)
            setShowModal(true);
        }
    }

    useEffect(()=>{
        upDateTicket();
    },[ticketEdit])

    const handleEndTransaction = ()=>
    {
        if(success)
        {
            setShowModal(false)
            setStage(2)
        }
        else{
            setShowModal(false)
        }
    }

    return (
        <>
        {
            showModal&&(
                <>
                     <Modal style={customStyles} isOpen={showModal}>
                        <div className='nonti-popup'>
                            <h1>{allertMessage}</h1>
                            <div className='button-container'>
                                <button onClick={()=>{
                                    handleEndTransaction()
                                }}>OK!</button>
                            </div>
                        </div>
                     </Modal>
                </>
            )
        }
            <div className='edit-showinfo-container'>
                <h2>You will Edit Ticket refer to</h2>
                <h2>Date : {date}</h2>
                <h2>Type : {ticketEdit.TicketType}</h2>
            </div>
            <div className='editticket-container'>
                <div className='box'>
                <h2>Quantity</h2>
                    <form>                       
                            <input type="number" id="quantity" name="quantity" value={quantity} onChange={QuantityHandle}  min="0" />
                                                    
                    </form>
                </div>
                <div className='box'>
                <h2>Price</h2>
                    <form>
                        <input type="number" id="Price" name="price"  min="0"  value={price} onChange={PriceHandle}/>
                    </form>
                </div>
                <div className='button-container'>
                    <button onClick={Update} >Save</button>
                    <button onClick={()=>{setStage(2)}}>Cancel</button>
                </div>
            </div>
        </>
    )
   
}

export default EditTicket