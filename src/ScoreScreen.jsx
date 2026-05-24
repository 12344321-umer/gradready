function calculateScore(answers) {
  let score = 0;

  // Field interest (5 points — just for having direction)
  if (answers.interest && answers.interest !== "Not sure yet") score += 5;

  // Skills (up to 35 points)
  const skills = answers.skills || [];
  if (skills.includes("HTML & CSS")) score += 5;
  if (skills.includes("JavaScript")) score += 10;
  if (skills.includes("React")) score += 8;
  if (skills.includes("Python")) score += 5;
  if (skills.includes("Git & GitHub")) score += 7;

  // Projects (up to 20 points)
  const projectMap = {
    "I have no projects": 0,
    "I have 1–2 small tutorial projects": 8,
    "I have personal projects I built myself": 14,
    "I have done freelance or client work": 20,
  };
  score += projectMap[answers.projects] || 0;

  // GitHub (up to 15 points)
  const githubMap = {
    "I don't have GitHub": 0,
    "I have an account but it's empty": 4,
    "I have a few projects uploaded": 10,
    "I push code regularly": 15,
  };
  score += githubMap[answers.github] || 0;

  // LinkedIn (up to 10 points)
  const linkedinMap = {
    "No LinkedIn profile": 0,
    "Profile exists but empty": 3,
    "Profile filled out but no posts": 6,
    "I post and engage regularly": 10,
  };
  score += linkedinMap[answers.linkedin] || 0;

  // Applications (up to 10 points)
  const applyMap = {
    "Not yet": 0,
    "I've applied to a few places": 4,
    "I'm actively applying": 7,
    "I've had interviews already": 10,
  };
  score += applyMap[answers.applications] || 0;

  // Time (up to 5 points)
  const timeMap = {
    "Less than 1 hour": 1,
    "1–2 hours": 2,
    "3–4 hours": 4,
    "5+ hours": 5,
  };
  score += timeMap[answers.time] || 0;

  return Math.min(score, 100);
}

function getLabel(score) {
  if (score < 25)
    return { label: "Not Ready Yet", color: "#DC2626", bg: "#FEF2F2" };
  if (score < 50)
    return { label: "Getting There", color: "#D97706", bg: "#FFFBEB" };
  if (score < 75)
    return { label: "Almost There", color: "#2563EB", bg: "#EFF6FF" };
  return { label: "Internship Ready", color: "#059669", bg: "#ECFDF5" };
}

function getGaps(answers) {
  const gaps = [];

  const skills = answers.skills || [];
  if (!skills.includes("JavaScript"))
    gaps.push(
      "JavaScript is the #1 skill for any tech internship — this is your biggest gap to close.",
    );
  if (!skills.includes("Git & GitHub"))
    gaps.push(
      "Git & GitHub is expected by every employer. Set it up and start pushing code daily.",
    );
  if (!skills.includes("React") && answers.interest === "Frontend Development")
    gaps.push(
      "React is the standard for frontend roles. Even basic knowledge gives you a strong edge.",
    );

  if (
    answers.projects === "I have no projects" ||
    answers.projects === "I have 1–2 small tutorial projects"
  ) {
    gaps.push(
      "You need at least one self-built project you can walk through in an interview. Tutorial projects don't count.",
    );
  }

  if (
    answers.github === "I don't have GitHub" ||
    answers.github === "I have an account but it's empty"
  ) {
    gaps.push(
      "An empty GitHub profile signals you don't build things. Add your projects this week.",
    );
  }

  if (
    answers.linkedin === "No LinkedIn profile" ||
    answers.linkedin === "Profile exists but empty"
  ) {
    gaps.push(
      "Most Pakistani tech recruiters find candidates through LinkedIn. A complete profile is non-negotiable.",
    );
  }

  if (answers.applications === "Not yet") {
    gaps.push(
      "Start applying now — even before you feel ready. Rejections are part of the process.",
    );
  }

  return gaps.length > 0
    ? gaps
    : ["You're in good shape. Focus on consistency and keep applying."];
}

function ScoreScreen({ answers, onRestart, onGetPlan }) {
  const score = calculateScore(answers);
  const { label, color, bg } = getLabel(score);
  const gaps = getGaps(answers);

  return (
    <div className="score-screen">
      <div className="score-card">
        <p className="score-label-top">Your Readiness Score</p>

        <div className="score-circle" style={{ borderColor: color }}>
          <span className="score-number" style={{ color }}>
            {score}
          </span>
          <span className="score-max">/100</span>
        </div>

        <div className="score-badge" style={{ background: bg, color }}>
          {label}
        </div>
      </div>

      <div className="gaps-card">
        <h3>Your Gaps to Close</h3>
        <ul className="gap-list">
          {gaps.map((gap, i) => (
            <li key={i} className="gap-item">
              <span className="gap-dot" />
              {gap}
            </li>
          ))}
        </ul>
      </div>

      <button className="btn-primary" onClick={onGetPlan}>
        Get My Action Plan →
      </button>

      <button className="btn-ghost" onClick={onRestart}>
        Start Over
      </button>
    </div>
  );
}

export default ScoreScreen;
