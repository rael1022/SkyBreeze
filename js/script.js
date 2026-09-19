(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.textContent = open ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.textContent = '☰';
    }));
  }

  const modal = document.querySelector('.modal');
  const modalTitle = document.querySelector('[data-modal-title]');
  const modalMeta = document.querySelector('[data-modal-meta]');
  const modalScript = document.querySelector('[data-modal-script]');
  let lastTrigger = null;

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastTrigger?.focus();
  }

  document.querySelectorAll('[data-video]').forEach(button => {
    button.addEventListener('click', () => {
      if (!modal) return;
      lastTrigger = button;
      const { word, romanization, meaning, sentence, translation, members, title } = button.dataset;
      modalTitle.textContent = title || `${word} · ${meaning}`;
      modalMeta.textContent = members || `${romanization} · ${meaning}`;
      modalScript.innerHTML = sentence
        ? `<strong>Suggested line:</strong> ${sentence}<br><span>${translation}</span>`
        : '<strong>Student video slot</strong> Add the group’s recorded face-to-face Korean dialogue here.';
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      modal.querySelector('.modal-close').focus();
    });
  });

  if (modal) {
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
  }

  let score = 0;
  const scoreValue = document.querySelector('[data-score]');
  const scoreTotal = document.querySelector('[data-total]');
  const answerButtons = [...document.querySelectorAll('.answer')];
  if (scoreTotal) scoreTotal.textContent = document.querySelectorAll('.quiz-card').length;

  answerButtons.forEach(button => {
    button.addEventListener('click', () => {
      const group = button.closest('.answers');
      if (group.dataset.answered) return;
      group.dataset.answered = 'true';
      const isCorrect = button.dataset.correct === 'true';
      const feedback = group.parentElement.querySelector('.quiz-feedback');
      group.querySelectorAll('.answer').forEach(answer => {
        answer.disabled = true;
        if (answer.dataset.correct === 'true') answer.classList.add('correct');
      });
      if (isCorrect) {
        score += 1;
        button.classList.add('correct');
        feedback.textContent = '✦ Great flight! That is correct.';
        feedback.className = 'quiz-feedback good';
      } else {
        button.classList.add('wrong');
        feedback.textContent = `Try noticing the highlighted answer — you’ll get it next time.`;
        feedback.className = 'quiz-feedback bad';
      }
      if (scoreValue) scoreValue.textContent = score;
    });
  });

  document.querySelector('[data-restart]')?.addEventListener('click', () => {
    score = 0;
    if (scoreValue) scoreValue.textContent = score;
    document.querySelectorAll('.answers').forEach(group => {
      delete group.dataset.answered;
      group.querySelectorAll('.answer').forEach(answer => {
        answer.disabled = false;
        answer.classList.remove('correct', 'wrong');
      });
      const feedback = group.parentElement.querySelector('.quiz-feedback');
      feedback.textContent = '';
      feedback.className = 'quiz-feedback';
    });
  });

  document.querySelectorAll('.flashcard').forEach(card => {
    card.addEventListener('click', () => {
      const flipped = card.classList.toggle('flipped');
      card.setAttribute('aria-pressed', String(flipped));
      card.setAttribute('aria-label', flipped ? 'Flip card to see the Korean word' : 'Flip card to see the English meaning');
    });
  });

  document.querySelectorAll('[data-reveal]').forEach(button => {
    button.addEventListener('click', () => {
      const reveal = button.closest('.grammar-card').querySelector('.grammar-reveal');
      const shown = reveal.classList.toggle('show');
      button.textContent = shown ? 'Hide learning tip' : 'Reveal learning tip';
      button.setAttribute('aria-expanded', String(shown));
    });
  });

})();
