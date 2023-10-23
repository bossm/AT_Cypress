import {GoogleSearch} from "../page-objects/regular_join_matomo.page";
const search = new GoogleSearch();
describe('Google Navigation', () => {
    it('Google Search', () => {
    cy.visit('https://www.google.com')
    search.googleSearch().type("Something");
    search.googleSearchBtn().click();
    search.searchResults().should('be.visible');
    });
});