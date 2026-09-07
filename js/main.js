// ==============================================================
// Footer year
// ==============================================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ==============================================================
// Mobile nav: toggle, close-on-link, close-on-Escape,
// close-on-click-outside, animated hamburger → X (CSS-driven
// via aria-expanded, see styles.css .nav__toggle[aria-expanded]).
// ==============================================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('nav-menu');

function openMenu() {
  navMenu.classList.add('is-open');
  navToggle.setAttribute('aria-expanded', 'true');
}
function closeMenu() {
  navMenu.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      closeMenu();
      navToggle.focus();
    }
  });

  document.addEventListener('click', (e) => {
    const clickedInsideNav = navMenu.contains(e.target) || navToggle.contains(e.target);
    if (!clickedInsideNav && navMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

// ==============================================================
// Sticky mobile CTA: show once the hero has scrolled out of view
// ==============================================================
const heroEl = document.getElementById('top');
const stickyCta = document.getElementById('stickyCta');

if (heroEl && stickyCta && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      stickyCta.classList.toggle('is-visible', !entry.isIntersecting);
    },
    { rootMargin: '0px 0px 0px 0px', threshold: 0 }
  );
  observer.observe(heroEl);
}

// ==============================================================
// Web3Forms submission (AJAX, no page reload, no backend needed)
// Docs: https://docs.web3forms.com/
// On success, redirects to the page named in data-thankyou
// (falls back to an inline message if that attribute is absent).
// ==============================================================
const form = document.getElementById('signupForm');

if (form) {
  const statusEl = document.getElementById('formStatus');
  const submitBtn = form.querySelector('.form__submit');
  const submitLabel = submitBtn.querySelector('.btn__label');
  const thankYouUrl = form.dataset.thankyou;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const accessKey = form.querySelector('input[name="access_key"]').value;
    if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
      statusEl.textContent = 'Form is not configured yet: add your Web3Forms access key in index.html.';
      statusEl.setAttribute('data-state', 'error');
      return;
    }

    const formData = new FormData(form);
    const originalLabel = submitLabel.textContent;
    submitBtn.disabled = true;
    submitLabel.textContent = 'Sending…';
    statusEl.textContent = '';
    statusEl.removeAttribute('data-state');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        form.reset();
        if (thankYouUrl) {
          window.location.href = thankYouUrl;
          return;
        }
        statusEl.textContent = "Thanks — your sign-up request was sent. I'll be in touch soon.";
        statusEl.setAttribute('data-state', 'success');
      } else {
        statusEl.textContent = result.message || 'Something went wrong. Please try again or email me directly.';
        statusEl.setAttribute('data-state', 'error');
      }
    } catch (error) {
      statusEl.textContent = 'Network error — please check your connection and try again.';
      statusEl.setAttribute('data-state', 'error');
    } finally {
      submitBtn.disabled = false;
      submitLabel.textContent = originalLabel;
    }
  });
}
