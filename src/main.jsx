import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../styles.css";

function SiteWithLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 950);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <App />
      {loading && <PageLoader />}
    </>
  );
}

function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-label="Loading Kopi">
      <svg className="page-loader-fox" viewBox="95 80 325 345" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
  <path pathLength="1" d="M138 237c-18-23-31-58-31-95 0-27 6-43 19-44 25-3 60 31 88 71m84 0c28-40 63-74 88-71 13 1 19 17 19 44 0 37-13 72-31 95" />
  <path pathLength="1" d="M137 238c2-45 36-75 80-81 13-2 26-1 39-1s26-1 39 1c44 6 78 36 80 81 8 15 10 35 4 54-28 34-60 64-92 92-16 14-25 23-31 27-6-4-15-13-31-27-32-28-64-58-92-92-6-19-4-39 4-54Z" />
  <path pathLength="1" d="M136 237c14-33 36-58 68-73 26 18 45 54 52 128 7-74 26-110 52-128 32 15 54 40 68 73" />
  <path pathLength="1" d="M132 292c12-29 29-51 49-52 27-2 48 23 54 55 5 27 1 51 4 75-12-8-20-19-33-28-9-6-18-7-28-5-20 3-36-17-46-45Zm248 0c-12-29-29-51-49-52-27-2-48 23-54 55-5 27-1 51-4 75 12-8 20-19 33-28 9-6 18-7 28-5 20 3 36-17 46-45Z" />
  <path pathLength="1" d="M256 292c-1 25-1 50 0 73m-18-66c1 24-1 47 1 71m36-71c-1 24 1 47-1 71" />
  <ellipse pathLength="1" cx="256" cy="386" rx="26" ry="20" />
</g>
      </svg>
      <span className="page-loader-name">KOPI</span>
      <span className="page-loader-caption">SPECIALTY COFFEE</span>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SiteWithLoader />
  </React.StrictMode>
);
