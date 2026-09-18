Here's a consolidated prompt that would produce this page in one pass, folding in everything from role/rules through the SDLC→ADLC and agent-testing content added later.

---

# Prompt: AI-Augmented QA Landing Page (B2B, E-Commerce, ADLC-Focused)

## Role & Goal
Act as an expert Landing Page Conversion Specialist and Senior QA Strategy Advisor. Rewrite/build `index.html` into a high-converting B2B page aimed at decision-makers (CTOs, QA Leads/Managers, Engineering Directors) at small tech companies, selling an AI-augmented QA enablement offering.

## Objective
Show immediate ROI in adopting AI-augmented QA, framed around a real shift in how software gets built: from the **SDLC** (Software Development Lifecycle — people plan/build/test in stages) to the **ADLC** (Agentic Development Lifecycle — AI agents build and test continuously while people direct and review). QA's job is changing, not just its tools. The goal is direct B2B bookings via a strategy-call form.

## Strict Rules & Terminology
1. **Banned words:** never use "course," "training," "workshop," or "class." Use B2B terms instead: *Transformation Program, AI-Augmented QA Playbook, Upskilling Framework, Enablement Initiative.*
2. **Bottleneck warning:** state plainly that AI lets developers ship faster, and if QA doesn't change too, testing becomes the bottleneck that erases those gains.
3. **Mindset shift:** frame the change as moving from manual/scripted execution to a creative, strategic, adaptive AI-driven testing practice — and specifically from SDLC to ADLC.
4. **Concrete AI value:** show real, specific outputs (not adjectives) — automated test-case synthesis, smart edge-case generation, instant root-cause analysis — with actual example code/scenarios.
5. **Multi-LLM stack:** show that the offering uses multiple real models — GitHub Copilot, Claude, Gemini — each doing a *different, named job*, with their real logos linked from a public icon CDN (e.g., `https://cdn.simpleicons.org/[slug]`, slugs: `githubcopilot`, `claude`, `googlegemini`), with a note that these marks belong to their respective owners.
6. **Domain focus:** scope everything to e-commerce QA specifically — cart & checkout, payments & fraud rules, catalog & search, inventory & fulfillment, promotions & pricing, peak-traffic regression — not generic software testing.
7. **Plain language:** keep sentences short and concrete. Define SDLC and ADLC in one line each the first time they appear. Avoid stacking multiple claims into one sentence.
8. **Title/positioning:** the page's core identity is "QA Engineering with AI."

## Required Sections (in order)
1. **Sticky nav** — brand mark + jump links to every major section + a CTA button.
2. **Hero** — status-style eyebrow, H1 built around "QA Engineering with AI" + the SDLC→ADLC shift, a short lede naming the e-commerce stakes, a short workflow-chain list (Requirements Parsing → AI Risk Modeling → Smart Edge-Case Generation → Copilot Automation → Instant Root-Cause Analysis), two CTAs, and a visual "status board" mock (not generic browser chrome) showing pipeline steps with pass/pending states.
3. **Facts strip** — audience, duration, format, model stack, e-commerce domain focus, as small labeled data points.
4. **SDLC → ADLC explainer** — define both terms in plain language, then a two-row visual comparison: SDLC as a linear chain ending in "QA tests, at the end" (a gate/bottleneck), ADLC as a loop of agents building/testing/fixing continuously with people directing. Close with what the team's new job becomes.
5. **How you know an agent is ready to ship** (ADLC "Test" concept, paraphrased and adapted to e-commerce, not copied verbatim from any source) — four cards: (a) start with a small, representative eval set rather than a perfect suite; (b) datasets & metrics — distinguish tasks with a clear ground-truth answer from tasks judged against criteria; (c) experiments — comparing prompt/model/tool changes against the same eval set before shipping; (d) simulation — why multi-turn agents (e.g., a support agent calming a customer, checking an order, deciding whether to escalate) need simulated conversations, not single-turn checks. Close by tying it back to production monitoring feeding the datasets.
6. **About the program** — short paragraphs on why manual/scripted testing can't keep up with the ADLC, and that existing staff are upskilled in place (no backfill, no headcount risk).
7. **E-commerce QA activities grid** — six short cards (cart & checkout, payments & fraud, catalog & search, inventory & fulfillment, promotions & pricing, peak-traffic regression), one plain sentence each.
8. **Business case / ROI comparison table** — "QA capability" vs. "In the old SDLC" vs. "In the ADLC," four rows (reading requirements, writing tests, keeping tests working, finding the cause of a bug), each cell a short before/after statement.
9. **Concrete outputs** — three cards with real code/output snippets (e.g., a race-condition test scenario, a Copilot-orchestrated test-generation prompt, a defect-to-fix-location trace).
10. **Multi-LLM toolchain** — three cards (Copilot, Claude, Gemini), each with its linked logo and one sentence on its specific e-commerce QA job, plus the trademark-attribution note.
11. **Framework/phases** — four collapsible phases reframed as a role change ("learn to direct agents, not write scripts" → "let agents draft tests" → "let agents keep tests working" → "let agents triage defects first").
12. **Advisor** — name/photo placeholder, role, short bio, LinkedIn link.
13. **Inquiry form** — name, work email, company & title, a goals textarea, submit button, hidden fields for a form backend (access key, subject, honeypot), short no-spam reassurance line.
14. **Footer** — brand + contact placeholder.

## Technical Requirements
- Single self-contained `index.html`: inline `<style>` (no external stylesheet dependency), Google Fonts (a display face for headings, a body sans, a mono face reserved for code/status/data labels only — not decoration).
- Responsive down to mobile, with a working nav toggle (vanilla JS, no framework).
- Accessible: skip link, visible focus states, semantic table roles for the comparison table, `prefers-reduced-motion` respected.
- Distinctive visual system tied to the subject matter: a test-report/status-board vocabulary — dark ink base, light paper surfaces, amber for "risk/bottleneck" signals, green for "resolved/AI-handled" signals — used semantically (color coding what's a warning vs. what's fixed), not as decoration. Avoid generic AI-page tells: no warm-cream-plus-terracotta palette, no all-caps tracked eyebrows, no rounded-card-plus-drop-shadow kit, no arrow-suffixed buttons.
- Logo images linked from a live CDN, not embedded as fake/placeholder marks.

## Deliverables
- The refactored `index.html` file, presented for download.
- A short bulleted summary of the key copy/strategy changes and why they help conversion, after each round of edits.

---

Want this saved as a standalone `.md` file so you can hand it to another session or teammate directly?