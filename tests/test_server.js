var
  assert = require("assert"),
  http = require("http"),
  api_server = require("../src/server"),
  callbackFired = false;
  
http.createServer(api_server.onRequest).listen(3000);

http.cat("http://127.0.0.1:3000/").addCallback(function(response) {
      callbackFired = true;
      assert.equal("Hello, World!", response);
      api_server.server.close();
});
  
process.addListener("exit", function() {
    assert.ok(callbackFired);
});