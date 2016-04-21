var os = require('os');
var request = require('request');
var morgan = require('morgan');
var Redis = require('redis');

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(require("morgan")("dev"));

// api ------------------------------------------------------------
app.get('/api', function (req, res) {
    res.send('Hello from service A running on ' + os.hostname());

    // request(process.env.SERVICE_B_MASTER_URL, function (error, response, body) {
    //     res.send('Hello from service A running on ' + os.hostname() + ' and ' + body);
    // });
    
    //var redis = Redis.createClient(6380, 'johnstaredis.redis.cache.windows.net', { auth_pass: 'lJxVLa0TanGJz8i204ku0ZT2zztznOReVmJbcxm5w10=', tls: { servername: 'johnstaredis.redis.cache.windows.net' } });
    var myredis = require("url").parse(process.env.MYREDIS_URL);
    var redis = Redis.createClient(myredis.port, myredis.hostname);
    console.log('myredis hostname ' + myredis.hostname + ", port " + myredis.port);
    var requestCount;
    redis.incr('requestCount', function (err, reply) {
        requestCount = reply;
    });
});

app.get('/metrics', function (req, res) {
    var redis = Redis.createClient(6380, 'johnstaredis.redis.cache.windows.net', { auth_pass: 'lJxVLa0TanGJz8i204ku0ZT2zztznOReVmJbcxm5w10=', tls: { servername: 'johnstaredis.redis.cache.windows.net' } });
    redis.get('requestCount', function (err, reply) {
        res.send({ requestCount: reply });
    });
});



// application -------------------------------------------------------------

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');     // load the single view file (angular will handle the page changes on the front-end)
});

var port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log("Listening on port " + port);
});













//var io = require('socket.io')(server);

// io -------------------------------------------------------------

// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// io.on('connection', function(socket) {
//     console.log('a user connected');

//     socket.on('greet', function(times) {
//         console.log("received greeting");

//         if (times <= 0 || times > 100) {
//             times = 1;
//         }

//         var i = 0;
//         var stop = setInterval(function() {
//             //var serviceToCall = process.env.SERVICE_B_MASTER_URL + getRandomInt(0, 0);
//             var serviceToCall = process.env.SERVICE_B_MASTER_URL;
//             request(serviceToCall, function(error, response, body) {
//                 io.emit('hello', {
//                     message: body,
//                     timestamp: Date.now()
//                 });
//                 console.log("emitted hello from " + serviceToCall + ", who said: " + body);
//             });
//             i++;
//             if (i >= times) {
//                 clearInterval(stop);
//             }
//         }, 100);

//     });
// });


// io.on('connection', function(socket) {
//   console.log('new connection');

//   socket.on('add-customer', function(customer) {
//     io.emit('notification', {
//       message: 'new customer',
//       customer: customer
//     });
//   });
// });

// server.listen(4000, function() {
//   console.log('server up and running at 4000 port');
// });