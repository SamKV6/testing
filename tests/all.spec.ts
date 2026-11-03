import { test, expect } from '@playwright/test';
import { cart, cartLink, search, product, fixedToolbar } from '../page-objects/selectors';

// ================================================================
// TC-01 · КОРЗИНА: иконка, счётчик, пустое состояние (ЭТАЛОН)
// ----------------------------------------------------------------
// Проверяет:
//   - ссылка #cart видна и ведёт на /cart/
//   - счётчик .cart_count отображается и содержит число
//   - на пустой корзине у #cart есть класс "empty"
// ================================================================
test.describe('TC-01 Корзина в шапке', () => {
    test('иконка корзины видна, ведёт на /cart/ и показывает числовой счётчик', async ({ page }) => {
        await page.goto('/');

        const cartIcon = page.locator(cartLink).first();
        await expect(cartIcon, 'ссылка #cart должна быть видна').toBeVisible();
        await expect(cartIcon, 'ссылка #cart должна вести на /cart/').toHaveAttribute('href', '/cart/');

        const counter = page.locator(cart.counter).first();
        await expect(counter, 'счётчик корзины должен отображаться').toBeVisible();
        await expect(counter, 'счётчик должен быть числом').toHaveText(/^\d+$/);
    });

    test('при пустой корзине у ссылки есть класс "empty"', async ({ page }) => {
        await page.goto('/');

        const cartIcon = page.locator(cartLink).first();
        await expect(cartIcon, 'свежая сессия → корзина пуста → класс empty')
        .toHaveClass(cart.emptyClassRe);
    });


});



// TC-02 · ШАПКА: пункты меню и контакты


// TC-03 · ПОИСК (SearchPro)

// ES-SEARCH-01. Предусловия: desktop Chromium, новая сессия,
// сайт доступен. Запрос не соответствует товарам каталога.
// Шаги: открыть главную → ввести запрос → нажать Enter.
// Ожидается: страница поиска с сообщением об отсутствии результатов.
test('ES-SEARCH-01: случайные символы и неполное название', async ({ page }) => {
    let partialName: string;

    await test.step('Открыть главную и выбрать название товара', async () => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });

        const title = page.locator(product.titleLink).first();
        await expect(title).toBeVisible();

        const productName = (await title.innerText())
            .replace(/\s+/g, ' ')
            .trim();

        const word = productName.match(/[a-zа-яё]{5,}/iu)?.[0];

        expect(
            word,
            'В названии должно быть слово минимум из 5 букв'
        ).toBeTruthy();

        partialName = word!.slice(0, -2);
    });

    await test.step('Случайные символы не дают результатов', async () => {
        const query = 'zxqwv1234codex987654321';
        const input = page
            .locator(search.desktopContainer)
            .locator(search.input);

        await expect(input).toBeVisible();
        await input.fill(query);
        await input.press('Enter');

        await expect(page).toHaveURL(
            new RegExp('/search/' + query + '/?(?:[?#].*)?$')
        );

        await expect(page.locator(search.emptyWrapper)).toBeVisible();

        await expect(page.locator(search.emptyHeader))
            .toContainText(search.emptyText);
    });

    await test.step('Неполное название находит подходящие товары', async () => {
        const input = page
            .locator(search.desktopContainer)
            .locator(search.input);

        await expect(input).toBeVisible();
        await input.fill(partialName);
        await input.press('Enter');

        await expect(page).toHaveURL(url =>
            decodeURIComponent(url.pathname)
                .replace(/\/$/, '')
                .toLowerCase() === `/search/${partialName}`.toLowerCase()
        );

        await expect(page.locator(search.emptyWrapper)).toBeHidden();

        const foundProducts = page.locator(product.titleLink);

        await expect(
            foundProducts.first(),
            'По части названия должны находиться товары'
        ).toBeVisible();

        await expect.poll(async () => {
            const names = await foundProducts.allTextContents();

            return names.some(name =>
                name.toLowerCase().includes(partialName.toLowerCase())
            );
        }, {
            message: 'Хотя бы один товар должен содержать введённую часть названия',
        }).toBe(true);
    });
});


// TC-04 · КАРТОЧКА ТОВАРА (в списке)


