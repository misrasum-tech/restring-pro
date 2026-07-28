const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.querySelectorAll('.faq-q').forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const symbol = button.querySelector('span');
    const isOpen = answer.classList.toggle('open');
    symbol.textContent = isOpen ? '−' : '+';
  });
});

const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get('name') || 'there';
  formNote.textContent = `Thanks, ${name}. This demo form is ready to connect to email, Microsoft Forms, HubSpot or another backend.`;
  form.reset();
});

const cookieBanner = document.getElementById('cookieBanner');
const acceptCookies = document.getElementById('acceptCookies');
if (!localStorage.getItem('restringProCookieNotice')) {
  cookieBanner.classList.add('show');
}
acceptCookies?.addEventListener('click', () => {
  localStorage.setItem('restringProCookieNotice', 'accepted');
  cookieBanner.classList.remove('show');
});
