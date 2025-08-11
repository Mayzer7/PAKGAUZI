// Доработка сайта

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.afisha-dates.swiper');
  if (!container) return;

  const nextBtn = container.querySelector('.afisha-arrow-right');
  
  const swiper = new Swiper(container, {
    slidesPerView: 'auto',
    slidesPerGroup: 3,
    spaceBetween: 40,
    freeMode: true,
    grabCursor: false,
    simulateTouch: true,
    slidesOffsetAfter: 160,
    mousewheel: { forceToAxis: true, releaseOnEdges: true },
    watchOverflow: true,
    breakpoints: {
      0: {
        slidesPerGroup: 3,
        spaceBetween: 20,
      },
      601: {
        slidesPerGroup: 3,
        spaceBetween: 32,
      },
      1351: {
        slidesPerGroup: 3,
        spaceBetween: 40,
      },
    },
  });

  nextBtn.addEventListener('click', () => {
    swiper.slideNext();
  });

  function updateNextBtnState() {
    if (swiper.isEnd) {
      nextBtn.classList.add('disabled');
      const path = nextBtn.querySelector('svg path');
      if (path) path.setAttribute('fill', '#999999');
      nextBtn.disabled = true;
    } else {
      nextBtn.classList.remove('disabled');
      const path = nextBtn.querySelector('svg path');
      if (path) path.setAttribute('fill', '#0E0D0D'); 
      nextBtn.disabled = false;
    }
  }

  swiper.on('slideChange', updateNextBtnState);
  swiper.on('reachEnd', updateNextBtnState);
  swiper.on('fromEdge', updateNextBtnState);

  updateNextBtnState();
});


// Одиночная карточка
function isVisible(el) {
  return !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length));
}

function updateContainer(container) {
  const cards = Array.from(container.querySelectorAll('.afisha-page-card'));
  const visibleCards = cards.filter(isVisible);
  const count = visibleCards.length;

  const isSingle = count === 1;

  container.classList.toggle('single-cards', isSingle);

  cards.forEach(card => {
    card.classList.toggle('single-card', isSingle);
    const img = card.querySelector('.afisha-page-card-img');
    if (img) img.classList.toggle('single-card-img', isSingle);
    const btns = card.querySelector('.afisha-page-card-buttons');
    if (btns) btns.classList.toggle('single-card-buttons', isSingle);
  });
}

function updateAll() {
  document.querySelectorAll('.afisha-page-cards').forEach(updateContainer);
}

let _debounceTimer;
function scheduleUpdate() {
  clearTimeout(_debounceTimer);
  _debounceTimer = setTimeout(updateAll, 60);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateAll);
} else {
  updateAll();
}

const observer = new MutationObserver(mutations => {
  scheduleUpdate();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true 
});
