///<reference types="cypress"/>
import tezroData from '../../support/tezro_data';
import locators from '../../support/elementsLocators'
let signinLoc = locators?.signInLocators.signIn

let messageForTyping = `very long message${Math.round(Math.random()*1000)}`

function typingAMessage() {
    cy.get("#messageFieldValue")
    .type(`${messageForTyping}{enter}`);
}


describe("User's chat and message's context menu", () => {

    beforeEach(()=> {
        // авторизация. Потом перепишу в отдельную простую функцию для запуска в 1 строку
        cy.viewport(1800, 950).visit(tezroData.urls.startUrl);
        cy.url().should("eq", tezroData.urls.startUrl);
        cy.get(`${locators.signUpLocators.startPage.signInButton}`).click();
        cy.url().should("eq", tezroData.urls.signInUrl);
        cy.get(`${signinLoc.seedPhraseInput}`)
        .type(`${tezroData.userLoginData[0].seedPhrase}`) // подумать, 
        //как прикрутить функцию Лены typeTextData
        cy.get(`${signinLoc.seedPhraseInput}`)
          .should('contain.value', `${tezroData.userLoginData[0].seedPhrase}`)
        cy.get(`${signinLoc.loginButton}`).click().wait(1000)
        signinLoc.pinInput.forEach(pinCount => {
          cy.get(`${pinCount}`).type('1')
        })
        signinLoc.pinInput.forEach(pinCount => {
          cy.focused().type("1")
        })
        cy.wait(2000).url().should("eq", "https://dev-web.tezro.com/");
                })

    it.skip("1. Write message in chat", () => {
        cy.get('span[class="StyledText_sm7kffo"]')
        .should("have.text", 'Choose who you would like to write to')
        .should("be.visible");

        // сами тесты чатов
        cy.get('#dialogItem')
        .first('button').as('chatButton') // без этого отваливалось, как detached from the DOM
        .should('be.visible')
        .should('be.enabled')
        .click({force: true});
        cy.get('span[class="StyledText_sm7kffo"]')
        .should('not.exist');
        cy.get("#messageFieldValue")
        .should('be.visible').and('be.enabled')
        .type(messageForTyping)
        .should("contain.value", messageForTyping).type('{enter}');
        cy.get('p[class="messageTextItem MessageClassStyle_m2dsqsi StyleText_svkxk8i"]')
        .contains(messageForTyping)
        .should('exist').and('have.text', messageForTyping);
    });//it1

    it("2. Message's context menu", () => {
        cy.get('#dialogItem')
        /* пытаюсь добраться до второго чата 
        cy.get('#dialogItem').siblings('button').then(($elem) => {
            return $elem[0];
        }).click();*/
        .should('exist')
        .first('button')
        .click();

        typingAMessage();

        cy.get('p[class="messageTextItem MessageClassStyle_m2dsqsi StyleText_svkxk8i"]')
        .contains(messageForTyping)
        .rightclick({force: true});

        cy.get('.StyledContextMenuBG_s460k0')
        .should("be.visible");
        
        cy.get('.react-contexify__item__content')
        .contains('Reply').click({force : true});
        
        //typingAMessage();
        cy.get("#messageFieldValue")
        .type(`sdfsdfsdf`).should('contain.value', 'sdfsdfsdf').type('{enter}');

        // cy.get('p[class="messageTextItem MessageClassStyle_m2dsqsi StyleText_svkxk8i"]')
        // .contains('sdfsdfsdf');


    }); //it2


  });//describe