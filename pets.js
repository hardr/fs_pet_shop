'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    var index = process.argv[3];
    console.log(index);
    if (err) {
      throw err;
    } else if (index > JSON.parse(data).length -1 || index < 0) {
      console.error(`Usage: ${node} ${file} read INDEX`);
      process.exit(1);
    } else if (index !== undefined) {
      var pets = JSON.parse(data)[index];
      console.log(pets);
    } else {
      var pets = JSON.parse(data);
      console.log(pets);
    }
  });
} else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    var pets = JSON.parse(data);
    var pet = {
      age: process.argv[3],
      kind: process.argv[4],
      name: process.argv[5]
    };
    if (pet.age === undefined || pet.kind === undefined || pet.name === undefined) {
      console.error(`Usage: ${node} ${file} create AGE KIND NAME`);
      process.exit(1);
    }
    pets.push(pet);
    var petsJSON = JSON.stringify(pets);
    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      console.log(pet);
    });
  })
} else if (cmd === 'update') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    var pets = JSON.parse(data);
    var pet = {
      age: process.argv[3],
      kind: process.argv[4],
      name: process.argv[5]
    };
    if (pet.age === undefined || pet.kind === undefined || pet.name === undefined) {
      console.error(`Usage: ${node} ${file} create AGE KIND NAME`);
      process.exit(1);
    }
    // don't create a new key/value; find existing key/value and change
    pets.push(pet);
    var petsJSON = JSON.stringify(pets);
    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      console.log(pet);
    });
  })
  // get data from env
  // read the json file
  // parse it
  // if exists
    // update
    // write json
} else if (cmd === 'destroy') {

} else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
