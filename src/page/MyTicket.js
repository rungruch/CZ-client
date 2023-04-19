import { useLoaderData } from "react-router-dom";
import "./MyTicket.css";

const TicketPage = () => {
  const products = useLoaderData();
  const list = products.map((e) => (
    <div className="list-content" key={e.Transactionid} to={e.Transactionid}>
      <div className="ticket-id" title={e.category}>
        <h1>{e.Ticketid}</h1>
        <div className="info">
          <p>Booking Date: {e.VisitDate}</p>
          <p>Transaction ID: {e.Transactionid}</p>
        </div>
      </div>
      <div className="quantity" title={e.category}>
        <h2>x{e.quantity}</h2>
      </div>
    </div>
  ));

  return (
    <>
      {products.length ? (
        <div className="list-item">{list}</div>
      ) : (
        "No Ticket available"
      )}
    </>
  );
};

export default TicketPage;

export const TicketLoader = async ({ params }) => {
  // const res = await getProducts();
  const { id } = params;
  try {
    const res = await fetch("/api/transactions/" + id);
    if (!res.ok) {
      throw Error("Could not fetch the products");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
  // const res = await fetch('/api/transactions/'+ id)
  // if (!res.ok) {
  //     return res.json(null);
  // 	throw Error('Could not fetch the products')
  // }
  // return res.json()
};
