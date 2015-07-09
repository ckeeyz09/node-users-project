var cors = require('cors')
var express = require("express");
var app = express();
app.use(cors())
var bodyParser = require('body-parser');
var _ = require('underscore');



// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());


var users = [
  {
    id: 0,
    firstname: "Susan",
    lastname: "Bones",
    age: 90
  },
  {
    id: 1,
    firstname: "Sean",
    lastname: "Hill",
    age: 25
  },
  {
    id: 2,
    firstname: "Bob",
    lastname: "Jones",
    age: 12
  }

];

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

app.get("/users", function (req, res) {
  res.json(users)
});

app.get("/users/:id", function (req, res) {
  for (i=0; i  <users.length; i++) {
    if (req.params.id == users[i].id) {
      res.json(users[i]);
    }
  }
});

app.post("/users", function (req, res) {
  var newUser = req.body;
  users.push(newUser);
  res.json(newUser);
});

app.put("/users/:id", function (req, res) {
  console.log("req.body: " + req.body);
  console.log("req.params: " + req.params)

  var userId = parseInt(req.params.id);
  var targetUser = _.findWhere(users, {id:userId});
  targetUser.firstname = req.body.firstname; 
  targetUser.lastname = req.body.lastname; 
  targetUser.age = req.body.age; 
  res.json(targetUser);
});

app.delete('/users/:id', function(req, res) {
  
  var delUser = parseInt(req.params.id);    // set the value of the id

    var targetUser = _.findWhere(users, {id: delUser}); // find item in `phrases` array matching the id
    var index = users.indexOf(targetUser);// get the index of the found item
    users.splice(index, 1);     // remove the item at that index, only remove 1 item  
    res.json(targetUser)      // send back deleted object
    

});

var server = app.listen(5000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Node-App Listening at http://%s:%s', host, port)

});
