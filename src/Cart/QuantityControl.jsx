
import React from "react";
import { useCart } from "./CartContext.jsx";
import "./QuantityControl.css";

export default function QuantityControl({ product }) {
  const { getQty, add, decrement } = useCart();

  if (!product || product.id == null) {
    return null;
  }

  const qty = getQty(product.id);

  const handleAdd = () => {
    add({
      ...product,
      price: Number(product.price) || 0,
    });
  };

  const handleDecrement = () => {
    decrement(product.id);
  };

  if (qty <= 0) {
    return (
      <button
        type="button"
        className="qc-add"
        onClick={handleAdd}
        aria-label={`Add ${product.name} to cart`}
      >
        Add
      </button>
    );
  }

  return (
    <div
      className="qc-stepper"
      role="group"
      aria-label={`Quantity of ${product.name}`}
    >
      <button
        type="button"
        className="qc-btn"
        onClick={handleDecrement}
        aria-label={`Remove one ${product.name}`}
      >
        −
      </button>

      <span className="qc-qty" aria-live="polite">
        {qty}
      </span>

      <button
        type="button"
        className="qc-btn"
        onClick={handleAdd}
        aria-label={`Add one ${product.name}`}
      >
        +
      </button>
    </div>
  );
}
