export class GoogleSearch {
    googleSearch() {
        return cy.get('input[name="q"]').first();
    }

    googleSearchBtn() {
        return cy.get('input[name="btnK"]').first();
    }

    searchResults(queryString) {
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

}