//simple get function to retrieve people from TripPin service
var http = require('http');
var serviceRoot = 'https://services.odata.org/v4/TripPinServiceRW/';
getURL(serviceRoot + 'People'); //can do 'People('name')' to request specific person's name
//getURL(serviceRoot + 'People?$top=2 & $select=FirstName, LastName & $filter=Trips/any(d:d/Budget gt 3000)');
//the code above allows the search of a query 

function getURL(url: any) {
    var body = '';
    http.get(url, function (response: any) {
        response.on('data', function (chunk: any) {
            body+=chunk;
        });
        response.on('end', function () {
            console.log(body);
        });
    }).on('error', function(e: any) {
        console.log('ERROR: ' + e.message);
    });
}

