var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/www/index.html');
});

app.get('/button', function(req, res){
    res.sendFile(__dirname + '/www/button.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('edit-color', (value)=> {
        console.log('edit-color')
        io.emit('change-color', value)
    })
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});
