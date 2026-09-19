(() => {
  const contextualSentences = {
    공항: ['공항에 친구를 마중하러 가요.', 'I go to the airport to meet a friend.'],
    우체국: ['우체국에 편지를 부치러 가요.', 'I go to the post office to mail a letter.'],
    은행: ['은행에 돈을 찾으러 가요.', 'I go to the bank to withdraw money.'],
    병원: ['병원에 아픈 친구를 만나러 가요.', 'I go to the hospital to visit a sick friend.'],
    약국: ['약국에서 감기약을 사요.', 'I buy cold medicine at the pharmacy.'],
    미용실: ['미용실에서 머리를 잘라요.', 'I get a haircut at the hair salon.'],
    도서관: ['도서관에서 한국어를 공부해요.', 'I study Korean at the library.'],
    식당: ['식당에서 친구와 점심을 먹어요.', 'I eat lunch with a friend at the restaurant.'],
    학교: ['학교에 한국어 수업을 들으러 가요.', 'I go to school to take a Korean class.'],
    시장: ['시장에서 과일을 사요.', 'I buy fruit at the market.'],
    편의점: ['편의점에서 우유를 사요.', 'I buy milk at the convenience store.'],
    서점: ['서점에서 한국어 책을 찾아요.', 'I look for a Korean book at the bookstore.'],
    카페: ['카페에서 친구와 커피를 마셔요.', 'I drink coffee with a friend at a cafe.'],
    영화관: ['영화관에서 영화를 봐요.', 'I watch a movie at the cinema.'],
    공원: ['공원에서 가족과 산책해요.', 'I take a walk with my family in the park.'],
    백화점: ['백화점에서 어머니와 옷을 사요.', 'I buy clothes with my mother at the department store.'],
    슈퍼마켓: ['슈퍼마켓에서 저녁 재료를 사요.', 'I buy ingredients for dinner at the supermarket.'],
    호텔: ['호텔에서 하루 밤 자요.', 'I stay one night at a hotel.'],
  };

  document.querySelectorAll('.vocab-item').forEach(item => {
    const word = item.querySelector('strong[lang="ko"]')?.textContent.trim();
    const example = item.querySelector('.example');
    const sentence = contextualSentences[word];
    if (!example || !sentence) return;

    const translation = document.createElement('span');
    translation.lang = 'en';
    translation.textContent = sentence[1];
    example.replaceChildren(document.createTextNode(sentence[0]), translation);
  });
})();
