import { When } from "@cucumber/cucumber";
import { NavBar } from "../common/NavBar";
import { ContactPage } from "../pages/ContactPage";
import { CustomWorld } from "../support/world";

When(
  "the user navigates to the contact page",
  async function (this: CustomWorld) {
    await new NavBar(this.page).goToContact();
    await new ContactPage(this.page).verifyPageLoaded();
  },
);
