import { test, expect } from '@playwright/test';

test('Login test', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.locator('[name=login]').fill('test_01');
  await page.locator('[name=password]').fill('01qweasd');
  await page.locator('text=Войти').click();

  const q = page.locator('h1');
  await expect(q).toHaveText('Боевые змеи');
});

test('Main menu test', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.locator('[name=login]').fill('test_01');
  await page.locator('[name=password]').fill('01qweasd');
  await page.locator('text=Войти').click();

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
