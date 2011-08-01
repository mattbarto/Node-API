var url = require('url');
var requestHandlers = require("./requestHandlers");

var handle = {}
handle['/'] = requestHandlers.root;
handle['/login'] = requestHandlers.login;
handle['/create'] = requestHandlers.create;
handle['/logout'] = requestHandlers.logout;
handle['/auth_required'] = requestHandlers.auth_required;

var route = function(request, response, next) {
    var pathname = request.urlp.pathname;
    
    if (typeof handle[pathname] === 'function') {
        handle[pathname](request, response);
    } else {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("Sorry can't do nothing for you, bro\n");
        response.end();
        
        console.log("No request handler found for " + pathname);
    }

}

exports.route = route