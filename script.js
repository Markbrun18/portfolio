// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

const cards = document.querySelectorAll('.gallery-card');
const filterButtons = document.querySelectorAll('.filter-button');
const galleryCards = document.querySelectorAll('.gallery-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.classList.toggle('active', btn === button);
    });

    galleryCards.forEach((card) => {
      card.style.display = filter === 'all' || card.dataset.kind === filter ? '' : 'none';
    });
  });
});

const heroFilters = document.querySelectorAll('.hero-box[data-filter]');
heroFilters.forEach((heroFilter) => {
  heroFilter.addEventListener('click', (event) => {
    const filter = heroFilter.dataset.filter;
    const targetButton = Array.from(filterButtons).find((btn) => btn.dataset.filter === filter);

    if (targetButton) {
      targetButton.click();
    }
  });
});

const aboutSection = document.getElementById('about');
const firstTimelineItem = document.querySelector('.timeline-item:first-child');
if (aboutSection && firstTimelineItem && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        firstTimelineItem.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  observer.observe(aboutSection);
} else if (firstTimelineItem) {
  firstTimelineItem.classList.add('appear');
}

// Function to stop all media in a modal
function stopModalMedia(modal) {
  // Stop all video elements
  modal.querySelectorAll('video').forEach((video) => {
    video.pause();
    video.currentTime = 0;
  });

  // Stop all iframes (Vimeo, YouTube, etc.)
  modal.querySelectorAll('iframe').forEach((iframe) => {
    const src = iframe.src;
    iframe.src = '';
    iframe.src = src;
  });
}

// Handle individual modal open for each gallery card
cards.forEach((card) => {
  card.addEventListener('click', () => {
    const modalId = card.dataset.modal;
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    }
  });
});

// Handle modal close buttons for all modals
document.querySelectorAll('.modal-close').forEach((closeBtn) => {
  closeBtn.addEventListener('click', (e) => {
    const modal = e.target.closest('.modal-backdrop');
    if (modal) {
      stopModalMedia(modal);
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
});

// Handle clicking modal backdrop to close (clicking outside the modal)
document.querySelectorAll('.modal-backdrop').forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      stopModalMedia(modal);
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
});
