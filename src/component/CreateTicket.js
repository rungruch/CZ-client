import React,{useEffect, useState} from "react"
import AddTicketSelectDate from "./AddTicketSelectDate.js"
import './addticket.css'
import AddTicketSelectAmount from "./AddTicketSelectAmount.js"
import AddTicketShowinfo from "./AddticketShowinfo.js"
import { useNavigate } from "react-router-dom"
import Modal from "react-modal";

const CreateTicket = ({setTicket})=>{
    
    const [date , setDate]= useState('');
    const [FamilyAmount , setFamilyAmount] = useState(0)
    const [IndividualAmount , setIndividualAmount] = useState(0)
    const [FamilyPrice , setFamilyPrice] = useState(900)
    const [IndividualPrice , setIndividualPrice] = useState(400)
    const [showPopup, setShowPopup] = useState(false)
    const [allertMessage , setalert ]= useState()
    const [success,setSuccess] =useState(false);
    const navigate=useNavigate();

    const handleEndTransaction = ()=>
    {
        console.log(success)
        if(success)
        {
            setFamilyAmount(0)
            setFamilyPrice(0)
            setIndividualAmount(0)
            setIndividualPrice(0)
            setShowPopup(false);
            setSuccess(false);
        }
        else
        {
            setShowPopup(false)
        }
    }
    
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
          height : "300px"
        },
      };

    const createTicket = async (newTicket)=>{
        try{
            let response = await fetch('https://cz-server-rungruch.azurewebsites.net/api/ticket',{
                method: "POST",
                body : JSON.stringify(newTicket),
                headers: new Headers({ 'Content-Type': 'application/json' })

            }).then((res) =>{
                if(!res.ok)
                {
                    setSuccess(false)
                    throw Error({error:"could not add new Ticket"})
                    
                }
                return res.json()
            })
            setTicket(ticket=>[...ticket,newTicket])
            
        }
        catch (err)
        {
            console.error("error"+err)
        }
    }

    const genTicketid = async()=>
    {
        let res = await fetch('https://cz-server-rungruch.azurewebsites.net/api/ticket')
        if(!res.ok)
        {
            throw Error("cannot fetch ticket")
        }
        const data = await res.json()
        
        if(data.length===0)
        {
            return "10000"
        }
        else{
            let oldid = parseInt(data[data.length-1].Ticketid)
            oldid=oldid+1;
            return  oldid.toString()
        }
    }

    const handleCreate = async ()=>{
        let genid;
        if(date === '')
        {
            setalert("Date must be fill.")
            setShowPopup(true)
            return;
        }
        
        if(IndividualAmount===0 && FamilyAmount===0)
        {
            setalert("Quantiy Must Fill")
            setShowPopup(true)
            return;
        }
        if(IndividualAmount > 0 && date!=='')
        {
            genid= await genTicketid()
            let addTicket = {
                Ticketid:genid,
                TicketType :"Individual",
                Date:date,
                Price : IndividualPrice,
                Remaining : IndividualAmount

            }
            await createTicket(addTicket)     
            setSuccess(true)
            setalert("Add ticket was successful")
            
        }
        if(FamilyAmount > 0 && date!=='')
        {
            genid= await genTicketid()
            let addTicket = {
                Ticketid:genid,
                TicketType :"Family",
                Date:date,
                Price : FamilyPrice,
                Remaining : FamilyAmount

            }
            await createTicket(addTicket)
            setSuccess(true)
            setalert("Add ticket was successful")
            
        }
      
    }
    
    useEffect(()=>{
        setShowPopup(success)
    },[success])

    return(
        
        <>
        
        {
            
            showPopup&&(
                <>
                
                    <Modal style={customStyles} isOpen={showPopup}>
                    <div className="nonti-popup">
                        <h1>{allertMessage}</h1>
                        <div className="button-container">
                            <button onClick={()=>{handleEndTransaction()}}>OK!</button>
                        </div>
                    </div>
                    </Modal>
                
                </>
            )
        }
       
        
            <AddTicketSelectDate date={date} setDate={setDate}/>
            <div className="addticketoption">
                <h1>Select Quantity & Price</h1>
            <AddTicketSelectAmount FamilyAmount={FamilyAmount} IndividualAmount={IndividualAmount} FamilyPrice={FamilyPrice} IndividualPrice={IndividualPrice}
                setFamilyAmount={setFamilyAmount} setIndividualAmount={setIndividualAmount} setFamilyPrice={setFamilyPrice} setIndividualPrice={setIndividualPrice}
            />
            
            </div>
            <div className="show-info">
            <AddTicketShowinfo date={date} FamilyAmount={FamilyAmount} IndividualAmount={IndividualAmount} FamilyPrice={FamilyPrice} IndividualPrice={IndividualPrice} />
            <button className="create-button" onClick={handleCreate}>Create Ticket</button>
        
        
        </div>
               
        </>
    )
}
export default CreateTicket