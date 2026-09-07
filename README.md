# AI-Augmented Quality Engineering — Landing Page (v2)

A static, QA/AI-specific landing page with a sign-up form, built to run on GitHub Pages with no backend.

This version implements the full improvement proposal. See "What changed" below for a checklist against the original P1/P2/P3 list.

## File structure

```
course-landing/
├── index.html              ← main page (edit the [bracketed] placeholders)
├── thank-you.html           ← shown after a successful sign-up
├── privacy.html              ← privacy notice, linked from the form and footer
├── css/
│   └── styles.css
├── js/
│   └── main.js               ← nav, sticky mobile CTA, form submission + redirect
└── assets/
    ├── favicon.png            ← add your own
    ├── og-image.jpg            ← add your own (1200x630)
    ├── og-pattern.svg           ← included — base pattern for building og-image.jpg
    ├── instructor-photo.jpg      ← add your own
    ├── testimonial-1.jpg          ← add your own (real participant only)
    ├── testimonial-2.jpg          ← add your own (real participant only)
    └── ai-qa-copilot-prompts.pdf   ← included, placeholder content — edit before publishing
```

## 1. Fill in your content

Open `index.html` and replace every bracketed placeholder — course facts, comparison table rows, module titles, FAQ answers, instructor bio and credibility indicators, CTA line, etc. Also fill in `thank-you.html` (expected response time, LinkedIn link) and `privacy.html` (retention period, contact email, and any jurisdiction-specific rights).

**Testimonials:** only add genuine quotes from real participants, with their real name and role. Leave the slots as placeholders (or remove the section) until you have real feedback — do not write quotes yourself and attribute them to a person.

**Lead magnet PDF:** `assets/ai-qa-copilot-prompts.pdf` is a real, working file with placeholder prompt text and section structure. Replace the bracketed prompts with your own 20 before linking to it publicly.

**Video preview:** replace `VIDEO_ID` in the YouTube embed (in `index.html`, instructor section) with your real video's ID once you've recorded and uploaded it.

**OG image:** `assets/og-pattern.svg` shows the node/flow visual motif reused across the site. Use it as a starting point (open in any vector or design tool) to produce a real `assets/og-image.jpg` at 1200×630.

## 2. Configure Web3Forms

1. Go to **web3forms.com** and sign up with your Gmail address.
2. Create a form and copy the **Access Key**.
3. In `index.html`, find:
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY_HERE">
   ```
4. Replace the placeholder with your real key.

On successful submission, the form now redirects to `thank-you.html` (configured via the form's `data-thankyou` attribute) instead of only showing an inline message.

## 3. Configure analytics (optional)

`index.html` includes a commented-out Cloudflare Web Analytics snippet in the `<head>`. To enable it:
1. Sign up at cloudflare.com/web-analytics — it works on any site, not just ones hosted on Cloudflare.
2. Copy the token it gives you.
3. Uncomment the `<script>` block and paste in your token.
4. Add the same snippet to `thank-you.html` — since that page only loads after a successful sign-up, its visit count is a simple proxy for conversions.

## 4. Deploy to GitHub Pages

1. Create a GitHub repository and push these files to the root (or a `/docs` folder):
   ```bash
   git init
   git add .
   git commit -m "AI-augmented QA landing page"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
2. In the repo, go to **Settings → Pages** → set source to your branch/folder.
3. Your site publishes at `https://YOUR-USERNAME.github.io/YOUR-REPO/`.
4. Update `<link rel="canonical">`, the `og:url`/`og:image`/`twitter:image` meta tags, and the JSON-LD block in `index.html` with this final URL.

## 5. Test before sharing

- Submit the form yourself and confirm you land on `thank-you.html` and the email arrives in Gmail.
- On a phone (or a browser's device toolbar): check the hamburger menu opens/closes (tap, Escape key, and tap-outside all close it), hero CTA buttons are full-width, and the sticky "Join the next cohort" bar appears once you scroll past the hero.
- Click every nav/CTA anchor link and confirm the target heading isn't hidden behind the sticky header.
- Run Lighthouse in Chrome DevTools for a quick accessibility/performance/SEO check.

## What changed from v1 (mapped to your proposal)

**P1**
- Hero rewritten for QA engineers, with the Requirements → Test Design → Automation → Defects → Reporting chain shown directly under the headline.
- Generic terminal replaced with the Requirement → AI Analysis → Risk Identification → Test Scenarios → Copilot-assisted Automation flow visual; this pattern is now the page's visual identity (reused in curriculum module markers and the `og-pattern.svg` asset).
- Course facts strip added directly below the hero (Level, Duration, Format, Language, Tools, Next cohort).
- "Old way / new way" expanded into a 6-row comparison table (Requirements Analysis, Test Planning, Test Design, Automation, Defect Analysis, Reporting).
- "What you will actually build" section added with 6 concrete output cards (code/report fragments — replace with real screenshots).
- Instructor section expanded: larger photo, title, expertise, credibility indicators, LinkedIn/GitHub links.
- New, separate "Why learn from me" proof-card section (QA Leadership, AI + Copilot, Automation, Real engineering workflows).
- Testimonials section added, structured for genuine quotes only — no fabricated testimonials included.
- FAQ accordion added after the curriculum, covering prerequisites, coding level, tools, Copilot requirement, format, recordings, language, certificate, post-course support.
- All CTAs unified to a single phrase: "Join the next cohort."
- Privacy notice added under the form, plus a full `privacy.html` page.

**P2**
- `thank-you.html` added; form redirects there on success.
- Cloudflare Web Analytics snippet included (commented out, ready to enable).
- Palette changed to dark navy / off-white with electric blue + violet accents; typography moved to IBM Plex Sans for headings/body, IBM Plex Mono kept for technical labels and code.
- Node/flow visual pattern reused across hero, curriculum, and provided as an SVG base for the OG image.
- `scroll-margin-top` added to all anchor-target sections so the sticky nav never covers a heading on jump.
- Mobile hero CTAs are full-width below 500px.
- Mobile menu now closes on Escape and on click-outside, with an animated hamburger → X.
- SEO improved: canonical URL, absolute OG/Twitter image references, Twitter card metadata, JSON-LD Course + Person structured data.
- Free downloadable PDF added ("AI for QA — 20 GitHub Copilot Prompts"), placed near the instructor section — real file, placeholder content.
- Course-preview video embed added near the instructor section (YouTube, placeholder video ID).
- "Sample lesson" section added: Requirement → Prompt → AI Result → QA Review → Final Test Cases.

**P3**
- Sticky mobile-only CTA bar added, appearing once the visitor scrolls past the hero.

## Notes on scale

Web3Forms' free tier is generally suitable for tens to low hundreds of monthly sign-ups, but confirm current limits at web3forms.com/pricing before launch, since pricing pages change.
