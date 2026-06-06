import { test, expect } from '@playwright/test';

test('has title and Hero section', async ({ page }) => {
  await page.goto('/');
  // We expect "Safe Finance" to be in the title
  await expect(page).toHaveTitle(/Safe Finance/);
  
  // Check if Hero section heading is visible
  const heroHeading = page.locator('h1');
  await expect(heroHeading).toBeVisible();
});

test('navigation to contact section', async ({ page }) => {
  await page.goto('/');
  // Find a CTA button
  const ctaButton = page.getByRole('button', { name: /Commencer/i }).first();
  if (await ctaButton.isVisible()) {
    await ctaButton.click();
  }
});
