import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Page, Browser, expect } from '@playwright/test';
import HomePage from '../../../PageObjects/HomePage';
import LoginPage from 'C:\\Users\\Raju\\Documents\\PlaywrightTypescriptDemoProject\\PageObjects\\LoginPage';

let browser: Browser
let page: Page
let loginpage: LoginPage
let context: any
let homepage: HomePage
let productname = 'Samsung galaxy s6';
    
Before(async function () {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    loginpage = new LoginPage(page);
    homepage = new HomePage(page);
    await loginpage.Goto();
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

When('User adds product to the cart', async function () {
    await homepage.Addtocart(productname);
    console.log("Product added to the cart") 
});

Then('Verify product is added to the cart successfully',{ timeout: 10 * 1000 }, async function () {
    await homepage.CartView(productname); 
    console.log("Verified product is added to the cart")
});
   
After(async function () {
    await context.close();
    await browser.close();
})