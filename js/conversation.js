(() => {
  const rolePlays = [
    {
      label: 'Role Play 01 · Welcome to Malaysia',
      title: 'A friend visits Malaysia',
      members: 'Yong Soon & Bing Sheng',
      lines: [
        ['bs', '안녕하세요, 용순 씨. 오늘 공항에 가요?', 'bs: Hello, Yong Soon. Are you going to the airport today?'],
        ['ys', '네, 빙셩 씨. 한국에서 친구가 말레이시아에 와요.', 'ys: Yes, Bing Sheng. My friend is coming to Malaysia from Korea.'],
        ['bs', '정말요? 친구는 언제 도착해요?', 'bs: Really? When does your friend arrive?'],
        ['ys', '오늘 오후 세 시에 쿠알라룸푸르 공항에 도착해요.', 'ys: They arrive at Kuala Lumpur Airport at three this afternoon.'],
        ['bs', '공항에서 친구와 무엇을 할 거예요?', 'bs: What will you do with your friend at the airport?'],
        ['ys', '먼저 친구를 만나고, 같이 택시를 타고 호텔에 갈 거예요.', 'ys: First, I will meet my friend and we will take a taxi to the hotel together.'],
        ['bs', '저녁에는 말레이시아 음식을 먹어요?', 'bs: Will you eat Malaysian food for dinner?'],
        ['ys', '네, 나시르막을 먹고 페트로나스 타워도 보여 줄 거예요.', 'ys: Yes, we will eat nasi lemak and I will show my friend the Petronas Towers too.'],
      ],
    },
    {
      label: 'Role Play 02 · Finding Places',
      title: 'Looking for the hospital',
      members: 'Yong Soon & Wen Khang',
      lines: [
        ['ys', '실례합니다. 병원이 어디에 있어요?', 'ys: Excuse me. Where is the hospital?'],
        ['wk', '병원은 은행 옆에 있어요.', 'wk: The hospital is beside the bank.'],
        ['ys', '여기에서 멀어요? 걸어서 갈 수 있어요?', 'ys: Is it far from here? Can I walk there?'],
        ['wk', '아니요, 가까워요. 걸어서 십 분 정도 걸려요.', 'wk: No, it is close. It takes about ten minutes on foot.'],
        ['ys', '병원 앞에 약국이 있어요?', 'ys: Is there a pharmacy in front of the hospital?'],
        ['wk', '네, 약국이 병원 앞에 있어요. 병원은 약국 뒤에 있어요.', 'wk: Yes, the pharmacy is in front of the hospital. The hospital is behind the pharmacy.'],
        ['ys', '감사합니다. 아픈 친구를 만나러 병원에 가요.', 'ys: Thank you. I am going to the hospital to visit my sick friend.'],
        ['wk', '제가 병원 입구까지 같이 갈게요. 이쪽으로 가요.', 'wk: I will go with you to the hospital entrance. Let’s go this way.'],
      ],
    },
    {
      label: 'Role Play 03 · Bookstore Location',
      title: 'Buy books, then visit a cafe',
      members: 'Tze Xi & Joseph & Kong Wei',
      lines: [
        ['tx', '안녕하세요. 서점이 어디에 있어요?', 'tx: Hello. Where is the bookstore?'],
        ['Joseph', '은행 옆에 있어요. 큰 건물이라서 쉽게 찾을 수 있어요.', 'Joseph: It is beside the bank. It is a large building, so you can find it easily.'],
        ['kw', '서점에서 뭐 할 거예요?', 'kw: What are you going to do at the bookstore?'],
        ['tx', '저는 친구와 같이 책을 보고 한국어 책도 살 거예요.', 'tx: I am going to look at books with my friend and buy a Korean book too.'],
        ['Joseph', '저도 한국어 책을 사고 싶어요. 한국어 책이 많아요?', 'Joseph: I want to buy a Korean book too. Are there many Korean books?'],
        ['kw', '네, 이 층에 한국어 책이 많이 있어요. 같이 찾아봐요.', 'kw: Yes, there are many Korean books on this floor. Let’s look for them together.'],
        ['tx', '책을 산 후에 서점 옆 카페에 가요?', 'tx: Shall we go to the cafe beside the bookstore after buying the books?'],
        ['Joseph', '좋아요. 카페에서 커피를 마시면서 오늘 수업 이야기를 해요.', 'Joseph: Great. Let’s drink coffee at the cafe and talk about today’s class.'],
      ],
    },
  ];

  const cards = document.querySelectorAll('.conversation-card');
  rolePlays.forEach((rolePlay, index) => {
    const card = cards[index];
    if (!card) return;
    if (index === 1) {
      const scene = card.querySelector('.scene-card');
      if (scene) {
        scene.textContent = '\u{1F3E5}';
        scene.setAttribute('aria-label', 'Hospital scene');
      }
    } else if (index === 2) {
      const scene = card.querySelector('.scene-card');
      if (scene) {
        scene.textContent = '\u{1F4DA}';
        scene.setAttribute('aria-label', 'Bookstore scene');
      }
    }
    card.querySelector('.video-kicker').textContent = rolePlay.label;
    card.querySelector('h2').textContent = rolePlay.title;
    const bubbles = card.querySelector('.dialogue-bubbles');
    bubbles.replaceChildren(...rolePlay.lines.map(([speaker, korean, english], lineIndex) => {
      const bubble = document.createElement('p');
      bubble.className = lineIndex % 2 ? 'bubble alt' : 'bubble';
      bubble.lang = 'ko';
      const translation = document.createElement('small');
      translation.lang = 'en';
      translation.textContent = english;
      bubble.append(`${speaker}: ${korean}`, translation);
      return bubble;
    }));
    const button = card.querySelector('[data-video]');
    button.dataset.title = `${rolePlay.title} · Role Play`;
    button.dataset.members = rolePlay.members;
    const memberNote = card.querySelector('.members');
    if (memberNote) memberNote.textContent = rolePlay.members;
  });

  const lead = document.querySelector('.lesson-hero .section-lead');
  if (lead) lead.textContent = 'Role Plays 1 and 2 have two speakers; Role Play 3 has three. Each has eight Korean lines with English translations, designed for a natural 1–3 minute short drama.';
  document.querySelector('.media-note')?.remove();
})();
