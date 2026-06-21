const CMD_TEXT = 'cat perfil.json';

function typeText(element, text, speed, callback) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
      setTimeout(type, speed);
    } else {
      if (callback) callback();
    }
  }
  type();
}

function showLine(id, delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('hidden');
      resolve();
    }, delay);
  });
}

async function runTerminal() {
  const cmd1 = document.getElementById('cmd1');
  if (!cmd1) return;

  // Pequeña pausa inicial
  await new Promise(r => setTimeout(r, 600));

  // Tipea el comando
  await new Promise(resolve => typeText(cmd1, CMD_TEXT, 50, resolve));

  // Muestra las líneas de output
  await showLine('line2', 300);
  await showLine('line3', 600);
  await showLine('line4', 900);
  await showLine('line5', 1200);
}

document.addEventListener('DOMContentLoaded', runTerminal);


/* ===========================
   SCROLL REVEAL
   =========================== */
function initReveal() {
  const targets = document.querySelectorAll(
    '.section-label, .section-title, .about-text, .about-stats, ' +
    '.stat-card, .stack-group, .project-card, .contact-intro, ' +
    '.contact-card, .github-stat-img'
  );

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger suave
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initReveal);


/* ===========================
   NAV — SCROLL SHADOW + MOBILE
   =========================== */
function initNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.querySelector('.nav-links');

  // Sombra al bajar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.style.boxShadow = '0 4px 32px rgba(0,0,0,0.4)';
    } else {
      nav.style.boxShadow = 'none';
    }
  }, { passive: true });

  // Toggle móvil
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar al hacer click en un link
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }
}

document.addEventListener('DOMContentLoaded', initNav);


/* ===========================
   ACTIVE NAV LINK
   =========================== */
function initActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(a => {
            a.style.color = a.getAttribute('href') === `#${id}`
              ? 'var(--accent)'
              : 'var(--text-muted)';
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => observer.observe(s));
}

document.addEventListener('DOMContentLoaded', initActiveLink);
