import { test, expect } from '@playwright/test';
import 'dotenv/config';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:1337';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8000';

test.describe("Todo app", () => {
    test.beforeEach(async ({ page, request }) => {
        await request.post(`${BACKEND_URL}/reset`);
        await page.goto(`${FRONTEND_URL}`);
    })

    test("Hello world todo can be added to the page", async ({ page }) => {
        await page.waitForLoadState('networkidle'); 
        
        await page.getByTestId('taskname').first().waitFor();
        await page.getByTestId('taskname').first().fill('Hello world');

        await page.getByTestId('addtask').first().waitFor();
        await page.getByTestId('addtask').first().click();

        await expect(page.getByTestId('tasks')).toHaveText('Hello world | ❌');
    })
})