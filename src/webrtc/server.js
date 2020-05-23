var express = require("express");
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");

const { ExpressPeerServer } = require('peer');

var app = express();
var root = __dirname + "/public";

// -------------------------------------------------------------
// SET UP EXPRESS
// -------------------------------------------------------------
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Parse application/json and application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

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
  path: '/volachat'
});

peerServer.on('connection', (client) => {
  console.log(client.id + ' connected')
});
peerServer.on('disconnect', (client) => {
  console.log(client.id + ' disconnected')
});

app.use('/', peerServer);