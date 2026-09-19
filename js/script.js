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
  const videoStage = document.querySelector('.video-stage');
  const videoPlaceholder = document.querySelector('.video-placeholder');
  let lastTrigger = null;

  modalScript?.remove();
  videoPlaceholder?.querySelector('p')?.remove();

  const videoSources = document.querySelector('.cloud-grid')
    ? ['vocab-student-01.mp4', 'vocab-student-02.mp4', 'vocab-student-03.mp4', 'vocab-student-04.mp4', 'vocab-student-05.mp4', 'vocab-student-06.mp4']
    : document.querySelector('.conversation-list')
      ? ['dialogue-roleplay-01-airport.mp4', 'dialogue-roleplay-02-places.mp4', 'dialogue-roleplay-03-campus.mp4']
      : [];

  function setModalVideo(filename) {
    if (!videoStage) return;
    let player = videoStage.querySelector('.media-player');
    if (!player) {
      player = document.createElement('video');
      player.className = 'media-player';
      player.controls = true;
      player.playsInline = true;
      player.preload = 'metadata';
      videoStage.append(player);
    }
    player.pause();
    player.hidden = true;
    if (videoPlaceholder) videoPlaceholder.hidden = false;
    player.oncanplay = () => {
      player.hidden = false;
      if (videoPlaceholder) videoPlaceholder.hidden = true;
    };
    player.onerror = () => {
      player.hidden = true;
      if (videoPlaceholder) videoPlaceholder.hidden = false;
    };
    player.src = `videos/${filename}`;
    player.load();
  }

  function closeModal() {
    if (!modal) return;
    modal.querySelector('.media-player')?.pause();
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastTrigger?.focus();
  }

  document.querySelectorAll('[data-video]').forEach((button, index) => {
    if (videoSources[index]) button.dataset.videoSrc = videoSources[index];
    button.addEventListener('click', () => {
      if (!modal) return;
      lastTrigger = button;
      const { word, romanization, meaning, members, title } = button.dataset;
      modalTitle.textContent = title || `${word} · ${meaning}`;
      modalMeta.textContent = members || `${romanization} · ${meaning}`;
      modalMeta.hidden = Boolean(title && document.querySelector('.cloud-grid'));
      const videoFile = button.dataset.videoSrc;
      setModalVideo(videoFile);
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
