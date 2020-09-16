const http = require('http');

const routes = require('./routes');

const server = http.createServer(routes);  // the http.createServer returns a server, so we need to store in a variable
    
server.listen(3000);