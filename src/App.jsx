import React from "react";
import "./App.css";

function App() {
  return (
    <main style={{ textAlign: "center", padding: "2rem", maxWidth: "500px" }}>
      <header style={{ marginBottom: "2.5rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "0.5rem",
          }}
        >
          GradReady
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
          Your student career readiness tracker.
        </p>
      </header>

      <section
        style={{
          background: "#ffffff",
          padding: "2.5rem",
          borderRadius: "8px",
          border: "1px solid var(--border-color)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          Is time running out?
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            marginBottom: "2rem",
            lineHeight: "1.5",
          }}
        >
          Get an honest starting point, a clear gap analysis vs industry
          requirements, and a personalized AI action plan in under 5 minutes.
        </p>

        <button
          onClick={() => alert("Form coming next!")}
          style={{
            background: "var(--text-main)",
            color: "#ffffff",
            border: "none",
            padding: "0.8rem 1.5rem",
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Check My Readiness
        </button>
      </section>
    </main>
  );
}

export default App;
