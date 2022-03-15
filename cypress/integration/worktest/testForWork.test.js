///<reference types="cypress"/>

let classesOfElements = {
  title: "StyleText_svkxk8i",
  describe: "StyledDescription_swxwbnd StyleText_svkxk8i",
  image: "StyledLazyLoadImage_sdmrcbz",
  logInButton:
    "LoginClassStyle_l7rztas StyledLinkButton_s14d9575 StyleButton_s1oa7yi9",
  sugnInButton:
    "SignUpClassStyle_s13kf357 StyledLinkButton_s14d9575 StyleButton_s1oa7yi9",
  downloadButton: "StyledDownloadButton_sow4ltt StyleButton_s1oa7yi9",
};

let classesWithText = [
  { StyleText_svkxk8i: "Welcome toORDownload the AppFor MacOS and Windows" },
  {
    "StyledDescription_swxwbnd StyleText_svkxk8i":
      "Your fastest and most secure payment \n and your wealth custodian",
  },
];

// let logInPageElementsClasses = {
//     titleClass: "StyleText_svkxk8i",
//     title: "Your seed-phrase",
//     textareaTitle: "Put in your seed-phrase \n    or upload from file",
//     QRcodeTitle: "Scan this QR from Tezro If you are already \n    authorized on other device to login",
//     UploadFilesButton: "UploadFilesClassStyle_ulpcq2r StyleButton_s1oa7yi9",
//     LogInButton: "StyleButton_s1oa7yi9",
//     QRImageID: "react-qrcode-logo",
//     textArea: "StyleTextarea_s9zor9v"
// }

let logInPageElementsIDs = {
  textAreaId: "seedPhraseField",
  loginButtonId: "loginFirstSubmit",
};

let seedPhrase = {
  GrainSeed:
    "kidney fetch connect cage issue onion worth oak gasp pony wasp enough",
};

let pincodeFields = ["pin_0", "pin_1", "pin_2", "pin_3"]

let pincodeTyping = [ 1, 2, 3, 4]


describe("Authorisation in Web Tezro", () => {
  beforeEach(() => {
    cy.viewport(1800, 950);
  });

  it("Open web-site, checking the page elements", () => {
    cy.visit("https://dev-web.tezro.com/");
    cy.url().should("eq", "https://dev-web.tezro.com/");
    // classesOfElements.forEach((className) => {
    //   cy.get(`[class="${Object.values(className).toString()}"]`).should(
    //     "be.visible");
    // });
    for (let key in classesOfElements) {
      cy.get(`[class="${classesOfElements[key].toString()}"]`).should(
        "be.visible"
      );
    }
    classesWithText.forEach((classText) => {
      cy.get(`[class="${Object.keys(classText).toString()}"]`).should(
        "have.text",
        `${Object.values(classText)}`
      );
    });
  });

  it("OpenLogInPage", () => {
    cy.get(`[class="${classesOfElements.logInButton}"]`).click();
    cy.url()
    .should("eq", "https://dev-web.tezro.com/login");
    cy.get(`#${logInPageElementsIDs.textAreaId}`)
    .type(`${seedPhrase.GrainSeed}`)
    cy.get(`#${logInPageElementsIDs.textAreaId}`)
    .should('contain.value', `${seedPhrase.GrainSeed}`)
    cy.get(`#${logInPageElementsIDs.loginButtonId}`).click()
    pincodeFields.forEach ( pinCount => {
        cy.get(`#${pinCount}`).type('1')
    })
    pincodeFields.forEach ( pinCount => {
        cy.focused().type("1")
    })
    cy.url()
    .should("eq", "https://dev-web.tezro.com/");

  });

});
