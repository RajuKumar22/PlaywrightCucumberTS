import { test, expect } from '@playwright/test';
import LoginPage from '../src/test/PageObjects/LoginPage';
import HomePage from '../src/test/PageObjects/HomePage';
const dataset = JSON.parse(JSON.stringify(require("../TestData/TestData.json")));
const bulkdataset = JSON.parse(JSON.stringify(require("../TestData/BulkDataSet.json")));

// test.describe.configure({ mode: 'parallel' });
test('Login to Demo Site with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.Goto();
    await login.ValidLogin(dataset.username,dataset.password);
    await expect(page.getByText('Welcome Raju Kumar')).toBeVisible();
}) 

test('Login to Demo Site with Invalid credentials', async ({ page }) => {

    const login = new LoginPage(page);
    await login.Goto();
    await login.ValidLogin(dataset.invalidusername,dataset.invalidpassword);
    await expect(page.getByText('Welcome Raju Kumar')).toHaveCount(0);
})

test('Add product to Cart', async ({ page }) => {

    const productname = 'Samsung galaxy s6';
    const login = new LoginPage(page);
    const home = new HomePage(page);
    await login.Goto();
    await login.ValidLogin(dataset.username,dataset.password);
    await expect(page.getByText('Welcome Raju Kumar')).toBeVisible();
    await home.Addtocart(productname);
    await home.CartView(productname);
})

for (const bulkdata of bulkdataset)
{    
test.only(`Login with username = ${bulkdata.username}`, async ({ page }) => {

    const login = new LoginPage(page);
    await login.Goto();
    await login.ValidLogin(bulkdata.username,bulkdata.password);

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
