var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var onlineUsers = 0;
var visitorCount = {};

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/v1/stats', function(req, res) {
  var payload = {
    online_users: onlineUsers,
    visitor_count: visitorCount
  };

  res.json(payload);
});

io.on('connection', function(socket){
  ++onlineUsers;
  io.emit('count', onlineUsers);

  var today = new Date().toJSON().slice(0,10);
  var todayData = visitorCount[today];

  if (todayData != undefined) {
    visitorCount[today].count++;
  } else {
    visitorCount[today] = {
      count: 1
    };
  }

  socket.on('disconnect', function() {
    --onlineUsers;
    io.emit('count', onlineUsers);
  });
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});
