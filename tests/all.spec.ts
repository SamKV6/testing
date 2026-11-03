import { test, expect } from '@playwright/test';
import { cart, cartLink, fixedToolbar } from '../page-objects/selectors';

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

// TC-06 · СТРАНИЦА ТОВАРА

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
