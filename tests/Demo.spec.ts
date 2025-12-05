import { test, expect } from '@playwright/test';
import LoginPage from '../PageObjects/LoginPage';
import HomePage from '../PageObjects/HomePage';
const dataset = JSON.parse(JSON.stringify(require("../TestData/TestData.json")));
const bulkdataset = JSON.parse(JSON.stringify(require("../TestData/BulkDataSet.json")));

let loginpage:LoginPage;
let homepage: HomePage;

// test.describe.configure({ mode: 'parallel' });
test('@Login to Demo Site with valid credentials', async ({ page }) => {
    loginpage = new LoginPage(page);
    await loginpage.Goto();
    await loginpage.ValidLogin(dataset.username,dataset.password);
    await loginpage.ClickOnLoginBtn();
    await expect(page.getByText('Welcome Raju Kumar')).toBeVisible();
}) 

test('Login to Demo Site with Invalid credentials', {tag:'@Login'},async ({ page }) => {
    loginpage = new LoginPage(page);
    await loginpage.Goto();
    await loginpage.ValidLogin(dataset.invalidusername,dataset.invalidpassword);
    // await page.pause();
    await loginpage.ClickOnLoginBtn()
    page.on('dialog', dialog => dialog.message());
    page.on('dialog', dialog => dialog.accept());
    await expect(page.getByText('Welcome Raju Kumar')).toHaveCount(0);
})

test('Add product to Cart', async ({ page }) => {
    const productname = 'Samsung galaxy s6';
    loginpage = new LoginPage(page);
    homepage = new HomePage(page);
    await loginpage.Goto();
    await loginpage.ValidLogin(dataset.username,dataset.password);
    await loginpage.ClickOnLoginBtn()
    await expect(page.getByText('Welcome Raju Kumar')).toBeVisible();
    await homepage.Addtocart(productname);
    await homepage.CartView(productname);
})

for (const bulkdata of bulkdataset)
{    
test.only(`Login with username = ${bulkdata.username}`, async ({ page }) => {

    loginpage = new LoginPage(page);
    await loginpage.Goto();
    await loginpage.ValidLogin(bulkdata.username,bulkdata.password);
    await loginpage.ClickOnLoginBtn()
    if (bulkdata.username === 'Raju Kumar')
    {
        await expect(page.getByText('Welcome Raju Kumar')).toHaveCount(1);
    }
    else
    {
        await expect(page.getByText('Welcome Raju Kumar')).toHaveCount(0);
    }
})
}
