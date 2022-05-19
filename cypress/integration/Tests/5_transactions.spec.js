///<reference types="cypress"/>
import tezroData from '../../support/tezro_data';
import locators from '../../support/elementsLocators'
let signinLoc = locators?.signInLocators.signIn

describe("Sending transactions", () => {
    beforeEach(() => {
        // авторизация. Потом перепишу в отдельную простую функцию для запуска в 1 строку
        cy.viewport(1800, 950).visit(tezroData.urls.startUrl);
        cy.url().should("eq", tezroData.urls.startUrl);
        cy.get(`${locators.signUpLocators.startPage.signInButton}`).click();
        cy.url().should("eq", tezroData.urls.signInUrl);
        cy.get(`${signinLoc.seedPhraseInput}`).type(
          `${tezroData.userLoginData[0].seedPhrase}`
        ); // подумать,
        //как прикрутить функцию Лены typeTextData
        cy.get(`${signinLoc.seedPhraseInput}`).should(
          "contain.value",
          `${tezroData.userLoginData[0].seedPhrase}`
        );
        cy.get(`${signinLoc.loginButton}`).click().wait(1000);
        signinLoc.pinInput.forEach((pinCount) => {
          cy.get(`${pinCount}`).type("1");
        });
        signinLoc.pinInput.forEach((pinCount) => {
          cy.focused().type("1");
        });
        cy.wait(2000).url().should("eq", "https://dev-web.tezro.com/");
      });
    
    it("Sending transaction in privat chat", () => {


// Сначала найдём юзера, которому перекидывать деньги
// Открываем чат с ним
        cy.get("#searchInput")
        .should("be.enabled")
        .focus()
        .type(tezroData.userGlobalSearch.lastname).wait(500)
        cy.get("#dialogs-infinityScrollWrapper")
        .should("contain.text", tezroData.userGlobalSearch.lastname)
        .then(($chat)=>{
            cy.document($chat)
            cy.get($chat).find("button").click();
        })

        let messagg = "qqqdsfgsdfgsdffgdsfgsdfgsdfg ggdsfgdfgdsdfgdfgdfgdsfttt"
        // Пишем текстовое сообщение
        cy.get("#messageFieldValue")
        .focus()
        .should("be.enabled")
        .type(messagg)
        .invoke('val').as('aliasWithText')
    cy.get("#messageFieldValue").type("{enter}");

        // cy.get('p[class="StyleText_svkxk8i"]').first()
        // .invoke('text').as('aliasWithText')
        cy.get('@aliasWithText').then(() => {
          cy.get("p[class='messageTextItem MessageClassStyle_m2dsqsi StyleText_svkxk8i']")
        .last()
        .invoke('text')
        .should("eq", messagg)
        })
    






    }) // it

}) // describe