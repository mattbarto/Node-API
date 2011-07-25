function route(handle, pathname, response) {
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response);
    } else {
        response.writeHead(404, {"Content-Type": "text/plan"});
        response.write("Sorry can't do nothing for you, bro\n");
        response.end()
        
        console.log("No request handler found for " + pathname);
    }
}

exports.route = route;