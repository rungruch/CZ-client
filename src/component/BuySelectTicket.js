import React, { useEffect, useState } from 'react';
import moment from 'moment';

const BuySelectTicket = ({ selectedDate, setSelectedDate,intensive,setIntensive,setStep,step,selectedTickets,setTotalPrice,
    Individual,setIndividual,setIndividualPrice,setFamilyPrice, Family,setFamily,selectIndTicket, selectFamTicket,setselectIndTicket,setselectFamTicket
}) => {
    
    // const [IndividualQuan, setIndividualQuan] = useState(0)
    // const [FamilyQuan, setFamilyQuan] = useState(0);

    const InhandleIncrease = () => {
        if(selectIndTicket.Remaining > document.getElementById('Individual-quantity').value )
        // document.getElementById('Individual-quantity').value = +document.getElementById('Individual-quantity').value + 1;
        setIndividual(+document.getElementById('Individual-quantity').value + 1);
      };
    
      const InhandleDecrease = () => {
        if (+document.getElementById('Individual-quantity').value >= 1 ) {
            // document.getElementById('Individual-quantity').value = +document.getElementById('Individual-quantity').value - 1;
            setIndividual(+document.getElementById('Individual-quantity').value - 1);
        }
      };
      const FamhandleIncrease = () => {
        if(selectFamTicket.Remaining > document.getElementById('Family-quantity').value )
        // document.getElementById('Family-quantity').value = +document.getElementById('Family-quantity').value + 1;
        setFamily(+document.getElementById('Family-quantity').value + 1);
      };
    
      const FamhandleDecrease = () => {
        if (+document.getElementById('Family-quantity').value >= 1) {
            // document.getElementById('Family-quantity').value = +document.getElementById('Family-quantity').value - 1;
            setFamily(+document.getElementById('Family-quantity').value - 1);
        }
      };

      const handleCheckout = () => {
        if (Individual > 0 || Family > 0) {
            setIndividualPrice(selectIndTicket.Price)
            setFamilyPrice(selectFamTicket.Price)
            setStep(3)
        }
      };



      useEffect(() => {
        const fetchData = async () => {
          let formattedDate = moment(selectedDate.toString()).format('YYYY-MM-DD');
          let Inddata = await TicketLoader("Individual",formattedDate);
          let Famdata = await TicketLoader("Family",formattedDate);

          // const Inddata = await TicketLoader("Individual","2023-04-23");
          // const Famdata = await TicketLoader("Family","2023-04-23");
          setselectIndTicket(Inddata[0]);
          setselectFamTicket(Famdata[0]);
        };
        fetchData();
      }, []);


    return (
       <>
        <div  className='BuyContentMain'>
                <h2>Select your tickets:</h2>
                <p>{moment(selectedDate.toString()).format("dddd LL")}</p>
                <div className="Buy-ticket-line" />
                <br/>
                
                <div className="Buy-ticket-Option">
                <h3>{"Individual"}</h3>
                {selectIndTicket.Remaining > 0 ? (
                 <form> 
                     <button type="button" onClick={InhandleDecrease}>-</button>
                     <input type="number" id="Individual-quantity" name="quantity"  value={Individual} readOnly min="0" max={selectIndTicket.Remaining}/>
                     <button type="button" onClick={InhandleIncrease}>+</button>
                 </form>
                ) : (
                    <p className='outOfticket'>Running out of tickets!</p>
                )}
                <p>{selectIndTicket.Remaining > 0 ? (
                      selectIndTicket.Price+" THB"
                ) : (null)}
                  </p>
                <p className='TotalPrice'>{selectIndTicket.Remaining > 0 ? (selectIndTicket.Price * Individual +" THB")
                : (null)
              }</p>
                </div>
             
    
                <div className="Buy-ticket-line" />
                <div className="Buy-ticket-Option">
                <h3>Family</h3>
                {selectFamTicket.Remaining > 0 ? (
                      <form> 
                      <button type="button" onClick={FamhandleDecrease}>-</button>
                      <input type="number" id="Family-quantity" name="quantity" readOnly min="0"  value={Family} max={selectFamTicket.Remaining}/>
                      <button type="button" onClick={FamhandleIncrease}>+</button>
                      </form>
                ) : (
                    <p className='outOfticket'>Running out of tickets!</p>

                )}
                <p>{selectFamTicket.Remaining > 0 ? (
                      selectFamTicket.Price+" THB"
                ) : (null)}
                  </p>
                  <p className='TotalPrice'>{selectFamTicket.Remaining > 0 ? (selectFamTicket.Price * Family +" THB")
                : (null)
              }</p>
                </div>
                <h6>(4 person)</h6>
                <div className="Buy-ticket-line" />
                <button className={`${Family> 0 || Individual>0 ? "buybtn" : "buybtnblock"}`}
                 onClick={handleCheckout}>Continue</button>
              </div>
       </>
    );
}
export default BuySelectTicket;

export const TicketLoader = async (ticketType,TDate) => {
	const res = await fetch('/api/ticket/' + ticketType+'/'+TDate)
	let ticket = await res.json()
	if (!res.ok) {
		throw Error(ticket.error)
	}
	return ticket
}