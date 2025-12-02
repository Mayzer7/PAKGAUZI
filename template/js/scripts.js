// Доработка сайта

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.afisha-dates.swiper');
  if (!container) return;

  const nextBtn = container.querySelector('.afisha-arrow-right');
  const prevBtn = container.querySelector('.afisha-arrow-left');
  
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
      0: { slidesPerGroup: 3, spaceBetween: 20 },
      601: { slidesPerGroup: 3, spaceBetween: 32 },
      1351: { slidesPerGroup: 3, spaceBetween: 40 },
    },
  });

  nextBtn.addEventListener('click', () => swiper.slideNext());
  prevBtn.addEventListener('click', () => swiper.slidePrev());

  function updateButtonsState() {
    // кнопка вперёд
    if (swiper.isEnd) {
      nextBtn.classList.add('disabled');
      nextBtn.querySelector('svg path')?.setAttribute('fill', '#999999');
      nextBtn.disabled = true;
    } else {
      nextBtn.classList.remove('disabled');
      nextBtn.querySelector('svg path')?.setAttribute('fill', '#0E0D0D');
      nextBtn.disabled = false;
    }

    // кнопка назад
    if (swiper.isBeginning) {
      prevBtn.style.display = 'none';
      // вместо container используем swiper.el
      swiper.el.classList.remove('show-left-gradient');
    } else {
      prevBtn.style.display = 'flex';
      swiper.el.classList.add('show-left-gradient');
    }
  }

  swiper.on('slideChange', updateButtonsState);
  swiper.on('reachEnd', updateButtonsState);
  swiper.on('fromEdge', updateButtonsState);

  updateButtonsState();
});


// Одна и вторая карточка

function isVisible(el) {
  return !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length));
}

function updateContainer(container) {
  const cards = Array.from(container.querySelectorAll('.afisha-page-card'));
  const visibleCards = cards.filter(isVisible);
  const count = visibleCards.length;

  const isSingle = count === 1;
  const isTwo = count === 2;

  container.classList.toggle('single-cards', isSingle);
  container.classList.toggle('two-cards', isTwo);

  cards.forEach(card => {
    card.classList.toggle('single-card', isSingle);
    card.classList.toggle('two-card', isTwo);

    const img = card.querySelector('.afisha-page-card-img');
    if (img) {
      img.classList.toggle('single-card-img', isSingle);
      img.classList.toggle('two-card-img', isTwo);
    }

    const btns = card.querySelector('.afisha-page-card-buttons');
    if (btns) {
      btns.classList.toggle('single-card-buttons', isSingle);
      btns.classList.toggle('two-card-buttons', isTwo);
    }

    // Если одна карточка - меняется изображение с графикой, оно для одной карточки другое
    if (isSingle) {
      const placeholder = card.querySelector('.afisha-page-card-img .img-primary');
      if (placeholder) {
        placeholder.src = "../template/img/afisha-cards/no-active.png";
      }
    }
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



// Скрытие баннера "Выставочный пакгауз закрыт для посещения"

document.addEventListener('DOMContentLoaded', () => {
  const banner = document.querySelector('.info-banner');
  if (!banner) return;

  const closeBtn = banner.querySelector('.info-banner-close-btn');
  if (!closeBtn) return;

  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-hidden', 'false');

  closeBtn.addEventListener('click', () => {
    banner.classList.add('info-banner--hide');
    banner.setAttribute('aria-hidden', 'true');

  });

  banner.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'transform' && banner.classList.contains('info-banner--hide')) {
      banner.style.display = 'none';
    }
  });
});







// Логика перехода по ссылке в карточке: 
// (Если кликаем на кнопку "Купить билет: то переадрисация на страницу покупки билета, 
// если на карточку в другую область то на страницу Мероприятия)

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.afisha-page-card').forEach(card => {
    const eventHref = card.dataset.eventHref;
    card.addEventListener('click', (e) => {
      const buyBtn = e.target.closest('.afisha-page-card-buy-btn');
      if (buyBtn) {
        e.stopPropagation();
        e.preventDefault();
        const buyHref = buyBtn.dataset.buyHref;
        if (buyHref) {
          window.location.href = buyHref;
        }
        return;
      }

      const interactive = e.target.closest('a, button, input, select, textarea, [role="button"]');
      if (interactive && !interactive.classList.contains('afisha-page-card-buy-btn')) {
        return;
      }

      if (eventHref) {
        window.location.href = eventHref;
      }
    });

    card.addEventListener('keydown', (e) => {
      const active = document.activeElement;
      if (active && active.closest && active.closest('.afisha-page-card-buy-btn')) return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const buyFocused = document.activeElement && document.activeElement.closest('.afisha-page-card-buy-btn');
        if (buyFocused) {
          buyFocused.click();
        } else if (card.dataset.eventHref) {
          window.location.href = card.dataset.eventHref;
        }
      }
    });
  });
});
