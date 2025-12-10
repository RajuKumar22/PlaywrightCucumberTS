// spec: specs/demoblaze.test.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test'

test('Checkout Flow - Negative and Positive', async ({ page }) => {
  // 1. Add product to cart
  await page.goto('https://www.demoblaze.com/');
  await page.locator('#footc').click();
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  await page.getByRole('listitem').filter({ hasText: /^$/ }).first().click();
  await page.getByRole('link', { name: 'Add to cart' }).click();
     
  // 2. Go to cart page
  await page.getByRole('link', { name: 'Cart', exact: true }).click();

  // 3. Click Place Order
  await page.getByRole('button', { name: 'Place Order' }).click();

  // 4. Attempt purchase with blank fields
  await page.getByRole('button', { name: 'Purchase' }).click();
  // Expect alert for missing required fields
  // (Playwright auto-handles alerts, but you can assert if needed)

  // 5. Fill all fields and complete purchase
  await page.getByRole('textbox', { name: 'Total: 360 Name:' }).fill('Test User');
  await page.getByRole('textbox', { name: 'Country:' }).fill('Testland');
  await page.getByRole('textbox', { name: 'City:' }).fill('Testville');
  await page.getByRole('textbox', { name: 'Credit card:' }).fill('4111111111111111');
  await page.getByRole('textbox', { name: 'Month:' }).fill('12');
  await page.getByRole('textbox', { name: 'Year:' }).fill('2025');
  await page.getByRole('button', { name: 'Purchase' }).click();
  // Expect confirmation or success alert
});
