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

// TC-06 · СТРАНИЦА ТОВАРА
test.use({ baseURL: 'https://vladivostok.e-sweets.ru' });

test('ES-PRODUCT-01: проверка карточки товара', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  const firstCard = page.locator(product.card).first();

  await expect(firstCard).toBeVisible();
  await expect(firstCard.locator(product.title)).toBeVisible();
  await expect(firstCard.locator(product.price)).toBeVisible();
  await expect(firstCard.locator(product.image)).toBeVisible();
  await expect(firstCard.locator(product.stock)).toBeVisible();

  const buyBtn = firstCard.locator(product.buyBtn);
  await expect(buyBtn).toBeVisible();
  await expect(buyBtn).toHaveAttribute('href', /\/product\//);
});

// TC-07 · НИЖНИЙ ФИКСИРОВАННЫЙ ТУЛБАР (мобильный)
