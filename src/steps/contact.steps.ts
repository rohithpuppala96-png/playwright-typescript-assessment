import { Then, When } from "@cucumber/cucumber";
import { ContactPage } from "../pages/ContactPage";
import { CustomWorld } from "../support/world";

When(
  "the user submits the contact form without entering any data",
  async function (this: CustomWorld) {
    await new ContactPage(this.page).clickSubmit();
  },
);

Then(
  "validation errors are shown for all mandatory fields",
  async function (this: CustomWorld) {
    const contactPage = new ContactPage(this.page);
    await contactPage.verifyErrorBannerShown();
    await contactPage.verifyForenameErrorShown();
    await contactPage.verifyEmailErrorShown();
    await contactPage.verifyMessageErrorShown();
  },
);

When(
  "the user fills in all mandatory fields with valid data",
  async function (this: CustomWorld) {
    const contactPage = new ContactPage(this.page);
    const { forename, email, message } = this.currentData.contactDetails;
    await contactPage.fillForename(forename);
    await contactPage.fillEmail(email);
    await contactPage.fillMessage(message);
  },
);

Then(
  "the validation errors are no longer displayed",
  async function (this: CustomWorld) {
    const contactPage = new ContactPage(this.page);
    await contactPage.verifyErrorBannerCleared();
    await contactPage.verifyForenameErrorCleared();
    await contactPage.verifyEmailErrorCleared();
    await contactPage.verifyMessageErrorCleared();
  },
);

When("the user submits the contact form", async function (this: CustomWorld) {
  await new ContactPage(this.page).clickSubmit();
});

Then(
  "the successful submission message is displayed",
  async function (this: CustomWorld) {
    const contactPage = new ContactPage(this.page);
    const { forename } = this.currentData.contactDetails;
    await contactPage.verifySuccessMessageShown();
    await contactPage.verifySuccessMessageContains(`Thanks ${forename}`);
    await contactPage.verifySuccessMessageContains(
      this.currentData.successMessageText,
    );
  },
);
