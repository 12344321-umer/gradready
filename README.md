# GradReady

A career readiness tool for Pakistani CS students who are close to graduation and don't know where they actually stand.

**Live site:** https://grad-ready.netlify.app/

---

## What it does

Most CS students apply for internships without knowing what's actually holding them back. GradReady asks 7 questions and gives you an honest score out of 100, along with a personalised 4-week action plan to close your gaps.

**What gets assessed:**
- Technical skills (languages, frameworks)
- Project experience
- GitHub activity
- LinkedIn presence
- Application status
- Time available to prepare

**What you get:**
- A readiness score out of 100
- A breakdown of where your gaps are
- An AI-generated 4-week action plan tailored to your answers
- A downloadable PDF of the plan

---

## Scoring breakdown

The scoring is manually weighted based on what actually matters to recruiters at the early filtering stage. It is not based on a dataset.

| Category | Weight | Why |
|---|---|---|
| Technical Skills | 35 pts | First thing that gets you through the filter |
| Projects | 20 pts | How fresh grads prove their skills |
| GitHub | 15 pts | Recruiters check this before interviews |
| LinkedIn | 10 pts | Primary sourcing tool in Pakistan |
| Applications | 10 pts | Measures real-world initiative |
| Field of Interest | 5 pts | Clarity speeds up preparation |
| Time Commitment | 5 pts | Determines how fast gaps can be closed |

**Score bands:**

| Score | Status |
|---|---|
| 0–24 | Not Ready Yet |
| 25–49 | Getting There |
| 50–74 | Almost There |
| 75–100 | Internship Ready |

---

## Tech stack

- **React + Vite** — frontend
- **Groq API** — AI plan generation
- **Llama 3.3 70B** — the underlying LLM (via Groq)
- **jsPDF** — client-side PDF generation
- **Netlify** — deployment

---

## Running locally

```bash
git clone https://github.com/12344321-umer/gradready.git
cd gradready
npm install
```

Create a `.env` file in the root:

```
VITE_GROQ_KEY=your_groq_api_key_here
```

Get a free API key from [console.groq.com](https://console.groq.com).

```bash
npm run dev
```

---

## Limitations

- Scoring is self-reported — answers aren't verified
- The AI plan is only as good as the honesty of the answers
- Doesn't account for networking, referrals, or luck
- Not tested on every screen size or browser

This is a v1 project built close to graduation. It works, but it's not perfect.

---

## Why I built this

I was a month away from graduation and genuinely didn't know where I stood or what to do next. I couldn't find anything built specifically for students in Pakistan. So I built it myself.

---

## Feedback

If something breaks or you have suggestions, open an issue or reach out on LinkedIn.
