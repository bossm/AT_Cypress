///<reference types="Cypress"/>
const rd = require('../TestData/RequiredDataForJoin');

describe("Quick Join Tests", ()=>{
    let loc;
    let data = rd.getQuickJoinData();
    function step1(){
        cy.get(loc.quick_join.first_name).should('be.visible').type(data.first_name);
        cy.get(loc.quick_join.last_name).type(data.last_name);
        cy.get(loc.quick_join.email).type(data.email);
        cy.get(loc.quick_join.phone).type(data.phone);
        let length = cy.get(loc.quick_join.step_progress_bar).length;
        cy.get(loc.quick_join.continue).click();
        return (length == 3)?false:true;
 
    }

    function step1_canada(){
        cy.get(loc.quick_join.first_name).should('be.visible').type(data.first_name);
        cy.get(loc.quick_join.last_name).type(data.last_name);
        cy.get(loc.quick_join.email).type(data.email);
        cy.get(loc.quick_join.phone_country).click();
        cy.get(loc.quick_join.canada).click();
        cy.get(loc.quick_join.phone).type(data.phone);
        let length = cy.get(loc.quick_join.step_progress_bar).length;
        cy.get(loc.quick_join.continue).click();
        return (length == 3)?false:true;
    }

    before(()=>{
        cy.fixture('locators.json').then((d)=>{loc = d;});
    });
    beforeEach(()=>{
        data.email = rd.generateEmail();
    });
    // TEST #1
    it("Successful Quick Join", ()=>{
        cy.visit('join.json/quickjoin');
        let isAddressRequired = step1();
        if (isAddressRequired){
            cy.get(loc.quick_join.address).should('be.visible').type("test");
            cy.get(loc.quick_join.city).type("test");
            cy.get(loc.quick_join.zip).type("12121");
            cy.get(loc.quick_join.state).type("Alabama");
            cy.get(loc.quick_join.address_continue).click();

        }
        cy.get(loc.quick_join.password).should('be.visible');
        cy.get(loc.quick_join.password).type(data.password);
        cy.get(loc.quick_join.signup).click();
        cy.get(loc.quick_join.referral).click();
        cy.get(loc.quick_join.referral_items).find('div').last().click();
        cy.get(loc.quick_join.referral_details).should('be.visible');
        cy.wait(1000);
        cy.get(loc.quick_join.referral_continue).click();
        // s
        cy.wait(3000);
        cy.window().then((win)=>{
            cy.log(win.eval('customerDepositMethodType;'));
        });
        //cy.reload();
        // cy.window().then((win)=>{
        //     cy.log(win.eval('customerDepositMethodType;'));
        // });
        cy.location({timeout:10000}).should((location)=>{
            expect(location.pathname).to.contain('#dw');
          });
        if (cy.location().contains('#m1')){
            cy.get(loc.m1.account_number).should('not.have.text','');
            cy.visit('/sportsbook');
            cy.get(loc.header.my_account_mobile).should('be.visible');
        }
        else{
            cy.get(loc.quick_deposit.account_number).should('not.have.text','');
            cy.visit('/sportsbook');
            cy.get(loc.header.my_account_mobile).should('be.visible');
        }
    });
    // TEST #2
    it("Test Quick Join back button", ()=>{
        cy.visit('join.json/quickjoin');
        step1();
        cy.get(loc.quick_join.back).should('be.visible').click({ multiple: true , force:true});
        cy.get(loc.quick_join.first_name).should('be.visible');
        cy.get(loc.quick_join.first_name).should('have.value',data.first_name);
        cy.get(loc.quick_join.last_name).should('have.value',data.last_name);
        cy.get(loc.quick_join.email).should('have.value',data.email);
        cy.get(loc.quick_join.phone).should('have.value',data.phone);
        cy.get(loc.quick_join.continue).should('be.visible');
    });
    // TEST #3
    it("Quick join.json field validation", ()=>{
        let inputs = [
             ["first"],
             ["last"],
             ['test@test.com', '  iii  ii', 'tests@test', 'teststest.com'],
             [data.phone]
        ];
        cy.visit('join.json/quickjoin');
        
        cy.get(loc.quick_join.form_field).each(($el, index) => {
            let test_case = inputs[index];
            for(var i=0; i < test_case.length; i++){
                if (i == 0){
                    cy.wrap($el).type(test_case[i]);
                    cy.wrap($el).invoke('attr','');
                }
            }
        });
    });
    // TEST #5
    it("Successful Quick Join Canada", ()=>{
        cy.visit('join.json/quickjoin');
        let addressRequired = step1_canada();
        if (addressRequired){
            cy.get(loc.quick_join.city).should('be.visible').type('test');
            cy.get(loc.quick_join.int_address_continue).click();
        }
        cy.get(loc.quick_join.password).should('be.visible').type(data.password);
        cy.get(loc.quick_join.signup).click();
        cy.get(loc.quick_join.referral).click();
        cy.get(loc.quick_join.referral_items).find('div').last().click();
        cy.wait(1000)
        cy.get(loc.quick_join.referral_details).should('be.visible');
        cy.get(loc.quick_join.referral_continue).click();
        cy.location({timeout:10000}).should((location)=>{
            expect(location.pathname).to.contain('#dw');
          });
        if (cy.location().contains('#m1')){
            cy.get(loc.m1.account_number).should('not.have.text','');
            cy.visit('/sportsbook');
            cy.get(loc.header.my_account_mobile).should('be.visible');
        }
        else{
            cy.get(loc.quick_deposit.account_number).should('not.have.text','');
            cy.visit('/sportsbook');
            cy.get(loc.header.my_account_mobile).should('be.visible');
        }
    });
    // TEST #6
    it("Quick join.json password validation", ()=>{
        cy.visit('join.json/quickjoin');
        let isAddressRequired = step1();
        if (isAddressRequired){
            cy.get(loc.quick_join.address).type("test");
            cy.get(loc.quick_join.city).type("test");
            cy.get(loc.quick_join.zip).type("12121");
            cy.get(loc.quick_join.state).type("Alabama");
            cy.get(loc.quick_join.address_continue).click();

        }
        cy.get(loc.quick_join.password).should('be.visible').type('1234');
        cy.get(loc.quick_join.progress_bar).should('have.class', 'strength-1');
        cy.get(loc.quick_join.password).type('test');
        cy.get(loc.quick_join.progress_bar).should('have.class', 'strength-2');
        cy.get(loc.quick_join.password).type('AT');
        cy.get(loc.quick_join.progress_bar).should('have.class', 'strength-3');
        cy.get(loc.quick_join.password).type('@');
        cy.get(loc.quick_join.progress_bar).should('have.class', 'strength-4');
        cy.get(loc.quick_join.password).type('!');
        cy.get(loc.quick_join.progress_bar).should('have.class', 'progress-success');
    });

});
