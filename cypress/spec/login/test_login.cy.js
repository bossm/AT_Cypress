///<reference types="Cypress"/>


describe('Login', () => {
  let data;
  let url;
  let loc;
  before(()=>{
    Cypress.on('uncaught:exception', () => { return false });
    url = Cypress.config().baseUrl;
    cy.fixture('accounts.json').then((d)=>{
        data = d;
      });
    cy.fixture('locators.json').then((d)=>{
        loc = d;
    });
      
  });
  // Login successfully from the authentication test
  it('Login from authentication page', () => {
    
    cy.visit('/');
    cy.get(loc.header.login).click();
    cy.location().should((location)=>{ expect(location.pathname).to.be.eq('/authentication/login');});
    cy.get(loc.login.account_number).click().type(data.login_info.account_number);
    cy.get(loc.login.password).click().type(data.login_info.password);
    cy.get(loc.login.button).click();
    cy.get(loc.header.my_account_mobile).should('exist').and('be.visible');
    cy.location().should((location)=>{
      expect(location.pathname).to.include('sportsbook')
    });
  });
  // Login with invalid data which results failure
  it('Login failed authentication', ()=>{
    cy.visit('/authentication/login');
    //empty fields
    cy.get(loc.login.button).click();
    cy.get(loc.login.account_error).should('be.visible');
    cy.get(loc.login.password_error).should('be.visible');
    //fill account number
    cy.get(loc.login.account_number).click().type(data.login_info.account_number);
    cy.get(loc.login.account_error).should('not.be.visible');
    cy.get(loc.login.password_error).should('be.visible');
    //fill wrong password
    cy.get(loc.login.password).click().type('aaaaaaa');
    cy.get(loc.login.account_error).should('not.be.visible');
    cy.get(loc.login.password_error).should('not.be.visible');
    cy.get(loc.login.button).click()
    cy.get(loc.login.error).should('be.visible');
  });
  // Login from loyalty page
  it('Login from loyalty page', ()=>{
    cy.visit('/loyalty');
    cy.get(loc.loyalty.login).click();
    cy.location().should((location)=>{ expect(location.pathname).to.be.eq('/authentication/login');});
    cy.get(loc.login.account_number).click().type(data.login_info.account_number);
    cy.get(loc.login.password).click().type(data.login_info.password);
    cy.get(loc.login.button).click();
    cy.get(loc.header.my_account_mobile).should('exist').and('be.visible');
    cy.location().should((location)=>{
      expect(location.pathname).to.be.eq('/loyalty/');
    });

  });

});