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
        
        await page.getByTestId('new-todo-input').first().waitFor();
        await page.getByTestId('new-todo-input').first().fill('Hello world');

        await page.getByTestId('new-todo-save').first().waitFor();
        await page.getByTestId('new-todo-save').first().click();

        const todoItem = await page.locator('.todo-list').first().getByTestId('todo-list-items').first();
        const todoText = await todoItem.locator('p').first();
        await expect(todoText).toHaveText('Hello world');
    })
})