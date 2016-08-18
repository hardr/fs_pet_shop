'use strict';

var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var http = require('http');
var port = process.env.PORT || 8000;

var fs = require('fs');

var server = http.createServer(function(req, res) {
  if (req.method === 'GET' && req.url.includes('pets')) {
    fs.readFile(petsPath, 'utf8', function(err, data) {
      var index = parseInt(req.url.split('/')[2]);
      if (err) {
        throw err;
      } else if (Number.isNaN(index)) {
        var pets = JSON.parse(data);
        var petsJSON = JSON.stringify(pets);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(petsJSON);
      } else if (!Number.isNaN(index) && index >= 0 && index < req.url.split('/').length) {
        var pets = JSON.parse(data);
        var petsJSON = JSON.stringify(pets[index]);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(petsJSON);
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not found i');
      }
    })
  } else if (req.method === 'POST' && req.url.includes('pets')) {
    var body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = JSON.parse(Buffer.concat(body).toString());
      body.age = parseInt(body.age);
      // at this point, `body` has the entire request body stored in it as a string
      if (Number.isNaN(body.age) || body.kind.length < 1 || body.name < 1) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Bad request');
      } else {
        fs.readFile(petsPath, 'utf8', function(err, data) {
          if (err) {
            throw err;
          }
          var pets = JSON.parse(data);
          pets.push(body);
          var petsJSON = JSON.stringify(pets);
          var bodyJSON = JSON.stringify(body);
          fs.writeFile(petsPath, petsJSON, function(writeErr) {
            if (writeErr) {
              throw writeErr;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(bodyJSON);
          });
        })
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found o');
  }
})

server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