// TC-05 · ИЗБРАННОЕ
// Проверяет:
//   - кнопка «В избранное» (.to_favorites) видна на карточке товара
//   - у кнопки корректный title «В избранное»
//   - кнопка кликабельна
//   - счётчик в нижнем тулбаре (#ft_favorites .count) меняется на 1
// ================================================================
test.describe('TC-05 Избранное', () => {

    test('кнопка «В избранное» видна, имеет корректный title и кликабельна', async ({ page }) => {
        await page.goto('/');

        const heart = page.locator(product.card).first().locator(favorites.heartBtn).first();

        await expect(heart, 'кнопка «В избранное» должна быть видна').toBeVisible();
        await expect(heart, 'title кнопки должен быть «В избранное»')
            .toHaveAttribute('title', favorites.heartTitle);
        await expect(heart, 'кнопка «В избранное» должна быть кликабельна').toBeEnabled();
    });

    test('счётчик избранного в нижнем тулбаре увеличивается и уменьшается на 1', async ({ page }) => {
        await page.goto('/');

        const heart = page.locator(product.card).first().locator(favorites.heartBtn).first();
        const counter = page.locator(favorites.fixedCount).first();

        await expect(heart).toBeVisible();

        // Считываем текущее значение счётчика (если элемента нет — считаем 0)
        const readCount = async (): Promise<number> => {
            if (!(await counter.count())) return 0;
            const txt = (await counter.textContent())?.trim() ?? '';
            return Number(txt.replace(/\D/g, '') || '0');
        };

        const before = await readCount();

        await heart.click();
        await expect(heart).toHaveClass(favorites.heartActiveClass);
        await expect(counter, 'счётчик избранного должен увеличиться на 1')
            .toHaveText(String(before + 1));

        await heart.click();
        await expect(heart).not.toHaveClass(favorites.heartActiveClass);
        await expect(counter, 'счётчик избранного должен вернуться к исходному значению')
            .toHaveText(String(before));
    });

});

// TC-06 · СТРАНИЦА ТОВАРА
// TC-06 · СТРАНИЦА ТОВАРА
test('ES-PRODUCT-01: проверка карточки товара', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  // первая карточка, у которой есть кнопка «Купить» (то есть товар в наличии)
  const firstCard = page.locator(product.card)
    .filter({ has: page.locator(product.buyBtn) })
    .first();

  await expect(firstCard, 'карточка товара должна быть видна').toBeVisible();
  await expect(firstCard.locator(product.title), 'название').toBeVisible();
  await expect(firstCard.locator(product.price), 'цена').toHaveText(/руб/);
  await expect(firstCard.locator(product.image), 'картинка').toBeVisible();
  await expect(firstCard.locator(product.inStock), 'статус наличия').toHaveText('В наличии');

  const buyBtn = firstCard.locator(product.buyBtn);
  await expect(buyBtn, 'кнопка «Купить»').toBeVisible();
  await expect(buyBtn, 'кнопка ведёт на страницу товара').toHaveAttribute('href', /\/product\//);
});

// ================================================================
// TC-07 · НИЖНИЙ ФИКСИРОВАННЫЙ ТУЛБАР (мобильный)
// ----------------------------------------------------------------
// Проверяет:
//   - на мобильном viewport виден #fixed_toolbar
//   - в нём видны пункты: избранное, сравнение, просмотренные, корзина
// ================================================================
test.describe('TC-07 Фиксированный тулбар', () => {
    // Мобильный viewport (iPhone SE)
    test.use({ viewport: { width: 375, height: 667 } });

    test('тулбар виден на мобильном viewport', async ({ page }) => {
        await page.goto('/');

        const toolbar = page.locator(fixedToolbar.root);
        await expect(toolbar, 'тулбар #fixed_toolbar должен быть виден на мобильном').toBeVisible();

        await expect(page.locator(fixedToolbar.favorites), 'пункт «Избранное» должен быть виден').toBeVisible();
        await expect(page.locator(fixedToolbar.compare), 'пункт «Сравнение» должен быть виден').toBeVisible();
        await expect(page.locator(fixedToolbar.viewed), 'пункт «Просмотренные» должен быть виден').toBeVisible();
        await expect(page.locator(fixedToolbar.cart), 'пункт «Корзина» должен быть виден').toBeVisible();
    });
});
