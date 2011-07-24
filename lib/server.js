(function() {
  var http;
  http = require("http");
  http.createServer(function(req, res) {
    res.writeHead(200, {
      "Content-Type": "text/plain"
    });
    return res.end("Hello, World!");
  }).listen(8000);
  console.log("Server running at http://127.0.0.1:8000/");
}).call(this);
