import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await test.step('Navigating to the URL', async() => { 
  await page.goto('https://github.com/');
  await page.getByRole('link', { name: 'Sign in' }).click();

  });

    await test.step('Enter Username & Password ', async() => { 
      

  });

    await test.step('Click on sign in ', async() => { 

  });
  
 
  await page.getByRole('textbox', { name: 'Username or email address' }).click();
  await page.getByRole('textbox', { name: 'Username or email address' }).fill('viskrishnan');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Goal@2025');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await page.getByText('Incorrect username or').click();
  await expect(page.getByRole('alert')).toContainText('Incorrect username or password.');
});