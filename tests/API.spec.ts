import { test, expect, request } from '@playwright/test';
import  APiUtils  from '../src/test/Utils/APIUtils';
const loginPayLoad = { userEmail: "rajputlove75@gmail.com", userPassword: "Rajput@65328" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a"}]};

let response: any;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
})

test.only('@API Place the order', async ({ page }) => {
    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    //await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});
