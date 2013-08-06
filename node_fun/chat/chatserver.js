// telnet 127.0.0.1 9000

var net = require('net'),
    chatServer = net.createServer(),
    clientList = [];

chatServer.on('connection', function(client) {
  client.name = client.remoteAddress + ':' + client.remotePort;
  client.write('Hi ' + client.name + '!\n')
  
  clientList.push(client);
  
  client.on('data', function(data) {
    broadcast(data, client);   
  })
  
  client.on('end', function() {
    clientList.splice(clientList.indexOf(client), 1);
  })
})

function broadcast(message, client) {
  var cleanup = []
  for (var i=0; i < clientList.length; i+=1) {
    if (client != clientList[i]) {
      if (clientList[i].writable) {
        clientList[i].write(client.name + " says " + message)
      } else {
        cleanup.push(clientList[i]);
        clientList[i].destroy();
      }
    }
  }
}

chatServer.listen(9000);