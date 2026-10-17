
import React, { useState } from "react";
import { useCart } from "./CartContext.jsx";
import QuantityControl from "./QuantityControl.jsx";
const WHATSAPP_NUMBER = "201036202620";
const CURRENCY = "L.E";
const PROFILE_KEY = "kopi-customer";

const fmt = (n) => {
  const value = Number(n) || 0;
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
};

function cleanPhone(value = "") {
  const digits = String(value)
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
    .replace(/\D/g, "");

  return digits.startsWith("20") && digits.length === 12
    ? `0${digits.slice(2)}`
    : digits;
}

function isEgyptMobile(value) {
  return /^01[0125]\d{8}$/.test(cleanPhone(value));
}

function loadProfile() {
  try {
    const profile = JSON.parse(localStorage.getItem(PROFILE_KEY));

    return profile &&
      typeof profile === "object" &&
      !Array.isArray(profile)
      ? profile
      : {};
  } catch {
    return {};
  }
}

function saveProfile({ name, phone, address, landmark }) {
  try {
    localStorage.setItem(
      PROFILE_KEY,
      JSON.stringify({ name, phone, address, landmark })
    );
  } catch {
    // Checkout can continue if local storage is unavailable.
  }
}

function buildMessage({ form, fulfillment, items, total, toNumber }) {
  const lines = items.map(({ product, qty }) => {
    const price = toNumber(product.price);

    return `• ${qty} × ${product.name} — ${fmt(price * qty)} ${CURRENCY}`;
  });

  return [
    "طلب جديد من موقع Kopi ☕",
    "",
    `👤 الاسم: ${form.name.trim()}`,
    `📞 الموبايل: ${cleanPhone(form.phone)}`,
    fulfillment === "delivery"
      ? `📍 العنوان: ${form.address.trim()}`
      : null,
    fulfillment === "delivery" && form.landmark.trim()
      ? `🧭 علامة مميزة: ${form.landmark.trim()}`
      : null,
    form.notes.trim()
      ? `📝 ملاحظات: ${form.notes.trim()}`
      : null,
    "",
    "🧾 الطلب:",
    ...lines,
    "",
    `💰 إجمالي الأصناف: ${fmt(total)} ${CURRENCY}`,
    fulfillment === "pickup"
      ? "📦 نوع الطلب: استلام من الفرع"
      : "🚚 نوع الطلب: توصيل للمنزل",
    fulfillment === "pickup"
      ? "💵 الدفع: كاش عند الاستلام في الفرع"
      : "💵 الدفع: كاش عند الاستلام",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function Shell({ children }) {
  return (
    <>
      <header className="site-header kc-co-header">
        <a
          className="brand"
          href="/"
          aria-label="Kopi Specialty Coffee home"
        >
          <img
            src="/assets/kopi-logo.jpg"
            alt="Kopi Specialty Coffee logo"
          />
        </a>

        <a className="header-cta" href="/#menu">
          Back to menu <span>↩</span>
        </a>
      </header>

      <main className="kc-checkout">{children}</main>
    </>
  );
}

function Field({ id, label, optional, error, children }) {
  return (
    <div className="kc-field">
      <label htmlFor={id}>
        {label}
        {optional && <small> (optional)</small>}
      </label>

      {children}

      {error && (
        <small className="kc-error" id={`${id}-error`} role="alert">
          {error}
        </small>
      )}
    </div>
  );
}

export default function Checkout() {
  const { items, count, total, toNumber, clear } = useCart();

  const [form, setForm] = useState(() => ({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    notes: "",
    ...loadProfile(),
  }));

  const [errors, setErrors] = useState({});
  const [sentUrl, setSentUrl] = useState(null);
  const [fulfillment, setFulfillment] = useState("");

  const chooseFulfillment = (value) => {
    setFulfillment(value);
    setErrors((current) => ({
      ...current,
      fulfillment: "",
      ...(value === "pickup" ? { address: "" } : {}),
    }));
  };

  const updateField = (key) => (event) => {
    setForm((current) => ({
      ...current,
      [key]: event.target.value,
    }));

    setErrors((current) => ({
      ...current,
      [key]: "",
    }));
  };

  const fieldProps = (key) => ({
    id: `kc-${key}`,
    name: key,
    value: form[key] ?? "",
    onChange: updateField(key),
    "aria-invalid": errors[key] ? "true" : undefined,
    "aria-describedby": errors[key] ? `kc-${key}-error` : undefined,
  });

  const onSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!fulfillment) {
      nextErrors.fulfillment = "Choose pickup or home delivery.";
    }

    if (form.name.trim().length < 2) {
      nextErrors.name = "Enter your full name.";
    }

    if (!isEgyptMobile(form.phone)) {
      nextErrors.phone =
        "Enter a valid Egyptian mobile number, like 01012345678.";
    }

    if (fulfillment === "delivery" && form.address.trim().length < 8) {
      nextErrors.address =
        "Add your street, building and floor so we can find you.";
    }

    if (items.length === 0) {
      setErrors({
        form: "Your cart is empty. Add an item before checking out.",
      });
      return;
    }

    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];

    if (firstError === "fulfillment") {
      document.getElementById("kc-fulfillment-pickup")?.focus();
      return;
    }

    if (firstError) {
      document.getElementById(`kc-${firstError}`)?.focus();
      return;
    }

    const message = buildMessage({
      form,
      fulfillment,
      items,
      total,
      toNumber,
    });

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    saveProfile(form);
    setSentUrl(url);

    // Open WhatsApp directly from the submit interaction.
    const whatsappWindow = window.open(url, "_blank");

    // Keep the order in the cart if the browser blocks the new window.
    if (whatsappWindow) {
      whatsappWindow.opener = null;
      clear();
    }
  };

  if (sentUrl) {
    return (
      <Shell>
        <section className="kc-co-done">
          <span className="eyebrow">
            <i></i> ALMOST DONE
          </span>

          <h1>
            Press <em>Send</em> in WhatsApp
          </h1>

          <p>
            WhatsApp should have opened with your order ready. Your order
            reaches Kopi only after you press Send there.
          </p>

          <a
            className="primary-button kc-submit"
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open WhatsApp again
          </a>

          <a className="text-link" href="/#menu">
            Back to the menu <span>↗</span>
          </a>
        </section>
      </Shell>
    );
  }

  if (items.length === 0) {
    return (
      <Shell>
        <section className="kc-co-done">
          <h1>
            Your cart is <em>empty</em>
          </h1>

          <p>
            Pick something you like from the menu, then come back here.
          </p>

          <a className="primary-button kc-submit" href="/#menu">
            Explore the menu
          </a>
        </section>
      </Shell>
    );
  }

  return (
    <Shell>
      <span className="eyebrow">
        <i></i> CHECKOUT
      </span>

      <h1 className="kc-co-title">
        Confirm your <em>order</em>
      </h1>

      <div className="kc-co-grid">
        <form className="kc-co-form" onSubmit={onSubmit} noValidate>
          <h2>How would you like to receive your order?</h2>

          {errors.form && (
            <p className="kc-error" role="alert">
              {errors.form}
            </p>
          )}

          <fieldset
            className="kc-fulfillment"
            aria-describedby={errors.fulfillment ? "kc-fulfillment-error" : undefined}
          >
            <legend>Choose your order type</legend>

            <div className="kc-fulfillment-options">
              <label
                className={`kc-fulfillment-option ${fulfillment === "pickup" ? "is-selected" : ""}`}
              >
                <input
                  id="kc-fulfillment-pickup"
                  type="radio"
                  name="fulfillment"
                  value="pickup"
                  checked={fulfillment === "pickup"}
                  onChange={() => chooseFulfillment("pickup")}
                  aria-invalid={errors.fulfillment ? "true" : undefined}
                />
                <span>
                  <strong>Pick up at the branch</strong>
                  <small>Collect your order from Kopi.</small>
                </span>
              </label>

              <label
                className={`kc-fulfillment-option ${fulfillment === "delivery" ? "is-selected" : ""}`}
              >
                <input
                  type="radio"
                  name="fulfillment"
                  value="delivery"
                  checked={fulfillment === "delivery"}
                  onChange={() => chooseFulfillment("delivery")}
                  aria-invalid={errors.fulfillment ? "true" : undefined}
                />
                <span>
                  <strong>Home delivery</strong>
                  <small>We’ll deliver your order to your address.</small>
                </span>
              </label>
            </div>

            {errors.fulfillment && (
              <small className="kc-error" id="kc-fulfillment-error" role="alert">
                {errors.fulfillment}
              </small>
            )}
          </fieldset>

          {fulfillment && (
            <>
              <Field
                id="kc-name"
                label="Full name"
                error={errors.name}
              >
                <input
                  type="text"
                  autoComplete="name"
                  required
                  {...fieldProps("name")}
                />
              </Field>

              <Field
                id="kc-phone"
                label="Mobile number"
                error={errors.phone}
              >
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="01012345678"
                  required
                  {...fieldProps("phone")}
                />
              </Field>

              {fulfillment === "delivery" && (
                <>
                  <Field
                    id="kc-address"
                    label="Delivery address"
                    error={errors.address}
                  >
                    <textarea
                      autoComplete="street-address"
                      placeholder="Street, building, floor, apartment"
                      required
                      {...fieldProps("address")}
                    />
                  </Field>

                  <Field
                    id="kc-landmark"
                    label="Landmark"
                    optional
                  >
                    <input
                      type="text"
                      autoComplete="off"
                      {...fieldProps("landmark")}
                    />
                  </Field>
                </>
              )}

              <Field
                id="kc-notes"
                label="Notes for Kopi"
                optional
              >
                <textarea {...fieldProps("notes")} />
              </Field>

              <div className="kc-co-facts">
                <p>
                  <span>Order type</span>
                  <strong>
                    {fulfillment === "pickup"
                      ? "Pickup at the branch"
                      : "Delivery to your address"}
                  </strong>
                </p>

                <p>
                  <span>Payment</span>
                  <strong>
                    {fulfillment === "pickup"
                      ? "Cash at the branch"
                      : "Cash on delivery"}
                  </strong>
                </p>
              </div>

              <button type="submit" className="primary-button kc-submit">
                Send order on WhatsApp
              </button>

              <p className="kc-hint">
                WhatsApp opens with your order ready. Press Send there to
                confirm it with Kopi.
              </p>
            </>
          )}
        </form>

        {fulfillment && (
          <aside className="kc-co-summary" aria-label="Order summary">
            <h2>Your order</h2>

            <ul className="kc-list">
              {items.map(({ product, qty }) => {
                const price = toNumber(product.price);

                return (
                  <li className="kc-line" key={product.id}>
                    <div className="kc-line-info">
                      <strong>{product.name}</strong>

                      <small>
                        {fmt(price)} {CURRENCY}
                      </small>
                    </div>

                    <QuantityControl product={product} />

                    <span className="kc-line-total">
                      {fmt(price * qty)} {CURRENCY}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="kc-total">
              <span>
                Total · {count} {count === 1 ? "item" : "items"}
              </span>

              <strong>
                {fmt(total)} {CURRENCY}
              </strong>
            </div>

            <p className="kc-hint">
              {fulfillment === "pickup"
                ? "Your order will be ready for pickup at the branch."
                : "Delivery fee, if any, is confirmed by Kopi on WhatsApp."}
            </p>
          </aside>
        )}
      </div>
    </Shell>
  );
}
