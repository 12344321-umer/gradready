import { useState } from "react";
import LandingScreen from "./LandingScreen";
import AssessmentForm from "./AssessmentForm";
import ScoreScreen from "./ScoreScreen";
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
        <ScoreScreen answers={answers} onRestart={() => setScreen("landing")} />
      )}
    </>
  );
}

export default App;
