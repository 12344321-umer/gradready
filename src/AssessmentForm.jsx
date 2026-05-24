import { useState } from "react";

const questions = [
  {
    id: "interest",
    question: "What field are you most interested in?",
    type: "single",
    options: [
      "Frontend Development",
      "Backend Development",
      "AI / Machine Learning",
      "Data Science",
      "Not sure yet",
    ],
  },
  {
    id: "skills",
    question: "Which of these do you know? (pick all that apply)",
    type: "multi",
    options: [
      "HTML & CSS",
      "JavaScript",
      "React",
      "Python",
      "Git & GitHub",
      "SQL",
      "None of these",
    ],
  },
  {
    id: "projects",
    question: "How would you describe your project experience?",
    type: "single",
    options: [
      "I have no projects",
      "I have 1–2 small tutorial projects",
      "I have personal projects I built myself",
      "I have done freelance or client work",
    ],
  },
  {
    id: "github",
    question: "What is your GitHub situation?",
    type: "single",
    options: [
      "I don't have GitHub",
      "I have an account but it's empty",
      "I have a few projects uploaded",
      "I push code regularly",
    ],
  },
  {
    id: "linkedin",
    question: "What about LinkedIn?",
    type: "single",
    options: [
      "No LinkedIn profile",
      "Profile exists but empty",
      "Profile filled out but no posts",
      "I post and engage regularly",
    ],
  },
  {
    id: "applications",
    question: "Have you started applying?",
    type: "single",
    options: [
      "Not yet",
      "I've applied to a few places",
      "I'm actively applying",
      "I've had interviews already",
    ],
  },
  {
    id: "time",
    question: "How many hours a day can you realistically commit to improving?",
    type: "single",
    options: ["Less than 1 hour", "1–2 hours", "3–4 hours", "5+ hours"],
  },
];

function AssessmentForm({ onComplete, onBack }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});

  const q = questions[current];
  const answer = answers[q.id];
  const isLast = current === questions.length - 1;

  function handleSingle(option) {
    setAnswers({ ...answers, [q.id]: option });
  }

  function handleMulti(option) {
    const current_answers = answers[q.id] || [];
    if (current_answers.includes(option)) {
      setAnswers({
        ...answers,
        [q.id]: current_answers.filter((a) => a !== option),
      });
    } else {
      setAnswers({ ...answers, [q.id]: [...current_answers, option] });
    }
  }

  function handleNext() {
    if (isLast) {
      onComplete(answers);
    } else {
      setCurrent(current + 1);
    }
  }

  const hasAnswer =
    q.type === "multi" ? (answers[q.id] || []).length > 0 : !!answers[q.id];

  return (
    <div className="assessment-wrapper">
      {/* Branded nav */}
      <nav className="assessment-nav">
        <div
          className="logo"
          style={{ fontSize: "1.3rem", cursor: "pointer" }}
          onClick={onBack}
        >
          <span className="logo-grad">Grad</span>
          <span className="logo-ready">Ready</span>
          <span className="logo-dot">.</span>
        </div>
      </nav>

      <div className="assessment">
        <div className="assessment-header">
          <button className="btn-ghost" onClick={onBack}>
            ← Back
          </button>
          <span className="progress-text">
            {current + 1} of {questions.length}
          </span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="question-card">
          <h2 className="question-text">{q.question}</h2>

          <div className="options">
            {q.options.map((option) => {
              const isSelected =
                q.type === "multi"
                  ? (answers[q.id] || []).includes(option)
                  : answers[q.id] === option;

              return (
                <button
                  key={option}
                  className={`option-btn ${isSelected ? "selected" : ""}`}
                  onClick={() =>
                    q.type === "multi"
                      ? handleMulti(option)
                      : handleSingle(option)
                  }
                >
                  {option}
                </button>
              );
            })}
          </div>

          <button
            className="btn-primary"
            onClick={handleNext}
            disabled={!hasAnswer}
          >
            {isLast ? "See My Results →" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssessmentForm;
