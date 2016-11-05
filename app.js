// Consumer Key	yHRcIf6jzZ3QvcS88zHrwg
// Consumer Secret	gPfhxeKZ-_SFcpyTCEzbCman2Gg
// Token	9n9exZ--1E49ps7KTOsTYSZR1JJIN_KD
// Token Secret	qMlbbPtut1HgUeeA2qZ6XkC4ynA

(function() {
    function generateRandomString ()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function getCurrentTime () {
    var time = "";
    time += Math.floor(Date.now() / 1000);
    return time;
}
    // var signatureMethod = 'hmac-sha1';
    var signature = 'jJik6XrPgKroy3pbgG9LoqaoxWo'; //this is the token secret obtained from Manage API
    var consumerKey = 'yHRcIf6jzZ3QvcS88zHrwg';
    var token = 'xQjVOzd4Zv5NIyCRPDfKL0uH3trFD4M7';
    var oauth_signature_method = 'hmac-sha1';
    var oauth_nonce = generateRandomString(); //just added missing params
    var oauth_timestamp = getCurrentTime(); // just added missing params
    var searchTerm = $('#search-term').val(); // user's search term
    var location = $('#location').val(); //note: user enters a location, city and/or state
    var sort = '2'; //note: sort value has to be '2' for highest rated or '1' for distance or remove sort entirely or set it to '0' for best match
    var limitOfSearchReturns = '10'; //note: this has to be

    $('button').click(function() {
        getPlaces($searchTerm, $location); //i removed the .val and added above line 11&13
    });

    function getPlaces(searchTerm, place) {
        var yelpAPI = 'https://api.yelp.com/v2/search/?' +
        'term=' + searchTerm + '&location=' + place + '&sort=' + sort + '&limit=' + limitOfSearchReturns + '&oauth=' + token + '&oauth_consumer_key=' + consumerKey + '&oauth_signature=' + signature + '&oauth_signature_method=hmac-sha1' + oauth_nonce + oauth_timestamp + oauth_signature_method;

        console.log(yelpAPI);

        var filteredResponse = []; //note: in the $.each in the response below, the response must be response.{value} in order to narrow down the data we need from each object

        $.ajax(yelpAPI)
        .done(function(response) {
            $.each(response.businesses, function(index, value) {
                filteredResponse.push({
                    name: value.name,
                    neighborhood: value.location.neighborhoods[0],
                    street_address: value.location.address[0],
                    city: value.location.city,
                    state: value.location.state_code,
                    zip_code: value.location.postal_code,
                    is_closed: value.is_closed
                });

            });
          appendToDOM(filteredRespnse); //THIS RETURNS AN ARRAY WITH THE DAY ABOVE FOR EACH OF THE BUSINESSES

    }).catch(function(error) {
        console.log(error);
    });
}

function appendToDOM(data) {
    var html = '<div class="search-response">' + data; //HERE IS WHERE YOU WILL APPEND THE DATA. modify html accordingly

    $('.results').append(html);
}

}());