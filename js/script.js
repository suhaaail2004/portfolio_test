/**
 * PORTFOLIO CLIENT-SIDE INTERACTIVITY
 * Author: Suhail Shihabudheen
 * Stack: Pure Vanilla JavaScript (No Frameworks)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. THEME SWITCHER (DARK / LIGHT MODE)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const rootElement = document.documentElement;

  // Retrieve stored theme or default to 'dark'
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = rootElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      rootElement.setAttribute('data-theme', 'light');
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
        themeToggleBtn.setAttribute('title', 'Switch to dark theme');
      }
    } else {
      rootElement.removeAttribute('data-theme');
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
        themeToggleBtn.setAttribute('title', 'Switch to light theme');
      }
    }
  }

  /* --------------------------------------------------------------------------
     2. MOBILE NAVIGATION MENU (HAMBURGER DRAWER)
     -------------------------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav when clicking on any menu link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          hamburgerBtn.classList.remove('open');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close when clicking outside of the nav menu
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.focus();
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. NAVBAR SCROLL EFFECT & ACTIVE SECTION HIGHLIGHTING
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');

  function handleNavbarScroll() {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // Scrollspy to set active navigation link
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => sectionObserver.observe(section));

  /* --------------------------------------------------------------------------
     4. TYPING ANIMATION (HERO SECTION)
     -------------------------------------------------------------------------- */
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const words = [
      'Aspiring DevOps Engineer',
      'Cloud Infrastructure Enthusiast',
      'RHCSA Certified SysAdmin',
      'Linux & Automation Specialist'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        // Word finished, pause before backspacing
        typingSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        // Backspacing finished, advance to next word
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 400;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  /* --------------------------------------------------------------------------
     5. SCROLL-BASED REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-item');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  /* --------------------------------------------------------------------------
     6. HERO TERMINAL INTERACTIVE TABS
     -------------------------------------------------------------------------- */
  const terminalTabs = document.querySelectorAll('.term-tab-btn');
  const terminalOutputs = document.querySelectorAll('.term-output-view');

  if (terminalTabs.length > 0) {
    terminalTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetViewId = tab.getAttribute('data-tab-target');

        terminalTabs.forEach((t) => t.classList.remove('active'));
        terminalOutputs.forEach((out) => out.classList.remove('active'));

        tab.classList.add('active');
        const targetView = document.getElementById(targetViewId);
        if (targetView) {
          targetView.classList.add('active');
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. BACK TO TOP BUTTON
     -------------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 450) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      },
      { passive: true }
    );

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* --------------------------------------------------------------------------
     8. DYNAMIC COPYRIGHT YEAR
     -------------------------------------------------------------------------- */
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = String(new Date().getFullYear());
  }

  /* --------------------------------------------------------------------------
     9. COPY EMAIL TO CLIPBOARD WITH TOAST NOTIFICATION
     -------------------------------------------------------------------------- */
  const copyEmailBtns = document.querySelectorAll('.btn-copy-email');
  const toastNotification = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  function showToast(message) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = message;
    toastNotification.classList.add('show');

    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3200);
  }

  copyEmailBtns.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const emailToCopy = btn.getAttribute('data-email') || 'suhail.shihabudheen.devops@example.com';

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(emailToCopy);
        } else {
          // Fallback method for unsecure contexts / older browser versions
          const tempInput = document.createElement('input');
          tempInput.value = emailToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
        showToast(`Copied ${emailToCopy} to clipboard!`);
      } catch (err) {
        showToast(`Email: ${emailToCopy}`);
      }
    });
  });
});
