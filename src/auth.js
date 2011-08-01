var connect = require('connect');
var urlparser = require('url');
var sys = require('sys');
var Client = require("mysql").Client;

var authCheck = function(req, res, next) {
    url = req.urlp = urlparser.parse(req.url, true);
    var client = req.client = new Client()
    
    client.user = 'mspot';
    client.password = 'skygo';
    
    client.connect(function(error, results) {
      if(error) {
        console.log('Connection Error: ' + error.message);
        return;
      }
      console.log('Connected to MySQL');
    });
    
    if(url.pathname =="/logout") {
        console.log("Logged user out");
        req.session.destroy();
    }
    
    if(req.session && req.session.auth == true) {
        console.log("User already logged in");
        next();
        return;
    }
    
    if(url.pathname == "/login" && 'email' in url.query && 'pwd' in url.query) {
        var values = [url.query.email, url.query.pwd];
        client.query("USE sincerely; SELECT * FROM user WHERE email = ? and password = ?;",
        values,
        function (error, results) {
            if (error) {
                console.log("User lookup error " + error.message);
                return;
            }
            
            if (results.length > 0) {
                console.log("authenticated");
                req.session.auth = true;
                return;
            }
            console.log("No results for user " + url.query.email + ' add password ' + url.query.pwd);
            return;
        });
    }
    next();
}

exports.authCheck = authCheck