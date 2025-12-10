import { test, expect, request } from '@playwright/test';
import APiUtils from '../src/test/Utils/APIUtils';
const loginPayLoad = { userEmail: "rajputlove75@gmail.com", userPassword: "Rajput@65328" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response: any;

test.beforeAll(async ({ browser }) => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
})

test('Demonstrate the use of storage state', async ({ page, browser }) => {

    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto("https://rahulshettyacademy.com/client");
    await page1.locator('input#userEmail').fill('rajputlove75@gmail.com');
    await page1.locator('input#userPassword').fill('Rajput@65328');
    await page1.locator('input#login').click();
    await page1.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' })

});

//create order is success
test.only('Place the order with Route method', async ({ page, browser }) => {
    page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill(
                {
                    response,
                    body,

                });
    });

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

    console.log(await page.locator(".mt-4").textContent());



});