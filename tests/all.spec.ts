import { test, expect } from '@playwright/test';
import { cart, cartLink, search, product } from '../page-objects/selectors';

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
    let productName: string;
    let partialName: string;

    await test.step('Открыть главную и выбрать существующий товар', async () => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });

        const title = page.locator(product.titleLink).first();
        await expect(title).toBeVisible();

        productName = (await title.innerText()).replace(/\s+/g, ' ').trim();

        // Берём часть слова из названия, чтобы запрос был неполным.
        const word = productName.match(/[a-zа-яё]{5,}/iu)?.[0];
        expect(word, 'В названии должно быть слово минимум из 5 букв').toBeTruthy();

        partialName = word!.slice(0, -2);
    });

    await test.step('Проверить отсутствие результатов для случайных символов', async () => {
        const query = 'zxqwv1234codex987654321';
        const input = page.locator(search.desktopContainer).locator(search.input);

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

    await test.step('Проверить поиск по неполному названию', async () => {
        const input = page.locator(search.desktopContainer).locator(search.input);

        await expect(input).toBeVisible();
        await input.fill(partialName);
        await input.press('Enter');

        await expect(page).toHaveURL(url =>
            decodeURIComponent(url.pathname)
                .replace(/\/$/, '')
                .toLowerCase() === `/search/${partialName}`.toLowerCase()
        );

        await expect(page.locator(search.emptyWrapper)).toBeHidden();

        const foundProduct = page.locator(product.titleLink).filter({
            hasText: productName,
        });

        await expect(
            foundProduct.first(),
            'Исходный товар должен находиться по части его названия'
        ).toBeVisible();
    });
});


// TC-04 · КАРТОЧКА ТОВАРА (в списке)


// TC-05 · ИЗБРАННОЕ

// TC-06 · СТРАНИЦА ТОВАРА

// TC-07 · НИЖНИЙ ФИКСИРОВАННЫЙ ТУЛБАР (мобильный)
