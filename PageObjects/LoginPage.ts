import { type Locator, type Page } from "@playwright/test";

export default class LoginPage{

    readonly page: Page; 
    readonly username: Locator;
    readonly password: Locator;
    readonly LogInbtn: Locator;
    readonly loginIn: Locator;
    
    constructor(page: Page){

        this.page = page
        this.loginIn = page.locator('#login2');
        this.username = page.locator('#loginusername');
        this.password = page.locator('#loginpassword');
        this.LogInbtn = page.getByRole("button",{name:'Log in'});
    }

    async Goto(){
        await this.page.goto('https://www.demoblaze.com/');
    }

    async ValidLogin(username:string,password:string){
        await this.loginIn.click();
        await this.username.waitFor();
        await this.username.fill(username);
        await this.password.fill(password);
    }

    async ClickOnLoginBtn(){
        await this.LogInbtn.click();
    }
}
