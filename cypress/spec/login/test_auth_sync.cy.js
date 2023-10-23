///<reference types="Cypress"/>

describe('Test Login/Logout Sync', ()=>{
    let data,url,loc;
    before(()=>{
        
        url = Cypress.config().baseUrl;
        cy.fixture('accounts.json').then((d)=>{ data = d.login_info; });
        cy.fixture('locators.json').then((d)=>{loc = d});
    });

    it('Test login from .NET4 and redirect to .NET5',()=>{
        cy.visit('/sportsbook');
        cy.login();
        cy.location().should((location)=> {expect(location.pathname).to.include('/sportsbook')});
        cy.visit('/loyalty');
        cy.get(loc.loyalty.status_tab).should('be.visible');
        cy.get(loc.header.my_account_mobile).should('be.visible');
        cy.get(loc.nav_bar_mobile.menu_toggle).click({force: true});
        cy.get(loc.header.logout_mobile).should('be.visible');
    });

    it('Test login from .NET5 and redirect to .NET4', ()=>{
        cy.visit('/');
        cy.login();
        cy.location().should((location)=> {expect(location.pathname).to.include('/sportsbook')});
        cy.visit('/loyalty');
        cy.get(loc.loyalty.status_tab).should('be.visible');
        cy.get(loc.header.my_account_mobile).should('be.visible');
        cy.get(loc.nav_bar_mobile.menu_toggle).click({force: true});
        cy.get(loc.header.logout_mobile).should('be.visible');
    });

    it('Test logout from .NET4 and redirect to .NET5', ()=>{
        cy.visit('/');
        cy.login();
        cy.visit('/sportsbook');
        cy.logout();
        cy.visit('/');
        cy.get(loc.header.login).should('be.visible');
    });

    it('Test logout from .NET5 and redirect to .NET4', ()=>{
        cy.visit('/sportsbook');
        cy.login();
        cy.visit('/');
        cy.logout();
        cy.visit('/sportsbook');
        cy.get(loc.header.login).should('be.visible');
    });

});