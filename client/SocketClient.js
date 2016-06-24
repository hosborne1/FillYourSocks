var net = require('net');
var maxClients = process.argv[4];
var HOST = process.argv[2];
var PORT = process.argv[3];
var clientCount = 0;
var clientsAwaitingConnectionConfirmation = 0;

createClient();

function createClient(){
   var client = new net.Socket();
    client.connect(PORT, HOST, function(){        
        var thisClient = clientCount;
        //console.log('CONNECTED TO: ' + HOST + ':' + PORT);
        // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
        client.write('I am clone number' + thisClient + "\n");
        clientCount++;
        clientsAwaitingConnectionConfirmation++;});

    client.on('data', function(data) {
    
        clientsAwaitingConnectionConfirmation = clientsAwaitingConnectionConfirmation - 1;
        console.log('outstanding clients: ' + clientsAwaitingConnectionConfirmation + "\n");
        if(clientCount < maxClients){
            createClient();
        }
    });

    client.on('close', function() {
        console.log('Connection closed');
    });
}
