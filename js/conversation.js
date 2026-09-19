(() => {
  const rolePlays = [
    {
      label: 'Role Play 01 · Airport Journey',
      title: 'Meeting a friend at the airport',
      members: 'Yong Soon & Bing Sheng',
      lines: [
        ['A', '안녕하세요, 용순 씨. 오늘 어디에 가요?', 'Hello, Yong Soon. Where are you going today?'],
        ['B', '안녕하세요, 빙셩 씨. 저는 공항에 가요. 한국에 오는 친구를 마중하러 가요.', 'Hello, Bing Sheng. I am going to the airport to meet a friend who is coming to Korea.'],
        ['A', '아, 정말요? 친구가 어느 나라에서 와요?', 'Oh, really? Which country is your friend coming from?'],
        ['B', '제 친구는 말레이시아에서 와요. 오늘 오후 세 시에 공항에 도착해요.', 'My friend is coming from Malaysia. They arrive at the airport at three this afternoon.'],
        ['A', '공항까지 어떻게 가요? 버스를 타고 가요, 아니면 택시를 타고 가요?', 'How are you going to the airport? Are you taking a bus or a taxi?'],
        ['B', '짐이 많아서 택시를 타고 가요. 공항에서 친구와 저녁도 먹을 거예요.', 'We have a lot of luggage, so I am taking a taxi. We will also have dinner at the airport.'],
        ['A', '좋아요. 친구를 만나면 저에게 사진도 보여 주세요.', 'That sounds nice. Please show me photos when you meet your friend.'],
        ['B', '네, 알겠어요. 다음 주에 친구와 함께 다시 만나요.', 'Sure. Let’s meet again with my friend next week.'],
      ],
    },
    {
      label: 'Role Play 02 · Finding Places',
      title: 'Looking for the hospital',
      members: 'Yong Soon & Wen Khang',
      lines: [
        ['A', '실례합니다. 병원이 어디에 있어요?', 'Excuse me. Where is the hospital?'],
        ['B', '병원은 은행 옆에 있어요.', 'The hospital is beside the bank.'],
        ['A', '여기에서 멀어요? 걸어서 갈 수 있어요?', 'Is it far from here? Can I walk there?'],
        ['B', '아니요, 가까워요. 걸어서 십 분 정도 걸려요.', 'No, it is close. It takes about ten minutes on foot.'],
        ['A', '병원 앞에 약국이 있어요?', 'Is there a pharmacy in front of the hospital?'],
        ['B', '네, 약국이 병원 앞에 있어요. 병원은 약국 뒤에 있어요.', 'Yes, the pharmacy is in front of the hospital. The hospital is behind the pharmacy.'],
        ['A', '감사합니다. 아픈 친구를 만나러 병원에 가요.', 'Thank you. I am going to the hospital to visit my sick friend.'],
        ['B', '제가 병원 입구까지 같이 갈게요. 이쪽으로 가요.', 'I will go with you to the hospital entrance. Let’s go this way.'],
      ],
    },
    {
      label: 'Role Play 03 · Campus Location',
      title: 'Study, then visit a cafe',
      members: 'Tze Xi & Joseph & Kong Wei',
      lines: [
        ['A', '안녕하세요. 도서관이 어디에 있어요?', 'Hello. Where is the library?'],
        ['B', '학생식당 앞에 있어요. 큰 건물이라서 쉽게 찾을 수 있어요.', 'It is in front of the student cafeteria. It is a large building, so you can find it easily.'],
        ['C', '도서관에서 한국어를 공부해요?', 'Do you study Korean at the library?'],
        ['A', '네, 저는 친구와 같이 한국어를 공부하고 책도 읽어요.', 'Yes, I study Korean with a friend and read books too.'],
        ['B', '저는 한국어 책을 빌리고 싶어요. 한국어 책이 많아요?', 'I want to borrow a Korean book. Are there many Korean books?'],
        ['C', '네, 이 층에 한국어 책이 많이 있어요. 같이 찾아봐요.', 'Yes, there are many Korean books on this floor. Let’s look for them together.'],
        ['A', '공부한 후에 도서관 옆 카페에 가요?', 'Shall we go to the cafe beside the library after studying?'],
        ['B', '좋아요. 카페에서 커피를 마시면서 오늘 수업 이야기를 해요.', 'Great. Let’s drink coffee at the cafe and talk about today’s class.'],
      ],
    },
  ];

  const cards = document.querySelectorAll('.conversation-card');
  rolePlays.forEach((rolePlay, index) => {
    const card = cards[index];
    if (!card) return;
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
