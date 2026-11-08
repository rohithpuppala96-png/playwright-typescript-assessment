import { Page } from "playwright/test";

export class NavBar {
    private readonly Elements = {
        shopLink: "",
        contactLink: "",
        cartLink: "",
    };

    constructor(private readonly page: Page){}

    async goToShop() {
        await this.page.locator(this.Elements.shopLink).click();
    }

    async gotToContact(){
        await this.page.locator(this.Elements.contactLink).click();
    }

    async goToCart() {
        await this.page.locator(this.Elements.cartLink).click();
    }
}