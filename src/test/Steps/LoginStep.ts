import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Page, Browser, expect } from '@playwright/test';
import LoginPage from 'C:\\Users\\Raju\\Documents\\PlaywrightTypescriptDemoProject\\PageObjects\\LoginPage';

let browser: Browser
let page: Page
let loginpage: LoginPage
let context: any

Before(async function () {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    loginpage = new LoginPage(page);
    console.log("Before method")
})

When('Launch the website URL', { timeout: 10 * 1000 }, async function () {
    await loginpage.Goto()
    console.log("Launch the website")
});

Given('User enters username and password {string} and {string}', { timeout: 10 * 1000 }, async function (username: string, password: string) {
    console.log("Given")
    await loginpage.ValidLogin(username,password)
    console.log("Logged in successfully")
});

When('User clicks on login btn', async function () {
    console.log("When user clicks on login in")
    await loginpage.ClickOnLoginBtn();
});

Then('Verify user is logged in successfully', { timeout: 10 * 1000 }, async function () {
    console.log("Then")
    await expect(page.getByText('Welcome Raju Kumar')).toBeVisible();
});

Then('Verify user is not logged in successfully',{ timeout: 10 * 1000 }, async function () {
    console.log("Then")
    await expect(page.getByText('Welcome Raju Kumar')).toHaveCount(0);
});

Then('Verify user is able or not logged in successfully {string}',{ timeout: 10 * 1000 }, async function (username: string) {
    console.log("Then")
    if(username==='Raju Kumar')
    {
    await expect(page.getByText('Welcome Raju Kumar')).toHaveCount(1);
    }
    else{
        await expect(page.getByText('Welcome Raju Kumar')).toHaveCount(0);
    }
});

After(async function () {
    await context.close();
    await browser.close();
})