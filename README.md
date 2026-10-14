# QA Engineering with AI

A single-page B2B landing page for an e-commerce Quality Engineering Transformation Program.

## Project contents

- `index.html` — complete page, inline CSS and vanilla JavaScript.
- `README.md` — launch configuration and verification notes.

No build step or JavaScript framework is required. Open `index.html` in a browser to inspect it, or upload it to a static website host. Use HTTPS for the live page.

Google Fonts and genuine Simple Icons logo images are linked externally. No local image assets are required. System font fallbacks keep the copy readable without Google Fonts. An internet connection is required to load the vendor logo images and submit inquiries.

## Enable inquiry delivery

The form uses Web3Forms. No working recipient key was supplied, so live submission is intentionally unconfigured.

Find this field in `index.html`:

```html
<input type="hidden" name="access_key" value="">
```

Insert your public Web3Forms access key into `value`. This key routes inquiries to the email configured in your Web3Forms account. Do not insert an API secret or a model-provider credential.

The form collects name, work email, company, role and the team's objective. It includes required-field validation, a honeypot, duplicate-submit prevention, pending feedback and success/error messages. It reports success only when Web3Forms confirms the request. Failed requests preserve the entered details. A successful inquiry requests a call; it does not reserve a meeting time.

Before launch, submit an inquiry from the deployed domain and verify receipt at the intended address. No real inquiries were sent during development.

Integration reference: https://docs.web3forms.com/how-to-guides/html-and-javascript

## Finish your business details

1. Add a verified advisor name, a short biography, a real photo and a LinkedIn URL in the section marked `id="advisor"`. No identity, testimonial, certification or client result was invented.
2. Complete the privacy notice with your business/controller identity, contact details, legal basis, retention period and applicable rights.
3. Confirm the program's delivery format and duration. The current copy describes project-based enablement and scopes duration on the strategy call.
4. If desired, add your contact email and verified LinkedIn link to the footer.

## Copy and conversion decisions

- Lead with the business bottleneck: faster AI development requires faster, reliable quality feedback.
- Define SDLC and ADLC at first mention, then show the change in the engineer's responsibility.
- Use e-commerce throughout, including duplicate payments, stock contention, pricing rules and peak traffic.
- Show reviewable risk, test and triage artifacts instead of broad claims about AI.
- Give Copilot, Claude and Gemini different jobs, with official capability links and a trademark note.
- Include developers and platform engineers as well as QA; Quality Engineering is a capability for every AI Builder.
- Tie business impact to measurable baselines rather than invented ROI percentages.
- Use strategy-call CTAs throughout and keep the final inquiry form focused on qualification.

## Accessibility and responsive behavior

Includes a skip link, semantic landmarks, labeled inputs, visible focus states, native table headers, a mobile navigation toggle, keyboard-accessible artifact tabs, readable status text and reduced-motion support. Narrow layouts stack content; wide tables and code snippets use their own scroll regions. The page includes fallbacks for navigation and artifact access when JavaScript is disabled.

## Verification performed

- JavaScript syntax check passed.
- Static HTML checks passed: one H1, unique IDs, working section anchors, labeled fields, scoped table headers, image alt text and no prohibited terminology in visible copy.
- Interaction handlers passed isolated checks using DOM stubs and mocked requests: navigation toggle, Escape, link dismissal, keyboard tabs, privacy disclosure, unconfigured form guard, rejected submission, timeout feedback, confirmed success, honeypot and duplicate-submit prevention.

Rendered desktop/mobile checks could not run because this environment had no browser binary and blocked the browser download. External logo CDN retrieval was also blocked here. Responsive CSS is implemented, but rendered layout, font loading, actual logo availability and live inquiry delivery still need verification in a normal browser before publication.

## Vendor references

- GitHub Copilot: https://docs.github.com/en/copilot/get-started/about-github-copilot
- Claude: https://platform.claude.com/docs/en/intro
- Gemini image understanding: https://ai.google.dev/gemini-api/docs/image-understanding

Vendor names and marks belong to their respective owners. Their inclusion does not imply sponsorship or endorsement.
