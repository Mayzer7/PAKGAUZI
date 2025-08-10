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