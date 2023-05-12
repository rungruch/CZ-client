import "./MyTicket.css";
import { useAuth } from "../utils/AuthProvider";
import { useEffect, useState } from "react";

const PurchaseHistoryPage = () => {
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
    <div
      className="list-contentPH"
      key={e.Transactionid}
      to={e.Transactionid}
    >
      <div className="ticket-id" title={e.category}>
        <h1>{e.TicketType}</h1>
        <div className="info">
        <p>Order Number: {e.Transactionid}</p>
        <p>Quantity: {e.quantity}</p>
        <p>Visit Date: {e.VisitDate}</p>
        </div>
        <div className="Summarayinfo">
        <h3>Total: {e.TotalPrice}</h3>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {products.length ? (
        <div className="list-item">{list}</div>
      ) : (
        "No Purchase available"
      )}
    </>
  );
};

export default PurchaseHistoryPage;
