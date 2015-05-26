var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3001);

function handler (req, res) {
  var end = (req.url == '/') ? '/index.html' : req.url;
  console.log(end);

  fs.readFile(__dirname + end,
  function (err, data) {
    if (!err) {
      res.writeHead(200);
      res.end(data);
    }
  });
}

var host = false;
var users = 0;

io.on('connection', function(socket){
  var user = {
    id: ++users
  }

  if(host)
    host.emit('acesso', user);

  socket.on('host', function(msg) {
  	host = socket;
  });
  socket.on('mover', function(msg) {
  	if(host) {
      msg.user = user.id;
    	host.volatile.emit('mover', msg);
    }
  });
  socket.on('toque', function(msg) {
  	if(host) {
    	host.emit('toque', {
        user: user.id,
        tipo: msg.tipo
      });
    }
  });
  socket.on('slide', function(msg){
    if(host) {
      host.emit('slide', {
        user: user.id,
        tipo: msg.tipo
      });
    }
  });
  socket.on('zoom', function(msg){
    if(host) {
      host.emit('zoom', {
        user: user.id,
        tipo: msg.tipo
      });
    }
  });
  socket.on('view', function(msg){
    if(host) {
      host.emit('view', {
        user: user.id
      });
    }
  });
  socket.on('disconnect', function(msg){
    if(host)
      host.emit('saida', user.id);
  });
});