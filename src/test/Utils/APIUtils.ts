import { APIRequestContext,APIResponse } from "@playwright/test";

export default class APiUtils {

    apiContext : APIRequestContext;
    loginPayload: any;
    response: APIResponse;

    constructor(apiContext: APIRequestContext, loginPayLoad: any) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayLoad;
    }
 
    async getToken() {
        const loginResponse: APIResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayload
        }); // 200, 201
        console.log(loginResponse);
        const loginResponseJson = await loginResponse.json();
        let token = loginResponseJson.token;
        console.log(token);
        return token;
    }
 
    async createOrder(orderPayLoad: any) {
        let response: Record<any, any> = {};
        response.token = await this.getToken();
        const orderResponse: APIResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });
 
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders;
        console.log(orderId);
        response.orderId = orderId;
        return response;
    }
}
 