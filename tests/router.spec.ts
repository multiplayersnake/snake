import { test, expect, Page } from '@playwright/test';

async function logIn(page: Page) {
  await page.goto('http://localhost:8080/');
  await page.locator('[name=login]').fill('test_01');
  await page.locator('[name=password]').fill('01qweasd');
  await page.locator('text=Войти').click();
}

test('Login test', async ({ page }) => {
  await logIn(page);

  const q = page.locator('h1');
  await expect(q).toHaveText('Боевые змеи');
});

test('Main menu router', async ({ page }) => {
  await logIn(page);

  await page.locator('text=В бой!').click();
  await expect(page).toHaveURL(/game-type/);
  await page.goBack();

  await page.locator('text=Профиль').click();
  await expect(page).toHaveURL(/profile/);
  await page.goBack();

  await page.locator('text=Форум').click();
  await expect(page).toHaveURL(/forum/);
  await page.goBack();

  await page.locator('text=Выйти').click();
  await expect(page).toHaveURL(/login/);
  await page.goBack();
});

test('Game page router', async ({ page }) => {
  await logIn(page);

  // Переход на страницу выбора типа игры
  await page.locator('text=В бой!').click();
  await expect(page).toHaveURL(/game-type/);

  // Возврат на главную
  await page.locator('text=В меню').click();
  await expect(page.locator('h1')).toHaveText('Боевые змеи');

  // Переход на страницу тренировочной игры
  await page.locator('text=В бой').click();
  await page.locator('text=Начать').click();
  await expect(page).toHaveURL(/game/);
});

test('Profile router', async ({ page }) => {
  await logIn(page);

  // Переход на страницу профиля
  await page.locator('text=Профиль').click();
  await expect(page).toHaveURL(/profile/);

  // Возврат на главную
  await page.locator('text=В меню').click();
  await expect(page.locator('h1')).toHaveText('Боевые змеи');
});

test('Forum page router', async ({ page }) => {
  await logIn(page);

  // Переход в форум
  await page.locator('text=Форум').click();
  await expect(page).toHaveURL(/forum/);

  // Возврат на главную
  await page.locator('text=В меню').click();
  await expect(page.locator('h1')).toHaveText('Боевые змеи');

  // Переход на страницу сообщений
  await page.locator('text=Форум').click();
  await page.locator('_react=Topic').first().click();
  await expect(page).toHaveURL(/message/);

  // Возврат в форум
  await page.locator('text=К темам').click();
  await expect(page).toHaveURL(/forum/);
});
