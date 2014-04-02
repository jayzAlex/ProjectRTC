module.exports = function(socket, client) {
  var streams = require('./app/streams.js');

  console.log('-- ' + client.id + ' joined --');
  client.emit('id', client.id);

  client.on('message', function (details) {
    var otherClient = socket.sockets[details.to];

    if (!otherClient) {
      return;
    }
      delete details.to;
      details.from = client.id;
      otherClient.emit('message', details);
  });
    
  client.on('readyToStream', function(options) {
    console.log('-- ' + client.id + ' is ready to stream --');
    
    streams.addStream(client.id, stream, options.privacy); 
  });
  
  client.on('rate', function(rating) {
    streams.rate(rating.id, client.id, rating.points);
  });
  
  client.on('update', function(options) {
    streams.update(client.id, options.name, options.privacy);
  });

  function leave() {
    console.log('-- ' + client.id + ' left --');
    streams.removeStream(client.id);
  }

  client.on('disconnect', leave);
  client.on('leave', leave);
};