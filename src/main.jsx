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
        <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
  <path d="M138 237c-17-25-32-61-30-96 1-27 8-43 22-42 29 1 62 35 85 69m82 0c23-34 56-68 85-69 14-1 21 15 22 42 2 35-13 71-30 96" />
  <path d="M132 238c4-42 35-72 77-80 16-3 32-2 48-2s32-1 48 2c42 8 73 38 77 80 5 15 7 34 2 53-27 34-59 64-92 92-17 15-29 24-35 28-6-4-18-13-35-28-33-28-65-58-92-92-5-19-3-38 2-53Z" />
  <path d="M134 237c13-34 35-58 66-72 29 19 48 56 58 127 10-71 29-108 58-127 31 14 53 38 66 72" />
  <path d="M132 292c12-29 30-51 50-52 27-2 48 24 54 56 5 25 1 53 4 75-11-7-19-19-32-27-9-6-18-7-28-5-21 3-38-18-48-47Zm248 0c-12-29-30-51-50-52-27-2-48 24-54 56-5 25-1 53-4 75 11-7 19-19 32-27 9-6 18-7 28-5 21 3 38-18 48-47Z" />
  <ellipse cx="256" cy="386" rx="26" ry="20" />
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
