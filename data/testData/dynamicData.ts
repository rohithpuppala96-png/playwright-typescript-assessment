export const dynamicData ={
    testData:{
        TC01_ContactValidation: {
            homePageHeading: "Jupiter Toys",
            contactDetails: {
                forename: "Rohith",
                email: "rothithtest1@example.com",
                message: "Contact Form"
            },
        },

        TC02_ContactSubmission: {
            homePageHeading: "Jupiter Toys",
            contactDetails: {
                forename: "Rohith",
                email: "rohithtest2@example.com",
                message: "Testing successful contact submission",
            },
        },

        TC03_CartCalculation: {
            homePageHEading: "Jupiter Toys",
            cartItems: [
                { productName: "Stuffed Frog", quantity:2 },
                { productName: "Fluffy Bunny", quantity:5 },
                { productName: "Valentine Bear", quantity:3},
            ]
        }
    }
}