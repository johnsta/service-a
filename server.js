var os = require('os');
var request = require('request');
var morgan = require('morgan');

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(require("morgan")("dev"));

// api ------------------------------------------------------------
app.get('/api', function (req, res) {
    res.send('Hello from service A running on ' + os.hostname());

    // TASK 4: Connect to redis container
    // var redis = require('redis').createClient(TODO_REDIS_PORT, TODO_REDIS_DOMAIN);
    
    // Increment requestCount each time API is called
    // redis.incr('requestCount', function (err, reply) {
    //     var requestCount = reply;
    // });
    
    // TASK 7: Invoke service-b
    // request(TODO_SERVICE_B_URL, function (error, response, body) {
    //     res.send('Hello from service A running on ' + os.hostname() + ' and ' + body);
    // });
    
});

// app.get('/metrics', function (req, res) {
//     var redis = require('redis').createClient(TODO_REDIS_PORT, TODO_REDIS_DOMAIN);
//     redis.get('requestCount', function (err, reply) {
//         res.send({ requestCount: reply });
//     });
// });


// application -------------------------------------------------------------
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');     // load the single view file (angular will handle the page changes on the front-end)
});

var port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log("Listening on port " + port);
});

