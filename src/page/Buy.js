import '../component/account.css';
import '../component/Buy.css';
import BuyContainerBread from '../component/Buybreadcrumb';
import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import moment from 'moment';
import BuySelectDate from '../component/BuySelectDate';
import BuySelectTicket from '../component/BuySelectTicket';
import { useAuth } from "../utils/AuthProvider";

const AquariumTicketPurchase = () => {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState('');
    const [intensive, setIntensive] = useState('Normal');
    const [selectedTickets, setSelectedTickets] = useState([]);

    const [Individual, setIndividual] = useState(0);
    const [Family, setFamily] = useState(0);
    const [IndividualPrice, setIndividualPrice] = useState(0);
    const [FamilyPrice, setFamilyPrice] = useState(0);
    let auth = useAuth();
   
    const navigate = useNavigate();
    async function createTransaction(newTransaction) {
      try {
        let response = await fetch('/api/transactions/', {
          method: 'POST',
          body: JSON.stringify(newTransaction),
          headers: new Headers({ 'Content-Type': 'application/json' }),
        }).then((res) => {
          if (!res.ok) {
            throw Error({ error: `Could not add new product ${newTransaction.Transactionid}` })
          }
          return res.json()
        })
        navigate('/account/myticket/'+auth.user?.id);
      } catch (error) {
        console.error('Error:', error)
      }
    }

  async function handleCheckout() {
    const genId = () => Math.random().toString(36).substring(2, 9)

    if(Individual >0){

        let transaction = { 
            Transactionid: genId(),
            id: auth.user?.id,
            Ticketid: "Individual",
            quantity: Individual,
            TotalPrice:(Individual*IndividualPrice),
            VisitDate: moment(selectedDate.toString()).format("YY-MM-DD"),
            Timestamp: moment(),
         }
         await createTransaction(transaction)
    }
    if(Family >0){
        let transaction = { 
            Transactionid: genId(),
            id: auth.user?.id,
            Ticketid: "Family",
            quantity: Family,
            TotalPrice:(Family*FamilyPrice),
            VisitDate: moment(selectedDate.toString()).format("YY-MM-DD"),
            Timestamp: moment(),
         }
         await createTransaction(transaction)
    }
  };



  return (
    <>
      <div className="Buy-Container">
        <div className="Buy-ContainerMain">
          <h1>Purchase Ticket</h1>
          <div className="Buy-line" />
          <div className='BuyContent'>
            {step === 1 && (
            <BuySelectDate selectedDate={selectedDate} setSelectedDate={setSelectedDate}  intensive={intensive} setIntensive={setIntensive} step={step} setStep={setStep}/>
            )}
            {step === 2 && (
             <BuySelectTicket BuySelectDate selectedDate={selectedDate} setSelectedDate={setSelectedDate}  intensive={intensive} setIntensive={setIntensive} step={step} setStep={setStep} 
             Individual={Individual} setIndividual={setIndividual} setIndividualPrice={setIndividualPrice} 
             Family={Family} setFamily={setFamily} setFamilyPrice={setFamilyPrice} />
            )}
            {step === 3 && (
                <div  className='BuyContentMain'>
                <h2>Summary:</h2>
                <p>{moment(selectedDate.toString()).format("dddd LL")}</p>
                <div className="Buy-ticket-line" />
                <br/>
                
                <div className="Buy-ticket-Option">
                <h3>{"Individual"}</h3>
                <p>{"x"+Individual}</p>
                <p className='TotalPrice'>{(IndividualPrice * Individual) +" THB"}</p>
                </div>
             
    
                <div className="Buy-ticket-line" />
                <div className="Buy-ticket-Option">
                <h3>Family</h3>
                <p>{"x"+Family}</p>
                <p className='TotalPrice'>{(FamilyPrice * Family) +" THB"}</p>
                </div>
                <div className="Buy-ticket-line" />
                <div className="Buy-ticket-Option">
                <h2>Total</h2>
                <h2 >{((FamilyPrice * Family)+(IndividualPrice*Individual)) +" THB"}</h2>
                </div>
                <button className='buybtn' onClick={handleCheckout}>Checkout</button>
              </div>
            )}
             <div className="Buy-ContainerBread">
                <h4>Your Purchase</h4>
            <BuyContainerBread step={step} setStep={setStep} selectedDate={selectedDate} setSelectedDate={setSelectedDate} selectedTickets={selectedTickets} setSelectedTickets={setSelectedTickets}/>
            </div>

          </div>
          
        </div>
       

        
        </div>
        <Outlet />
        </>
    
   
  );
};

export default AquariumTicketPurchase;



