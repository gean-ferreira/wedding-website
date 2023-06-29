import { test, expect } from '@playwright/test';

test('Home page has expected h1, countdown timer, title and description metatags', async ({ page }) => {
	await page.goto('/home');

	const heading = page.locator('h1');
	await expect(heading).toHaveText('Home Page!');

	const countdown = page.locator('.counter__content');
	await expect(countdown).toBeVisible();

	// SEO
	const title = 'Gean & Jullyana';
	await expect(page).toHaveTitle(title);

	const metaDescription = page.locator('meta[name="description"]');
	const description = 'Site do casal Gean e Jullyana.';
  	await expect(metaDescription).toHaveAttribute('content', description)
});
