import { test, expect } from '@playwright/test';

test.describe("Todo app", () => {
    test.beforeEach(async ({ page, request }) => {
        await request.post("http://localhost:1337/reset");
        await page.goto("http://localhost:8000")
    })

    test("Hello world todo can be added to the page", async ({ page }) => {
        await page.getByTestId('taskname').first().fill('Hello world');
        await page.getByTestId('addtask').click();

        await expect(page.getByTestId('tasks')).toHaveText('Hello world | ❌');
    })
})