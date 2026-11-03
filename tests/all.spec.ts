import { test, expect } from '@playwright/test';
import { cart, cartLink, header } from '../page-objects/selectors';

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



// ================================================================
// TC-02 · ШАПКА: пункты меню и контакты
// ----------------------------------------------------------------
// Проверяет:
//   - в верхнем меню видны 6 пунктов; «Главная» есть в DOM, но на десктопе скрыта
//   - логотип, регион, вход/регистрация видны
//   - телефон в формате tel:+7..., e-mail — mailto:
// ================================================================
test.describe('TC-02 Шапка сайта', () => {
    const menuItems = [
        'О компании',
        'Доставка и оплата',
        'Контакты',
        'Прайс-лист',
        'Оптовикам',
        'Гарантии',
    ];

    test('верхнее меню содержит все пункты', async ({ page }) => {
        await test.step('Открыть главную страницу', async () => {
            await page.goto('/');
        });

        await test.step('Проверить, что верхнее меню есть на странице', async () => {
            await expect(page.locator(header.topMenu), 'верхнее меню должно быть в DOM').toHaveCount(1);
        });

        for (const name of menuItems) {
            await test.step(`Проверить пункт меню «${name}»`, async () => {
                await expect(
                    page.locator(header.topMenuLink(name)).first(),
                    `пункт меню «${name}» должен быть виден`,
                ).toBeVisible();
            });
        }

        await test.step('Проверить, что «Главная» ведёт на /', async () => {
            await expect(
                page.locator(header.topMenuLink('Главная')).first(),
                'пункт «Главная» должен вести на /',
            ).toHaveAttribute('href', '/');
        });
    });

    test('логотип, регион, вход и регистрация отображаются', async ({ page }) => {
        await test.step('Открыть главную страницу', async () => {
            await page.goto('/');
        });

        await test.step('Проверить логотип', async () => {
            await expect(page.locator(header.logo).first(), 'логотип должен быть виден').toBeVisible();
        });

        await test.step('Проверить ссылку выбора региона', async () => {
            await expect(page.locator(header.regionLink).first(), 'ссылка выбора региона должна быть видна').toBeVisible();
        });

        await test.step('Проверить ссылку «Вход»', async () => {
            await expect(page.locator(header.loginLink).first(), 'ссылка «Войти» должна быть видна').toBeVisible();
        });

        await test.step('Проверить ссылку «Регистрация»', async () => {
            await expect(page.locator(header.registerLink).first(), 'ссылка «Регистрация» должна быть видна').toBeVisible();
        });
    });

    test('в шапке есть телефон (tel:) и e-mail (mailto:)', async ({ page }) => {
        await test.step('Открыть главную страницу', async () => {
            await page.goto('/');
        });

        await test.step('Проверить телефон', async () => {
            const phone = page.locator(header.phone).first();
            await expect(phone, 'телефон должен быть виден').toBeVisible();
            await expect(phone, 'телефон должен быть в формате tel:+7...').toHaveAttribute('href', /^tel:\+?\d+$/);
        });

        await test.step('Проверить e-mail', async () => {
            const email = page.locator(header.email).first();
            await expect(email, 'e-mail должен быть виден').toBeVisible();
            await expect(email, 'e-mail должен быть ссылкой mailto:').toHaveAttribute('href', /^mailto:.+@.+/);
        });
    });
});


// TC-03 · ПОИСК (SearchPro)


// TC-04 · КАРТОЧКА ТОВАРА (в списке)


// TC-05 · ИЗБРАННОЕ

// TC-06 · СТРАНИЦА ТОВАРА

// TC-07 · НИЖНИЙ ФИКСИРОВАННЫЙ ТУЛБАР (мобильный)
