// ================================================================
// selectors.ts · vladivostok.e-sweets.ru
// ----------------------------------------------------------------
// Платформа: Webasyst / Shop-Script, тема supreme
// Плагины:   Regions, SearchPro, Ordercall, Arrived
//
// ⚠️ Селекторы подтверждены HTML-фрагментами сайта.
// Всё неподтверждённое помечено TODO.
// ================================================================

// Ссылка на корзину в шапке (короткая форма — по запросу)
export const cartLink = '#cart';

// ================================================================
// TC-01 · БАННЕР
// ----------------------------------------------------------------
// ⚠️ На главной e-sweets.ru баннера НЕТ (в home.html его нет).
// Есть только ссылка «Новый B2B-каталог...» (a.bb-new-site-header-link),
// которая ведёт на big-brands.ru и баннером не является.
// ================================================================
export const banner = {
  root: '',                       // N/A на e-sweets
  text: /./i,
};

// ================================================================
// TC-02 · ШАПКА САЙТА
// ----------------------------------------------------------------
// Источник: home.html → #topnav → ul.menu.site_menu, header#header
// Пункты меню: Главная, О компании, Доставка и оплата, Контакты,
//              Прайс-лист, Оптовикам, Гарантии
// ================================================================
export const header = {
  topMenu: 'ul.site_menu',
  topMenuLink: (name: string) => `ul.site_menu a:has-text("${name}")`,

  // Плагин Regions
  regionLink: '.shop-regions__link',

  // Авторизация
  loginLink: '.h_login a',
  registerLink: '.h_reg a',

  // Логотип
  logo: '.h_logo img',

  // Контакты
  // <a href="tel:+79022733770">+79022733770</a>
  // <a href="tel:+79022661383" class="phone2">+79022661383</a>
  phone: 'a[href^="tel:"]',
  email: '.h_email a',

  // Соцсети / мессенджеры в шапке
  whatsapp: 'a.w-up',                  // https://wa.me/+79022661383
  telegram: 'a.tgrm',                  // https://t.me/EvroBrendSweets
  telegramGroup: 'a.button-tellegram', // «Наша группа в телеграмм», «Мы на Озон»

  // VK в футере
  vk: '.f_soc a.fs-vk',
};

// ================================================================
// TC-03 · ПОИСК (плагин SearchPro)
// ----------------------------------------------------------------
// ⚠️ Поле поиска есть в ДВУХ местах:
//   1) .h_search.visible-sm-block.visible-xs-block — только мобильный
//   2) .col-md-2.h_search.hidden-xs.hidden-sm — только десктоп
// На десктопе используйте :visible или .hidden-xs.hidden-sm
// ================================================================
export const search = {
  input: '.js-searchpro__field-input',
  button: '.js-searchpro__field-button',
  dropdown: '.searchpro__dropdown',
  suggestionItem: '.searchpro__dropdown-entity',

  // Десктопный контейнер поиска (в шапке, visible на md+)
  desktopContainer: '.col-md-2.h_search.hidden-xs.hidden-sm',
  // Мобильный контейнер поиска
  mobileContainer: '.h_search.visible-sm-block.visible-xs-block',

  // Страница пустого результата (/search/zxqwv1234/)
  emptyWrapper: '.searchpro__page-empty',
  emptyHeader: '.searchpro__page-empty_header',  // «По вашему запросу ничего не найдено»
  emptyHint: '.searchpro__page-empty_hint',
  emptyText: /ничего не найдено/i,
};

// ================================================================
// TC-04 · КОРЗИНА
// ----------------------------------------------------------------
// <a href="/cart/" id="cart" class=" empty" rel="nofollow">
//   <span class="cart_count">0</span>
//   <span class="cart_total">0 руб.</span>
// </a>
// ================================================================
export const cart = {
  icon: '#cart',
  summary: '.cart_summary',
  counter: '.cart_count',
  total: '.cart_total',

  // Класс "empty" появляется у #cart, когда корзина пуста
  emptyClass: 'empty',
  emptyClassRe: /empty/,

  // Нижний фиксированный тулбар (мобильный)
  bottomIcon: '#ft_cart a',
  bottomCounter: '#ft_cart .cart_count.count',
  bottomTotal: '#ft_cart .cart_total',
};

