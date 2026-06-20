(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.appendChild(progress);

  const field = document.createElement('div');
  field.className = 'petal-field';
  document.body.appendChild(field);

  const petalCount = window.innerWidth < 700 ? 12 : 22;
  for (let i = 0; i < petalCount; i += 1) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.setProperty('--x', `${(Math.random() * 160 - 80).toFixed(0)}px`);
    petal.style.setProperty('--r', `${Math.random() * 180}deg`);
    petal.style.animationDuration = `${10 + Math.random() * 12}s`;
    petal.style.animationDelay = `${Math.random() * -18}s`;
    field.appendChild(petal);
  }

  const orb = document.createElement('div');
  orb.className = 'light-orb';
  document.body.appendChild(orb);
  let mouseX = innerWidth / 2;
  let mouseY = innerHeight / 2;
  let orbX = mouseX;
  let orbY = mouseY;
  window.addEventListener('pointermove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }, { passive: true });

  function animateOrb() {
    orbX += (mouseX - orbX) * 0.08;
    orbY += (mouseY - orbY) * 0.08;
    orb.style.left = `${orbX}px`;
    orb.style.top = `${orbY}px`;
    requestAnimationFrame(animateOrb);
  }
  animateOrb();

  const cover = document.querySelector('.cover');
  const coverPhoto = document.querySelector('.cover-photo');
  const coverCard = document.querySelector('.cover-card');
  const monogram = document.querySelector('.monogram');
  if (cover && coverPhoto && coverCard && monogram) {
    cover.addEventListener('pointermove', (event) => {
      const rect = cover.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      cover.style.transform = `rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
      coverPhoto.style.transform = `scale(1.045) translate(${(-x * 12).toFixed(1)}px, ${(-y * 12).toFixed(1)}px)`;
      coverCard.style.transform = `translate(${(x * 10).toFixed(1)}px, ${(-7 + y * 8).toFixed(1)}px)`;
      monogram.style.transform = `translate(${(x * -10).toFixed(1)}px, ${(-7 + y * -8).toFixed(1)}px)`;
    }, { passive: true });
    cover.addEventListener('pointerleave', () => {
      cover.style.transform = '';
      coverPhoto.style.transform = '';
      coverCard.style.transform = '';
      monogram.style.transform = '';
    });
  }

  function updateProgress() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - innerHeight;
    const progressValue = max > 0 ? (scrollY / max) * 100 : 0;
    progress.style.width = `${progressValue}%`;

    const hero = document.querySelector('.hero');
    if (hero && scrollY < innerHeight) {
      const offset = scrollY * 0.12;
      hero.style.transform = `translateY(${offset}px)`;
      hero.style.opacity = `${Math.max(0.78, 1 - scrollY / 1800)}`;
    }
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      link.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(.96)' },
        { transform: 'scale(1)' }
      ], { duration: 260, easing: 'ease-out' });
    });
  });
})();