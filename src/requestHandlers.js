function start(response) {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });   
    response.write("Hello, World!\n");
    response.end();
    
    console.log("Request handler 'start' was called");
}

function login(response) {
    response.end()
    
    console.log("Request handler 'login' was called");
}

function create(response) {
    response.end()
    
    console.log("Request handler 'create' was called");
}

exports.start = start
exports.login = login
exports.create = create