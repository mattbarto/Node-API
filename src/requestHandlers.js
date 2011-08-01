var urlparser = require('url');
var sys = require('sys');

function root(request, response) {
    console.log("Request handler 'start' was called");
    
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });   
    response.write("Hello, World!\n");
    response.end()
}

function login(request, response) {
    console.log("Request handler 'login' was called");

    if (request.session.auth == true) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Logged in\n");
        response.end()
    } else {
        response.writeHead(403, {"Content-Type": "text/plain"});
        response.write("Expecting email/password combination\n");
        response.write("Did you create an account? Try /create\n");
        response.end()
    }
}

function logout(request, response) {
    console.log("Request handler 'logout' was called")

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("User logged out.\n");
    response.end()
}

function create(request, response) {
    console.log("Request handler 'create' was called")
    
    if ('email' in request.urlp.query && 'pwd' in request.urlp.query) {
        var values = [request.urlp.query.email, request.urlp.query.pwd];
        request.client.query("USE sincerely; INSERT INTO user (email, password) VALUES (?, ?)", 
        values,
        function (error, results) {
            if (error) {
                console.log("Insert error " + error.message);
                console.log("Could not insert user " + request.urlp.query.email);
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write("Could not create user because of error " + error.message + " please try again\n");
                response.end()
                return;
            }
        });
        request.session.auth = true;
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("User " + request.urlp.query.email + "added \n");
        response.end()
    } else {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Expecting email/pwd in get params\n");
        response.end()
    }
    
    console.log("Request handler 'create' was called");
}

function auth_required(request, response) {
    console.log("auth_required handler");
    
    if (request.session.auth == true) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("This requires auth, congrats");
        response.end()
    } else {
        response.writeHead(403, {'Content-Type': 'text/plain'});
        response.write("Need to be logged in bro\n");
        response.end()
    }
}

exports.root = root
exports.login = login
exports.create = create
exports.logout = logout
exports.auth_required = auth_required