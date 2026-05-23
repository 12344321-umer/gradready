function LandingScreen({ onStart }) {
  return (
    <main className="landing">
      <header className="landing-header">
        <h1>GradReady</h1>
        <p>Your honest career readiness check.</p>
      </header>

      <section className="landing-card">
        <h2>Is time running out?</h2>
        <p>
          Get an honest gap analysis and a personalised AI action plan in under
          5 minutes.
        </p>
        <button className="btn-primary" onClick={onStart}>
          Check My Readiness →
        </button>
      </section>
    </main>
  );
}

export default LandingScreen;
