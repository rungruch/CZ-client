import React from "react";
import "./TicketModal.css";
import QRCode from "qrcode.react";

const Modal = ({ product, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{product.TicketType}</h2>
          <button onClick={onClose}>X</button>
        </div>
        <div className="modal-body">
        <p>{product.email}</p>
          <p>Visit Date: {product.VisitDate}</p>
          <p>Quantity: {product.quantity}</p>
          {/* Add more details as needed */}
        </div>
        <div className="modal-qr">
        <QRCode value={product._id} size={196} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
