import { type Page, type Locator, expect } from "@playwright/test";

export default class HomePage{
    readonly page: Page;
    readonly Product: Locator;
    readonly AddtocartBtn: Locator;
    readonly cartLink: Locator;
    
    constructor(page: Page){
        this.page = page; 
        this.Product = page.locator('.card-block a');
        this.AddtocartBtn = page.getByText('Add to cart');
        this.cartLink = page.locator('#cartur');
    }

    async Addtocart(productname: string){
        await this.Product.filter({hasText:""+productname+""}).click();
        await this.AddtocartBtn.waitFor();
        await this.AddtocartBtn.click();
    }

    async CartView(addedproduct: string){
        await this.cartLink.waitFor();
        await this.cartLink.click();
        await expect(this.page.locator('.success td').nth(1).filter({hasText:""+addedproduct+""})).toBeVisible();
    }
}
