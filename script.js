(function () {
  const root = document.documentElement;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);

  const updateThemeButton = () => {
    if (!themeToggle) return;
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  };
  updateThemeButton();

  themeToggle?.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    updateThemeButton();
  });

  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  navToggle?.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navList?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  const modal = document.getElementById('reservation-modal');
  const openButtons = document.querySelectorAll('[data-open-modal="reservation-modal"]');
  const closeButtons = modal?.querySelectorAll('[data-close-modal]') ?? [];
  const openModal = () => {
    modal?.classList.add('open');
    modal?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal?.querySelector('input')?.focus();
  };
  const closeModal = () => {
    modal?.classList.remove('open');
    modal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  openButtons.forEach((btn) => btn.addEventListener('click', openModal));
  closeButtons.forEach((btn) => btn.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal?.classList.contains('open')) closeModal();
  });

  const form = document.getElementById('reservation-form');
  const whatsappLink = document.getElementById('whatsapp-link');
  const emailLink = document.getElementById('email-link');

  const buildMessage = () => {
    const data = new FormData(form);
    const fullName = data.get('fullName') || '';
    const date = data.get('date') || '';
    const time = data.get('time') || '';
    const guests = data.get('guests') || '';
    const notes = data.get('notes') || '';
    return [
      'Hello Afro Deli & Coffee,',
      '',
      'I would like to request a reservation.',
      `Name: ${fullName}`,
      `Date: ${date}`,
      `Time: ${time}`,
      `Guests: ${guests}`,
      `Notes: ${notes || 'None'}`,
      '',
      'Please confirm availability. Thank you.'
    ].join('\n');
  };

  const syncReservationLinks = () => {
    const message = buildMessage();
    const encoded = encodeURIComponent(message);
    whatsappLink.href = `https://wa.me/35677772988?text=${encoded}`;
    emailLink.href = `mailto:afrodeliandcoffee@gmail.com?subject=${encodeURIComponent('Reservation request')}&body=${encoded}`;
  };

  form?.addEventListener('input', syncReservationLinks);
  form?.addEventListener('change', syncReservationLinks);
  syncReservationLinks();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();
