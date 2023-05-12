import "./MyTicket.css";
import { useAuth } from "../utils/AuthProvider";
import { useEffect, useState } from "react";

const PurchaseHistoryPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
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

  const renderProducts = () => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    return currentProducts.map((e) => (
      <div className="list-contentPH" key={e.Transactionid} to={e.Transactionid}>
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
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={currentPage === number ? "active" : null}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      {products.length ? (
        <div className="list-item">
          {renderProducts()}
          {renderPageNumbers()}
        </div>
      ) : (
        "No Purchase available"
      )}
    </>
  );
};

export default PurchaseHistoryPage;
