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
        if (currentWeek) weeks.push(currentWeek);
        currentWeek = { title: trimmedLine, items: [] };
      } else if (trimmedLine.toUpperCase().startsWith("FINAL TIP:")) {
        if (currentWeek) {
          weeks.push(currentWeek);
          currentWeek = null;
        }
        finalTip = trimmedLine.replace(/^FINAL TIP:\s*/i, "").trim();
      } else if (currentWeek) {
        const cleanItem = trimmedLine.replace(/^[-\*\d\.\s]+/, "").trim();
        if (cleanItem) currentWeek.items.push(cleanItem);
      }
    });

    if (currentWeek) weeks.push(currentWeek);
    return { weeks, finalTip };
  }

  function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    let y = 22;

    // Header — GradReady title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(29, 78, 216);
    doc.text("GradReady.", margin, y);

    y += 8;
    doc.setFontSize(11);
    doc.setTextColor(110, 110, 110);
    doc.setFont("helvetica", "normal");
    doc.text("Your Personalised 4-Week Action Plan", margin, y);

    y += 7;
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, pageWidth - margin, y);
    y += 12;

    const { weeks, finalTip } = parsePlan(plan);

    weeks.forEach((week) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      // Week title bar
      doc.setFillColor(239, 246, 255);
      doc.roundedRect(margin, y - 5, maxWidth, 10, 2, 2, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(29, 78, 216);
      doc.text(week.title.toUpperCase(), margin + 4, y + 2);
      y += 12;

      // Items
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(40, 40, 40);

      week.items.forEach((item) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        const lines = doc.splitTextToSize(`• ${item}`, maxWidth - 8);
        doc.text(lines, margin + 4, y);
        y += lines.length * 6 + 2;
      });

      y += 8;
    });

    // Final tip box
    if (finalTip) {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }
      const tipLines = doc.splitTextToSize(
        `Final Tip: ${finalTip}`,
        maxWidth - 12,
      );
      doc.setFillColor(239, 246, 255);
      doc.roundedRect(
        margin,
        y - 4,
        maxWidth,
        tipLines.length * 6 + 14,
        3,
        3,
        "F",
      );
      doc.setDrawColor(191, 219, 254);
      doc.roundedRect(
        margin,
        y - 4,
        maxWidth,
        tipLines.length * 6 + 14,
        3,
        3,
        "S",
      );
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(29, 78, 216);
      doc.text(tipLines, margin + 6, y + 4);
      y += tipLines.length * 6 + 18;
    }

    // Footer
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(180, 180, 180);
    doc.text("Generated by GradReady · gradready.netlify.app", margin, 287);

    doc.save("GradReady-ActionPlan.pdf");
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
        <button className="btn-primary" onClick={downloadPDF}>
          Download My Plan (PDF)
        </button>
        <button className="btn-ghost" onClick={onRestart}>
          Start Over
        </button>
      </div>
    </div>
  );
}

export default PlanScreen;
