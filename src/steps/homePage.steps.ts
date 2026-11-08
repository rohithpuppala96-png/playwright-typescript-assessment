import { Given } from "@cucumber/cucumber";
import { HomePage } from "../pages/HomePage";
import { CustomWorld } from "../support/world";

Given("the user is on the home page", async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.open();
  await homePage.verifyPageLoaded(this.currentData.homePageHeading);
});
