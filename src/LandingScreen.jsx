function LandingScreen({ onStart }) {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-grad">Grad</span>
          <span className="logo-ready">Ready</span>
          <span className="logo-dot">.</span>
        </div>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#about">About</a>
        </div>
        <button className="nav-cta" onClick={onStart}>
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">✦ Free · Takes 5 minutes · No signup</div>
        <h1 className="hero-title">
          Are you actually
          <br />
          <span className="hero-highlight">internship ready?</span>
        </h1>
        <p className="hero-sub">
          Most CS students apply without knowing their real gaps. GradReady
          gives you an honest score and a week-by-week AI action plan — built
          for Pakistani students.
        </p>
        <div className="hero-actions">
          <button className="btn-hero" onClick={onStart}>
            Check My Readiness →
          </button>
          <span className="hero-hint">No account needed</span>
        </div>

        {/* Stats row */}
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">7</span>
            <span className="stat-label">Questions</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">100</span>
            <span className="stat-label">Point Score</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">4-Week</span>
            <span className="stat-label">AI Action Plan</span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-section" id="how">
        <p className="section-label">HOW IT WORKS</p>
        <h2 className="section-title">Three steps to clarity</h2>
        <div className="steps">
          <div className="step-card">
            <div className="step-num">01</div>
            <h3>Answer 7 questions</h3>
            <p>
              Skills, projects, GitHub, LinkedIn, applications — we assess every
              dimension that matters.
            </p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-num">02</div>
            <h3>Get your score</h3>
            <p>
              A honest readiness score out of 100, with a clear breakdown of
              exactly where your gaps are.
            </p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-num">03</div>
            <h3>Follow your plan</h3>
            <p>
              An AI-generated 4-week action plan, personalised to your answers
              and your field of interest.
            </p>
          </div>
        </div>
      </section>

      {/* Score bands */}
      <section className="bands-section" id="about">
        <p className="section-label">YOUR RESULT</p>
        <h2 className="section-title">Where will you land?</h2>
        <div className="bands">
          <div className="band" style={{ borderLeft: "4px solid #DC2626" }}>
            <span className="band-score" style={{ color: "#DC2626" }}>
              0–24
            </span>
            <div>
              <p className="band-label">Not Ready Yet</p>
              <p className="band-desc">
                Significant gaps in skills or profile. Your plan focuses on
                foundations.
              </p>
            </div>
          </div>
          <div className="band" style={{ borderLeft: "4px solid #D97706" }}>
            <span className="band-score" style={{ color: "#D97706" }}>
              25–49
            </span>
            <div>
              <p className="band-label">Getting There</p>
              <p className="band-desc">
                Good start, but missing key signals employers look for.
              </p>
            </div>
          </div>
          <div className="band" style={{ borderLeft: "4px solid #2563EB" }}>
            <span className="band-score" style={{ color: "#2563EB" }}>
              50–74
            </span>
            <div>
              <p className="band-label">Almost There</p>
              <p className="band-desc">
                Solid foundation. A few targeted improvements can make you
                competitive.
              </p>
            </div>
          </div>
          <div className="band" style={{ borderLeft: "4px solid #059669" }}>
            <span className="band-score" style={{ color: "#059669" }}>
              75–100
            </span>
            <div>
              <p className="band-label">Internship Ready</p>
              <p className="band-desc">
                Strong profile. Your plan focuses on applying smart and closing
                the deal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <h2>Ready to find out where you stand?</h2>
        <p>Takes 5 minutes. Completely free.</p>
        <button className="btn-hero" onClick={onStart}>
          Start My Assessment →
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="logo" style={{ fontSize: "1.1rem" }}>
          <span className="logo-grad">Grad</span>
          <span className="logo-ready">Ready</span>
          <span className="logo-dot">.</span>
        </div>
        <p className="footer-text">
          Built for Pakistani CS students. Free forever.
        </p>
      </footer>
    </div>
  );
}

export default LandingScreen;
