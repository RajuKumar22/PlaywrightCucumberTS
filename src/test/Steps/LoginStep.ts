import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Page, Browser } from '@playwright/test';
import LoginPage from 'C:\\Users\\Raju\\Documents\\PlaywrightTypescriptDemoProject\\src\\test\\PageObjects\\LoginPage';

let browser: Browser
let page: Page
let loginpage: LoginPage
let context: any

Before(async function () {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    // loginpage = new LoginPage(page);
    // await loginpage.Goto()
    console.log("Launch")
})

When('Launch the website URL', { timeout: 10 * 1000 }, async function () {
    console.log("When")
    await page.goto('https://www.demoblaze.com/')
    await page.locator('#login2').waitFor();
    await page.locator('#login2').click();
    await page.locator('#loginusername').waitFor();
});

Given('User enters username and password {string} and {string}', async function (username: string, password: string) {
    console.log("Given")
});

When('User clicks on login btn', async function () {
    console.log("When2")
});

Then('Verify user is logged in successfully', async function () {
    console.log("Then")
});

After(async function () {
    await context.close();
    await browser.close();
})