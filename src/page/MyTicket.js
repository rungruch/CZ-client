import "./MyTicket.css";
import { useAuth } from "../utils/AuthProvider";
import { useEffect, useState } from "react";
import Modal from "../component/TicketPassModal";

const TicketPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // state variable to store the selected product
  const [isModalOpen, setIsModalOpen] = useState(false); // state variable to control the visibility of the modal window
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

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const today = new Date().toISOString().split('T')[0];

  const list = products
  .filter(e => e.VisitDate >= today)
  .sort((a, b) => a.VisitDate.localeCompare(b.VisitDate)) // sort by VisitDate in ascending order
  .map((e) => (
    <div
      className="list-content"
      key={e.Transactionid}
      to={e.Transactionid}
      onClick={() => handleProductClick(e)}
    >
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
        <div className="--item">{list}</div>
      ) : (
        "No Ticket available"
      )}
      {isModalOpen && ( // render the modal window component conditionally
        <Modal product={selectedProduct} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default TicketPage;