// ================================================================
// TC-05 · ИЗБРАННОЕ
// ----------------------------------------------------------------
// <a data-product="1602" class="to_favorites " title="В избранное"><i></i></a>
// ================================================================
export const favorites = {
  heartBtn: '.to_favorites',
  heartTitle: 'В избранное',

  // ⚠️ TODO: активный класс после клика не подтверждён (в присланном
  // HTML кнопка без клика). Возможные варианты в этой теме:
  // 'active', 'in_favorites', 'selected'.
  heartActiveClass: /active|in[_\-]?fav|selected/i,

  // Счётчики в фиксированном тулбаре
  fixedIcon: '#ft_favorites a',
  fixedCount: '#ft_favorites .count',
};

// ================================================================
// TC-06 · СОРТИРОВКА
// ----------------------------------------------------------------
// ⚠️ HTML сортировки взят из search-empty.html (блок каталога).
// На /category/* разметка аналогичная (стандартная для Webasyst):
//   .catalog_toolbar .sort_wrap
//     button#sort_dropdown
//     ul.dropdown-menu > li > a[href="?sort=..."]
// TODO: проверить на реальной /category/* странице.
// ================================================================
export const sorting = {
  toolbar: '.catalog_toolbar',
  wrap: '.sort_wrap',
  button: '#sort_dropdown',
  dropdown: '.sort_wrap .dropdown-menu',

  // Пункты меню
  optionByName:     '.sort_wrap .dropdown-menu a:has-text("Название")',
  optionByPrice:    '.sort_wrap .dropdown-menu a:has-text("Цена")',
  optionBySales:    '.sort_wrap .dropdown-menu a:has-text("Хиты продаж")',
  optionByRating:   '.sort_wrap .dropdown-menu a:has-text("Оценка покупателей")',
  optionByDate:     '.sort_wrap .dropdown-menu a:has-text("Дата добавления")',
  optionByStock:    '.sort_wrap .dropdown-menu a:has-text("В наличии")',

  // ⚠️ TODO: один пункт «Цена» — восходящая ли это сортировка или
  // toggle при повторном клике — не подтверждено. Проверить.
  priceAsc: /price.*asc|Цена/i,
  priceDesc: /price.*desc/i,

  // Товары на странице результатов
  priceItem: '.price.nowrap',
};

// ================================================================
// TC-07 · КАРТОЧКА ТОВАРА (в списке / на главной)
// ----------------------------------------------------------------
// <div class="product">
//   <div class="in">
//     ... image_wrap, product_name, offers ...
//   </div>
// </div>
// ================================================================
export const product = {
  card:   '.product:not(.slick-cloned)', // карточка товара (без клонов слайдера)
  title:  '.product_name a',
  price:  '.price',
  image:  '.image_wrap img',
  stock:  '.stock',
  inStock: '.stock.yes',
  buyBtn: 'a.btn_add2cart',
};

