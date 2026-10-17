
import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext.jsx";
import QuantityControl from "./QuantityControl.jsx";


const fmt = (n) => {
  const number = Number(n) || 0;
  return Number.isInteger(number) ? String(number) : number.toFixed(2);
};

export default function CartDrawer({ currency = "L.E" }) {
  const { items, count, total, toNumber, clear } = useCart();
  const [open, setOpen] = useState(false);

  // Close cart when pressing Escape
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // Prevent background scrolling while cart is open
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const handleCheckout = () => {
    setOpen(false);
  };

  const handleClearCart = () => {
    clear();
  };

  return (
    <>
      {/* Floating cart bar */}
      {count > 0 && !open && (
        <button
          type="button"
          className="kc-bar"
          onClick={() => setOpen(true)}
          aria-label={`View your order, ${count} items`}
        >
          <span className="kc-bar-count">{count}</span>

          <span>View your order</span>

          <span className="kc-bar-total">
            {fmt(total)} {currency}
          </span>
        </button>
      )}

      {/* Cart drawer */}
      {open && (
        <div className="kc-layer">
          <button
            type="button"
            className="kc-backdrop"
            aria-label="Close cart"
            onClick={() => setOpen(false)}
          />

          <section
            className="kc-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Your order"
          >
            {/* Header */}
            <header className="kc-panel-head">
              <div>
                <h2>Your order</h2>
                <p>
                  {count} {count === 1 ? "item" : "items"} in your cart
                </p>
              </div>

              <button
                type="button"
                className="kc-close"
                aria-label="Close cart"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
            </header>

            {/* Empty cart */}
            {items.length === 0 ? (
              <div className="kc-empty">
                <p>Your cart is empty.</p>
                <span>
                  Press Add on any item in the menu to start your order.
                </span>

                <button
                  type="button"
                  className="primary-button"
                  onClick={() => setOpen(false)}
                >
                  Explore the menu
                </button>
              </div>
            ) : (
              <>
                {/* Cart items */}
                <ul className="kc-list">
                  {items.map(({ product, qty }) => {
                    const price = toNumber(product.price);

                    return (
                      <li className="kc-line" key={product.id}>
                        <div className="kc-line-info">
                          <strong>{product.name}</strong>

                          <small>
                            {fmt(price)} {currency} each
                          </small>
                        </div>

                        <QuantityControl product={product} />

                        <span className="kc-line-total">
                          {fmt(price * qty)} {currency}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {/* Cart footer */}
                <footer className="kc-panel-foot">
                  <div className="kc-total">
                    <span>
                      Total · {count} {count === 1 ? "item" : "items"}
                    </span>

                    <strong>
                      {fmt(total)} {currency}
                    </strong>
                  </div>

                  <a
                    className="primary-button kc-checkout-link"
                    href="/checkout"
                    onClick={handleCheckout}
                  >
                    Proceed to checkout
                  </a>

                  <button
                    type="button"
                    className="kc-clear"
                    onClick={handleClearCart}
                  >
                    Clear cart
                  </button>
                </footer>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}
