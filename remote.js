var socket = io('http://localhost:3001');

var users = [];

var elemAtual;
var medida = window.innerWidth/45;
var centroX = window.innerWidth/2;
var centroY = window.innerHeight/2;

window.addEventListener('resize',function() {
  medida = window.innerWidth/45;
  centroX = window.innerWidth/2;
  centroY = window.innerHeight/2;          
},false);

socket.on('acesso', function(obj){
  users[obj.id] = {
    toque: false,
    coord: false
  }
});

socket.on('saida', function(user){
  if(users[user]) {
    document.body.removeChild(users[user].elem);
  }
});

socket.on('mover', function(obj){
  if(users[obj.user] && users[obj.user].elem) {
    var x = Math.round(centroX + obj.x*medida);
    var y = Math.round(centroY + obj.y*medida);

    var elem = users[obj.user].elem;
    elem.style.left = x + 'px';
    elem.style.top = y + 'px';
  }
});
socket.on('toque', function(obj){
	if(obj.tipo) {
		if(users[obj.user].elem) document.body.removeChild(users[obj.user].elem);

		var elem = document.createElement('div');
        elem.className = 'bola';
        elem.style.left = centroX + 'px';
        elem.style.top = centroY + 'px';
        document.body.appendChild(elem);
        users[obj.user].elem = elem;
    }
    else {
		document.body.removeChild(users[obj.user].elem);
		users[obj.user].elem = undefined;
	}
});
socket.on('slide', function(obj){
  switch(obj.tipo) {
    case 1:
      Reveal.left();
      break;
    case 2:
      Reveal.right();
      break;
    case 3:
      Reveal.up();
      break;
    case 4:
      Reveal.down();
      break;
  }
});
socket.on('zoom', function(obj){
  if(obj.tipo) {
    zoom.to({
      scale: 1.5,
      x: window.innerWidth/2,
      y: window.innerHeight/2
    });    
  } else
    zoom.out();
});

socket.on('view', function(obj){
	Reveal.toggleOverview();
});

socket.emit('host', true);