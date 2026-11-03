import { test, expect } from '@playwright/test';
import { cart, cartLink } from '../page-objects/selectors';

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

// TC-07 · НИЖНИЙ ФИКСИРОВАННЫЙ ТУЛБАР (мобильный)
