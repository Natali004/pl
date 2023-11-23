const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const browser = await chromium.launch();
const {
  email,
  password,
  incorrectEmail,
  incorrectPassport,
} = require("../user.js");

test("Valid test", async ({ page }) => {
    await page.goto("https://netology.ru/?modal=sign_in");
    await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
    await page.locator('[placeholder="Email"]').click();
    await page.locator('[placeholder="Email"]').fill(email);
    await page.locator('[placeholder="Пароль"]').click();
    await page.locator('[placeholder="Пароль"]').fill(password);
    await page.locator('[data-testid="login-submit-btn"]').click();
    await expect(page).toHaveURL("https://netology.ru/profile");
  });
  
  test("Failure test", async ({ page }) => {
    await page.goto("https://netology.ru/?modal=sign_in");
    await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
    await page.locator('[placeholder="Email"]').click();
    await page.locator('[placeholder="Email"]').fill("test@mail.ru");
    await page.locator('[placeholder="Пароль"]').click();
    await page.locator('[placeholder="Пароль"]').fill("test");
    await page.locator('[data-testid="login-submit-btn"]').click();
    const error = await page.locator('[data-testid="login-error-hint"]');
    await expect(error).toHaveText("Вы ввели неправильно логин или пароль");
  });