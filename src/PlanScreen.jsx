import { useState, useEffect } from "react";
import Groq from "groq-sdk";

function PlanScreen({ answers, onRestart }) {
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    generatePlan();
  }, []);

  async function generatePlan() {
    setLoading(true);
    setError(null);

    const apiKey = import.meta.env.VITE_GROQ_KEY;
    console.log("API Key Status:", apiKey ? "Loaded" : "Missing");

    if (!apiKey) {
      setError("API Key is missing. Please check your .env file.");
      setLoading(false);
      return;
    }

    const prompt = `
You are a career advisor for Pakistani CS students seeking their first tech internship.

Here are the student's answers:
- Field of interest: ${answers.interest}
- Skills they know: ${(answers.skills || []).join(", ")}
- Project experience: ${answers.projects}
- GitHub situation: ${answers.github}
- LinkedIn situation: ${answers.linkedin}
- Applications sent: ${answers.applications}
- Hours available per day: ${answers.time}

Give them a practical, honest, week-by-week action plan for the next 4 weeks to maximise their chances of landing an internship.

Format your response exactly like this:

WEEK 1: [week title]
- [action item]
- [action item]
- [action item]

WEEK 2: [week title]
- [action item]
- [action item]
- [action item]

WEEK 3: [week title]
- [action item]
- [action item]
- [action item]

WEEK 4: [week title]
- [action item]
- [action item]
- [action item]

FINAL TIP: [one honest closing piece of advice]

Be specific to their situation. Don't give generic advice. Max 300 words.
`;

    try {
      const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
      });

      const text = completion.choices[0]?.message?.content;

      if (text) {
        setPlan(text);
      } else {
        setError("Empty response received from AI model.");
      }
    } catch (err) {
      console.error("Groq SDK Error:", err);
      setError("Failed to connect to Groq AI. Please check your API key.");
    } finally {
      setLoading(false);
    }
  }

  // Robust line-by-line parser to format the output text into our UI blocks
  function parsePlan(text) {
    if (!text) return { weeks: [], finalTip: "" };

    const weeks = [];
    let finalTip = "";

    const lines = text.split("\n");
    let currentWeek = null;

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      if (trimmedLine.toUpperCase().startsWith("WEEK")) {
        if (currentWeek) {
          weeks.push(currentWeek);
        }
        currentWeek = {
          title: trimmedLine,
          items: [],
        };
      } else if (trimmedLine.toUpperCase().startsWith("FINAL TIP:")) {
        if (currentWeek) {
          weeks.push(currentWeek);
          currentWeek = null;
        }
        finalTip = trimmedLine.replace(/^FINAL TIP:\s*/i, "").trim();
      } else if (currentWeek) {
        const cleanItem = trimmedLine.replace(/^[-\*\d\.\s]+/, "").trim();
        if (cleanItem) {
          currentWeek.items.push(cleanItem);
        }
      }
    });

    if (currentWeek) {
      weeks.push(currentWeek);
    }

    return { weeks, finalTip };
  }

  function copyPlan() {
    navigator.clipboard.writeText(plan);
    alert("Plan copied to clipboard!");
  }

  if (loading)
    return (
      <div className="plan-loading">
        <div className="spinner" />
        <p>Generating your personalised plan...</p>
      </div>
    );

  if (error)
    return (
      <div className="plan-loading">
        <p style={{ color: "#DC2626" }}>{error}</p>
        <button className="btn-primary" onClick={generatePlan}>
          Try Again
        </button>
      </div>
    );

  const { weeks, finalTip } = parsePlan(plan);

  return (
    <div className="plan-screen">
      <div className="plan-header">
        <h2>Your Action Plan</h2>
        <p>Personalised based on your answers. Start today.</p>
      </div>

      {weeks.map((week, i) => (
        <div key={i} className="week-card">
          <h3 className="week-title">{week.title}</h3>
          <ul className="week-items">
            {week.items.map((item, j) => (
              <li key={j} className="week-item">
                <span className="gap-dot" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {finalTip && (
        <div className="final-tip">
          <strong>Final Tip: </strong>
          {finalTip}
        </div>
      )}

      <div className="plan-actions">
        <button className="btn-primary" onClick={copyPlan}>
          Copy My Plan
        </button>
        <button className="btn-ghost" onClick={onRestart}>
          Start Over
        </button>
      </div>
    </div>
  );
}

export default PlanScreen;
