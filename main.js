var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , api = require('./api.js');

app.listen(8000);

io.set('log level',1);

//map of needs, this will poplulate the needs being requested by the client
var need_cache = {};


//a map of need to api calls
var api_config = {
  'appointment' : api.findAppointment,
  'alert' : api.findAlerts,
};


function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    res.writeHead(200);
    res.end(data);

    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
  });
}

io.sockets.on('connection', function (socket) {
  
  socket.on("needs", function(data) {
    console.log("Recieved needs:", data);
    
    data.needs.forEach(function(need) {
      console.log(need);

      //check if need is being satisfied
      if (!need_cache[need]) {
      
        //create calls for need, and emit response on the data from the api
        console.log("Making calls for " +need);
        need_cache[need] = 1;
        api_config[need]({},function (err, data) {
          console.log("Fullfilling need:" +need);
          socket.emit(need, data);
          socket.broadcast.emit(need, data);
        });
      }
    });
  });

});
