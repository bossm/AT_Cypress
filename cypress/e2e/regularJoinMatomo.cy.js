describe('template spec', () => {
    var keys_to_check = ['fa_ef', 'e_c', 'e_a', 'e_n', 'e_v', 'fa_id', '', 'action_name']
    var keys_to_not_check = ['dimension11', 'dimension25', 'dimension7', 'dimension21']
    var account_page = 'action_name=Bet%20Online%20Sports%20Betting%20at%20BetUS%20Sportsbook%2C%20Live%20Betting%2C%20Online%20Casino%20and%20Horse%20Racing&idsite=4&rec=1&r=873537&h=16&m=36&s=41&url=https%3A%2F%2Fwww.betus.com.pa%2Fjoin%3Fmethod%3Dregular&_id=aae2b88409915964&_idn=0&send_image=0&_refts=0&pdf=1&qt=0&realp=0&wma=0&fla=0&java=0&ag=0&cookie=1&res=1512x982&dimension1=prod&dimension2=windows&dimension18=join&dimension19=1&dimension20=step%201%3A%20open%20account&dimension26=unlogged&pv_id=WzTKXv&fa_pv=1&fa_fp[2][fa_vid]=Bb5OVu&fa_fp[2][fa_id]=joinForm&fa_fp[2][fa_fv]=1&fa_fp[3][fa_vid]=a1Bydu&fa_fp[3][fa_fv]=1&fa_fp[4][fa_vid]=C8VMDf&fa_fp[4][fa_fv]=1&fa_fp[5][fa_vid]=6hz8jf&fa_fp[5][fa_fv]=1&fa_fp[6][fa_vid]=GiYK7Y&fa_fp[6][fa_fv]=1&fa_fp[7][fa_vid]=gawXGF&fa_fp[7][fa_fv]=1&pf_net=731&pf_srv=946&pf_tfr=2&pf_dm1=2174'

    function queryStringToJSON(queryString) {
        if (queryString.indexOf('?') > -1) {
            queryString = queryString.split('?')[1];
        }
        var pairs = queryString.split('&');
        var result = {};
        pairs.forEach(function (pair) {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });
        return result;
    }

    function check_matomo(actual, expected) {
        for (var prop in actual) {
            cy.log(prop)
            if(prop in keys_to_check){
                if(actual[prop]!==expected[prop]){
                    cy.log(actual[prop])
                    cy.log(expected[prop])
                    return false
                }
            }
        }
        return true
    }

    it('passes', () => {
        cy.intercept({
            method: "POST",
            url: "https://mtm.betus.com.pa/matomo.php*",
        }).as("dataGetFirst");
        cy.visit('/join?method=regular')

        cy.wait("@dataGetFirst", {timeout: 150000}).then(({request}) => {
            var params = queryStringToJSON(account_page);
            cy.log(params)
            expect(check_matomo(request.query, params)).to.eq(true)
        });
    })
})