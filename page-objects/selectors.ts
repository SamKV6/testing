// ================================================================
// TC-01 · БАННЕР
// ================================================================
export const banner = {
  root: '#pe-relocation-banner',
  link: '#pe-relocation-banner a',
  text: /МЫ ПЕРЕЕХАЛИ И УЖЕ ОТКРЫТЫ/i,
};

// ================================================================
// TC-02 · ШАПКА САЙТА
// ================================================================
export const header = {
  topMenuLink: (name: string) => `.top-menu__link:has-text("${name}")`,
  phone: '.callback-info__main-num-text',
  consultBtn: 'a[href="https://taplink.cc/planetexotic"]',
  social: (name: 'VK' | 'YouTube' | 'Telegram') => {
    const map: Record<string, string> = {
      VK: '.soc-btn_vk',
      YouTube: '.soc-btn_ytb',
      Telegram: '.soc-btn_tlg'
    };
    return map[name];
  },
};

// ================================================================
// TC-03 · ПОИСК
// ================================================================
export const search = {
  input: '.site-search__input',
  suggestions: '.autocomplete-suggestions',
  suggestionItem: '.autocomplete-suggestion',
  emptyState: /ничего не найдено|нет результатов/i,
};

// ================================================================
// TC-04 · КОРЗИНА И ИЗБРАННОЕ
// ================================================================
export const cart = {
  counter: '.js-minicart-count',
  icon: '.site-actions__btn_cart a',
  addBtn: '.btn:has-text("В корзину")',
};

export const favorites = {
  counter: '.js-wishlist-count',
  heartBtn: '.btn-fav',
  heartActiveClass: /active|selected|in-fav/,
};

// ================================================================
// TC-05 · СОРТИРОВКА
// ================================================================
export const sorting = {
  select: 'select[name="sort"]',
  priceItem: '.price_main',
  options: {
    priceAsc: /по цене.*возраст/i,
    priceDesc: /по цене.*убыв/i,
    name: /по названию/i,
  },
};

// ================================================================
// TC-06 · КАРТОЧКА ТОВАРА
// ================================================================
export const product = {
  card: '.js-product-list-item',
  title: '.item-c__title',
  price: '.price_main',
  image: 'img.js-item__image',
  moreBtn: 'a:has-text("Подробнее")',
  frozenMarker: '.item-c__badges',
  pageHeading: 'h1.section-title',
};

// ================================================================
// TC-07 · ВИДЖЕТ ЧАТА
// ================================================================
export const chat = {
  fab: '.js-fab__btn',
  telegramLink: 'a[href*="t.me"]',
  maxLink: 'a[href*="max.ru"]',
  callbackBtn: '#call-back-button',
  submitBtn: 'button:has-text("Отправить")',
  consentCheckbox: 'input[type="checkbox"]',
};

