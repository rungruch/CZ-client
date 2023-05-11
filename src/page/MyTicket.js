
import "./MyTicket.css";
import { useAuth } from "../utils/AuthProvider";
import { useEffect, useState } from "react";

const TicketPage = () => {
  const [products, setProducts] = useState([]);
  let auth = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/transactions/" + auth.user?.email);
        if (!res.ok) {
          throw Error("Could not fetch the products");
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [auth.user?.email]);
  
  const list = products.map((e) => (
    <div className="list-content" key={e.Transactionid} to={e.Transactionid}>
      <div className="ticket-id" title={e.category}>
        <h1>{e.TicketType}</h1>
        <div className="info">
          <p>Visit Date: {e.VisitDate}</p>
          
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

