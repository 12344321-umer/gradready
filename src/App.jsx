import { useState } from "react";
import LandingScreen from "./LandingScreen";
import AssessmentForm from "./AssessmentForm";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("landing");
  const [answers, setAnswers] = useState(null);

  function handleComplete(userAnswers) {
    setAnswers(userAnswers);
    setScreen("results");
  }

  return (
    <>
      {screen === "landing" && (
        <LandingScreen onStart={() => setScreen("assessment")} />
      )}
      {screen === "assessment" && (
        <AssessmentForm
          onComplete={handleComplete}
          onBack={() => setScreen("landing")}
        />
      )}
      {screen === "results" && (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Results coming next!</h2>
          <pre
            style={{ textAlign: "left", marginTop: "1rem", fontSize: "0.8rem" }}
          >
            {JSON.stringify(answers, null, 2)}
          </pre>
        </div>
      )}
    </>
  );
}

export default App;
