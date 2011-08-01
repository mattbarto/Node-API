var connect = require('connect');
var auth = require("./auth");
var router = require("./router");

var server = connect.createServer(
    //connect.logger({format: ':method :url'}),
    connect.cookieParser(),
    connect.session({secret: "gonzo", cookie: {maxage: 6000}}),
    connect.bodyParser(),
    connect.favicon(),
    auth.authCheck,
    router.route
);
server.listen(8000);
