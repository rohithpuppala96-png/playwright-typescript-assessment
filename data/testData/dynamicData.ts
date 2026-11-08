export const dynamicData = {
  testData: {
    TC01_ContactValidation: {
      homePageHeading: "Jupiter Toys",
      contactDetails: {
        forename: "Rohith",
        email: "rothithtest1@example.com",
        message: "Contact Form",
      },
    },

    TC02_ContactSubmission_01: {
      homePageHeading: "Jupiter Toys",
      contactDetails: {
        forename: "Rohith",
        email: "rohithtest2@example.com",
        message: "Testing successful contact submission Run 1",
      },
      successMessageText: "we appreciate your feedback",
    },

    TC02_ContactSubmission_02: {
      homePageHeading: "Jupiter Toys",
      contactDetails: {
        forename: "Roh-Pup",
        email: "roh.pup@example.com",
        message: "Testing successful contact submission Run 2",
      },
      successMessageText: "we appreciate your feedback",
    },
    TC02_ContactSubmission_03: {
      homePageHeading: "Jupiter Toys",
      contactDetails: {
        forename: "Barbel",
        email: "bar+bell@example.com",
        message: "Testing successful contact submission Run 3",
      },
      successMessageText: "we appreciate your feedback",
    },
    TC02_ContactSubmission_04: {
      homePageHeading: "Jupiter Toys",
      contactDetails: {
        forename: "Nikki",
        email: "Nikki.k@example.org",
        message:
          "Testing successful contact submission Run 4",
      },
      successMessageText: "we appreciate your feedback",
    },
    TC02_ContactSubmission_05: {
      homePageHeading: "Jupiter Toys",
      contactDetails: {
        forename: "Jackie",
        email: "ja@example.net",
        message: "Testing successful contact submission Run 5",
      },
      successMessageText: "we appreciate your feedback",
    },

    TC03_CartCalculation: {
      homePageHEading: "Jupiter Toys",
      cartItems: [
        { productName: "Stuffed Frog", quantity: 2 },
        { productName: "Fluffy Bunny", quantity: 5 },
        { productName: "Valentine Bear", quantity: 3 },
      ],
    },
  },
};
