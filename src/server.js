var http = require("http");
var url = require('url');

function start(route, handle) {
    function onRequest(request, response) {  
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " recieved.");

        route(handle, pathname, response);

    };
    
    http.createServer(onRequest).listen(8000)
    console.log("Server running at http://127.0.0.1:8000/");
};

exports.start = start;
