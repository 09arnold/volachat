var express = require("express");
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");
const cors = require('cors');

const { ExpressPeerServer } = require('peer');
const SSE = require('express-sse');
const compression = require('compression');


var app = express();
const sse = new SSE();
var root = __dirname + "/public";


app.use(cors());
// -------------------------------------------------------------
// SET UP EXPRESS
// -------------------------------------------------------------
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// Parse application/json and application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(
  compression({
    filter: (req, res) => {
      if (res.getHeaders()["content-type"])
        !res.getHeaders()["content-type"].includes("text/event-stream")
    }
  })
);

// Simple logger
app.use(function (req, res, next) {
  console.log("%s %s", req.method, req.url, res.statusCode);
  console.log(req.body);
  console.log();
  next();
});

// Error handler
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

// Serve static files from directory
app.use(express.static(root));

// Open server on specified port
console.log("Starting Express server on port " + process.env.PORT || 9000);
const server = app.listen(process.env.PORT || 9000);

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/volachat',
  allow_discovery: true
});

peerServer.on('connection', (client) => {
  const user = client.id.split('_').slice(1, client.id.length - 1).join(' ')
  console.log(user + ' connected');
  sse.send(user, 'seating-update');
});
peerServer.on('disconnect', (client) => {
  const user = client.id.split('_').slice(1, client.id.length - 1).join(' ')
  console.log(user + ' disconnected');
  sse.send(user, 'seating-update');
});

app.use('/', peerServer);

app.get('/sse', sse.init);

app.get('/test', (req, res) => {
  res.send('hello');
  sse.send('yes', 'seating-update');
})