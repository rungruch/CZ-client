import {useNavigate } from "react-router-dom";
import "../component/Ticket.css";
import moment from 'moment';
import { useEffect, useState } from "react";
const Ticket = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/buy");
  }
  const [selectIndTicket, setselectIndTicket] = useState([]);
  const [selectFamTicket, setselectFamTicket] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      //let formattedDate = moment(selectedDate.toString()).format('YYYY-MM-DD');
      // const Inddata = await TicketLoader("Individual",formattedDate);
      // const Famdata = await TicketLoader("Family",formattedDate);
      const Inddata = await TicketLoader("Individual","2023-04-23");
      const Famdata = await TicketLoader("Family","2023-04-23");
      
      setselectIndTicket(Inddata[0]);
      setselectFamTicket(Famdata[0]);
    };
    fetchData();
  }, []);


  return (
    <>
    <div className="ticket-container">
      <h1>Admission Tickets</h1>
      <div className="ticket-content" id="Individual" onClick={handleClick}>
          <div className="ticketbox">
          <img src='/img/assets|ticket|indiv.jpg' alt="exhibitonimg" className="unselectable ticketimg"/>
          <div className="ticketdetails">
          <h2>Individual</h2>
            <div className="ticketprice">
            <h3>Adult</h3>
            <h3>{selectIndTicket.Price}  THB</h3>
            </div>
            <p>(Free if charge for child height under 90 cm.)</p>
            <p>(Child height between 91 - 140 cm. is considered to be charged as child rate)</p>
            <p>(Adult tickets are applied for children over 141 cm tall)</p>
          </div>  
          </div>
          <div className="ticketbox" id="Family" onClick={handleClick}>
          <img src='/img/assets|ticket|family.jpeg' alt="exhibitonimg" className="unselectable ticketimg"/>
          <div className="ticketdetails">
          <h2>Family</h2>
            <div className="ticketprice">
            <h3>2 Adults + 2 Children </h3>
            <h3>{selectFamTicket.Price} THB</h3>
            </div>
            <p>(Free if charge for child height under 90 cm.)</p>
            <p>(Child height between 91 - 140 cm. is considered to be charged as child rate)</p>
            <p>(Adult tickets are applied for children over 141 cm tall)</p>
          </div>
          </div>

        </div>
      </div>
    </>
  );
};
export default Ticket;


export const TicketLoader = async (ticketType,TDate) => {
	const res = await fetch('/api/ticket/' + ticketType+'/'+TDate)
	let ticket = await res.json()
	if (!res.ok) {
		throw Error(ticket.error)
	}
	return ticket
}