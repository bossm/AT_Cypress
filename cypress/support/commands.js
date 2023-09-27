// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
///<reference types="Cypress"/>

Cypress.Commands.add('login', (user = null,password = null) =>{
    
    cy.fixture('locators.json').then((loc)=>{
        cy.log(user);
        cy.log(password);
        cy.fixture('accounts.json').then((accounts)=>{
            user = user || accounts.login_info.account_number;
            password = password || accounts.login_info.password;
            cy.get(loc.header.login).click();
            cy.get(loc.login.account_number).click().type(user);
            cy.get(loc.login.password).click().type(password);
            cy.get(loc.login.button).click();
            cy.get(loc.header.my_account_mobile, {timeout:30000}).should('be.visible');
        });
    });  
});

Cypress.Commands.add('logout', ()=>{
    cy.fixture('locators.json').then((loc)=>{
        cy.get(loc.nav_bar_mobile.menu_toggle).click({force: true});
        cy.get(loc.header.logout_mobile).click();
        cy.wait(1000)
        cy.get(loc.login.account_number,{timeout: 10000}).should('be.visible');
        cy.get(loc.login.x).click();
        cy.get(loc.header.login,{timeout: 10000}).should('be.visible');
    });
});
Cypress.Commands.add('validate_deposit_modal', (method_id) =>{
    cy.get('.nav-item').each((el)=>{
        const id = el.invoke('attr','id');
        if (id === method_id)
            expect(id).to.equal(method_id);
    });
});

