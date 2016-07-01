var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendfile('index.html');
});

io.on('connection', function(socket){
    console.log("connection");
    socket.emit('init',socket.id);
    socket.on('login', function(msg){
        try {
            var s=io.sockets.connected[msg].emit("login","ok");
        }catch(e)
        {
            console.log(e);
        }
    });


});
app.set('port', process.env.PORT || 3000);
var server = http.listen(app.get('port'), function() {
    console.log('start at port:' + server.address().port);
});