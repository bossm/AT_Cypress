/// <reference types="cypress-xpath" />
import {generalFunctions} from "../../actions/general-functions.actions";
import {baseActions} from "../../actions/base-actions.actions";
import matomo_info from '../../locators/matomo-info.json';

describe('Check Matomo existence', () => {
    it('Check Matomo in Regular Join', () => {

        cy.intercept({
            method: "POST",
            url: "https://mtm.betus.com.pa/matomo.php*",
        }).as("matomo_request");

        cy.visit('/join.json?method=regular')

        cy.wait("@matomo_request", {timeout: 30000})
            .then(({request}) => {
                const params = generalFunctions.queryStringToJSON(matomo_info.regular_join.account_page);
                expect(baseActions.check_matomo(request.query, params)).to.eq(true)
            });

    });
});