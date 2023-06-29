import { expect, test } from '@playwright/test';

test('Navbar links change the URL', async ({ page }) => {
	await page.goto('/home');

	const menuItems = [
		{ href: '/nossa-historia', text: 'Nossa história' },
		{ href: '/informacoes-casamento', text: 'Informações do Casamento' },
		{ href: '/rsvp', text: 'RSVP' },
		{ href: '/lista-presentes', text: 'Lista de presentes' },
		{ href: '/fotos', text: 'Fotos' },
		{ href: '/faq', text: 'FAQ' },
		{ href: '/contato', text: 'Contato' }
	];

	for (const item of menuItems) {
		await page.click(`text=${item.text}`);
		await page.getByRole('link', { name: item.text }).click();
		expect(page.url()).toContain(item.href);
	}
});

test('Active link has correct style', async ({ page }) => {
	await page.goto('/nossa-historia');

	const activeLink = page.locator(`.nav__link.active`);
	const color = await activeLink.evaluate((node) => getComputedStyle(node).color);

	expect(color).toBe('rgb(255, 0, 0)'); // Expect color
});

test('Logo is visible and links to home page', async ({ page }) => {
	await page.goto('/');

	const logo = page.locator('.nav__logo');
	await expect(logo).toBeVisible();

	await logo.click();
	expect(page.url()).toContain('/home');
});