// ================================================================
// TC-08 · СТРАНИЦА ТОВАРА (/product/...)
// ----------------------------------------------------------------
// <article class="product_page">
//   <h1 class="product-name"><span itemprop="name">...</span></h1>
//   <form id="cart-form" action="/cart/add/">
//     ...
//   </form>
//   ...
// </article>
// ================================================================
export const productPage = {
  root: 'article.product_page',
  heading: 'h1.product-name',
  headingName: 'h1.product-name [itemprop="name"]',

  image: '.product-core-image img, img.product-image',
  gallery: '.more-images',
  galleryThumb: '.more-images .image',

  artnumber: '.artnumber',
  artnumberLabel: '.articul',

  // Цена на странице
  price: '.add2cart .price.nowrap',
  // Вторая .price.nowrap в блоке цен — «за уп.»
  pricePerPack: '.add2cart .prices .price.nowrap:nth-of-type(2)',

  // Наличие
  stockOut: '.stocks .stock-none',
  stockOutText: /нет в наличии/i,

  // Форма
  form: 'form#cart-form',
    quantityInput: 'form#cart-form input[name="quantity"]',
    plusBtn: 'form#cart-form .plus',
    minusBtn: 'form#cart-form .minus',

    // ⚠️ TODO: кнопка «В корзину» в присланном HTML ОТСУТСТВУЕТ
    // (товар «Нет в наличии», показана только «Сообщить о поступлении»).
    // Предположительный селектор для товара «в наличии» (по аналогии
    // с карточкой):
    addBtn: 'form#cart-form .btn_add2cart',
    addBtnFallback: 'form#cart-form button.btn-primary[type="submit"]',

    // Уведомить о поступлении
    arrivedBtn: 'form#cart-form .plugin_arrived-button',

    // Кнопки «В избранное» / «К сравнению»
    favoritesBtn: '.p_buttons .to_favorites',
    compareBtn: '.p_buttons .to_compare',

    // Табы
    tabs: '.pp_tabpanel .nav-tabs a',
    tabHome: 'a[href="#pp_home"]',
    tabSpecs: 'a[href="#pp_specs"]',
    tabReviews: 'a[href="#pp_reviews"]',
    tabPaneDescription: '#pp_home',
    tabPaneSpecs: '#pp_specs',
    tabPaneReviews: '#pp_reviews',

    // Характеристики
    featuresTable: 'table#product-features',
    featuresRow: 'table#product-features tr',
    featuresName: 'table#product-features tr td.name',
    featuresValue: 'table#product-features tr td.value',

    // Отзывы
    reviewForm: '#product-review-form',
    reviewTextarea: '#review-text',
    reviewSubmit: '#product-review-form input[type="submit"]',
};

// ================================================================
// TC-09 · НИЖНИЙ ФИКСИРОВАННЫЙ ТУЛБАР (моб.)
// ----------------------------------------------------------------
// <div id="fixed_toolbar">
//   <li id="ft_favorites">...<span class="count">0</span>
//   <li id="ft_compare">
//   <li id="ft_viewed">
//   <li id="ft_cart" class="cart cart-bottom">
// ================================================================
export const fixedToolbar = {
  root: '#fixed_toolbar',
  favorites: '#ft_favorites a',
  favoritesCount: '#ft_favorites .count',
  compare: '#ft_compare a',
  compareCount: '#ft_compare .count',
  viewed: '#ft_viewed a',
  viewedCount: '#ft_viewed .count',
  cart: '#ft_cart a',
  cartCount: '#ft_cart .cart_count.count',
  cartTotal: '#ft_cart .cart_total',
};

// ================================================================
// TC-10 · ПЛАВАЮЩАЯ КНОПКА «ПЕРЕЗВОНИТЬ» (Ordercall)
// ----------------------------------------------------------------
// <div class="ordercall-smart-button ordercall-smart-button_position_left-bottom">
//   <div class="ordercall-smart-button__button">...</div>
// </div>
// Виджета чата (Jivo / Callibri) на e-sweets.ru НЕТ —
// есть только «Есть вопросы? Нажмите и мы перезвоним вам!»
// ================================================================
export const callback = {
  root: '.ordercall-smart-button',
  fab: '.ordercall-smart-button:not(.ordercall-smart-button_mobile) .ordercall-smart-button__button',
  fabMobile: '.ordercall-smart-button_mobile .ordercall-smart-button__button',
  tooltip: '.ordercall-smart-button__tooltip',
};

// Алиас для совместимости с прошлым шаблоном TC-07 · ЧАТ
export const chat = callback;

// ================================================================
// TC-11 · ХЛЕБНЫЕ КРОШКИ (плагин Breadcrumbs)
// ================================================================
export const breadcrumbs = {
  root: '.breadcrumbs-plugin',
  item: '.breadcrumbs-plugin__item',
  link: '.breadcrumbs-plugin__item_href',
  current: '.breadcrumbs-plugin__item_wrapper[data-breadcrumbs_index="current"]',
};

// ================================================================
// TC-12 · ПАГИНАЦИЯ / СПИСОК ТОВАРОВ НА СТРАНИЦЕ
// ================================================================
export const listing = {
  productList: '.product-list',
  grid: '.product-list.products_view_grid',
  slider: '.product-list.products_view_slider',
  item: '.product-list .product',
  sectionTitle: '.content_slider .title',
};
