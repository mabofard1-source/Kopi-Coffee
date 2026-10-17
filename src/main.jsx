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
        <g fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          <path pathLength="1" d="M138 238c-18-25-34-69-30-107 2-21 8-32 22-32 29 0 61 33 84 69m168 70c18-25 34-69 30-107-2-21-8-32-22-32-29 0-61 33-84 69" />
          <path pathLength="1" d="M132 238c1-47 38-79 83-79 15-4 26-4 41-4s26 0 41 4c45 0 82 32 83 79 7 17 8 36 2 53-26 34-60 66-93 92-16 13-28 24-33 27-5-3-17-14-33-27-33-26-67-58-93-92-6-17-5-36 2-53Z" />
          <path pathLength="1" d="M133 237c15-38 37-60 68-73 28 19 48 55 57 128 9-73 29-109 57-128 31 13 53 35 68 73" />
          <path pathLength="1" d="M132 291c13-31 32-52 52-52 30 0 49 30 52 62 3 27-2 51 4 72-12-7-18-19-32-29-9-6-18-7-28-4-21 2-37-18-48-49Zm248 0c-13-31-32-52-52-52-30 0-49 30-52 62-3 27 2 51-4 72 12-7 18-19 32-29 9-6 18-7 28-4 21 2 37-18 48-49Z" />
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
