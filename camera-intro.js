(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function boot() {
    if (reduced || sessionStorage.getItem('portfolioCameraBoot')) return;
    sessionStorage.setItem('portfolioCameraBoot', '1');
    const el = document.createElement('div');
    el.className = 'camera-boot';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<div class="boot-line"></div><div class="boot-frame"><i></i><i></i><i></i><i></i></div><div class="boot-brand"><strong>YICHENG ZHU</strong><span>FILM / AI VISUAL / 2026</span></div><div class="boot-ready"><b></b>SYSTEM READY</div>';
    document.body.appendChild(el);
    document.body.classList.add('camera-is-booting');
    requestAnimationFrame(function () { el.classList.add('is-on'); });
    setTimeout(function () { el.classList.add('is-open'); }, 1250);
    setTimeout(function () {
      document.body.classList.remove('camera-is-booting');
      el.remove();
    }, 2450);
  }

  function bindCard(card) {
    if (card.dataset.cameraBound) return;
    card.dataset.cameraBound = '1';
    card.addEventListener('pointermove', function (event) {
      const box = card.getBoundingClientRect();
      card.style.setProperty('--card-x', ((event.clientX - box.left) / box.width - .5).toFixed(3));
      card.style.setProperty('--card-y', ((event.clientY - box.top) / box.height - .5).toFixed(3));
    });
    card.addEventListener('pointerleave', function () {
      card.style.setProperty('--card-x', '0');
      card.style.setProperty('--card-y', '0');
    });
  }

  function bindInteractions() {
    document.querySelectorAll('.project-card').forEach(bindCard);
  }

  const observer = new MutationObserver(bindInteractions);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', function () {
    boot();
    bindInteractions();
  });
})();
