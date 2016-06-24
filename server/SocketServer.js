var net = require('net');

var HOST = '0.0.0.0';
var PORT = process.argv[2];

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
var server = net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    server.getConnections(function(err,count){console.log('connection count: ' + count)})
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        
        //console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('You said "' + data + '"');
        
    });

 sock.on('error', errorHandler);

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        //console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
});
//.listen(PORT,HOST,100000);


server.listen(PORT,HOST);

//server.listen({
//  host: HOST,
//  port: PORT,
//  backlog: 10000,
//  exclusive: true
//});

 function errorHandler(err) {
        console.log(err.code);       
    }

console.log('Server listening on ' + HOST +':'+ PORT);