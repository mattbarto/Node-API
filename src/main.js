var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle['/'] = requestHandlers.start;
handle['/login'] = requestHandlers.login;
handle['/create'] = requestHandlers.create;

server.start(router.route, handle)