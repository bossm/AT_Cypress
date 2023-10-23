const rd = require('../TestData/RequiredDataForJoin')

describe('Join API test', ()=>{
    let key = 'EUgZpubUQ65xt96WXqpaZsbeV9Y3vPst';
    let api = 'https://api.betus.com.pa/api/v1/Customer/SignUp'

    let data,url,loc;
    before(()=>{
        url = Cypress.config().baseUrl;
        cy.fixture('accounts.json').then((d)=>{ data = d.login_info; });
        cy.fixture('locators.json').then((d)=>{loc = d});
        
    });

    it("Successful join.json with API", ()=>{

        let email = rd.generateEmail();
        const jsonData = {
            FirstName: 'test',
            LastName: 'test',
            Email: email,
            Phone: '1234567890',
            Password: '1234567890',
            AffiliateToken: '',
            Secret: key,
          };

          cy.request({
            method: 'POST',
            failOnStatusCode: false,
            url: api,
            headers: {
              'Content-Type': 'application/json'
            },
            body: jsonData
          })
          .then((response) => {
            cy.log(response)
            expect(response.status).to.be.eq(200);
            let res_url = response.body['RedirectUrl'];
            cy.visit(res_url,{failOnStatusCode: false});
            cy.get(loc.header.my_account_mobile).should('be.visible');
            cy.window().then((win) => {
              const userAgent = win.navigator.userAgent;
              cy.log(`User Agent: ${userAgent}`);
            });
            cy.visit("/");
            cy.get(loc.deposit.deposit_frame).should('be.visible');
          });
    });

    it("Missing fields in join.json API", ()=>{
        const data = {
          FirstName: 'test',
            LastName: 'test',
            Email: rd.generateEmail(),
            Phone: '1234567890',
            Password: '1234567890',
            Secret: key,
        };
        let keys = Object.keys(data);
        let randomIndex = Math.floor(Math.random() * keys.length);
        let randomKey = keys[randomIndex];
        delete data[randomKey];
        cy.request({
          method: 'POST',
          failOnStatusCode: false,
          url: api,
          headers: {
            'Content-Type': 'application/json'
          },
          body: data
        })
        .then((response) => {
          cy.log(response)
          expect(response.status).to.be.within(500,599);
          
        });
    });

    it("Existing account join.json API", ()=>{
        let email = rd.generateEmail()
        const jsonData = {
            FirstName: 'test',
            LastName: 'test',
            Email: email,
            Phone: '1234567890',
            Password: '1234567890',
            AffiliateToken: '',
            Secret: key,
          };

          cy.request({
            method: 'POST',
            url: api,
            headers: {
              'Content-Type': 'application/json'
            },
            body: jsonData
          })
          .then((response) => {
            //cy.log(response);
            expect(response.status).to.be.eq(200);
            cy.request({
              method: 'POST',
              failOnStatusCode: false,
              url: api,
              headers: {
                'Content-Type': 'application/json'
              },
              body: jsonData
            })
            .then((response) => {
              cy.log(response)
              expect(response.status).to.be.eq(400);
              
            });
          });
    });
});