const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');

// Create Redis Client
let client = redis.createClient();

client.on('connect', function(){
  console.log('Connected to Redis...');
});

// Set Port
const port = 3000;

// Init app
const app = express();

// View Engine\
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// methodOverride
app.use(methodOverride('_method'));

// Search Page
app.get('/user/search', function(req, res, next){
  res.render('searchusers');
});

// Search processing
app.post('/user/search', function(req, res, next){
  let id = req.body.id;
  console.log(id)

  client.hgetall(id, function(err, obj){
    if(!obj){
      res.render('searchusers', {
        error: 'User does not exist'
      });
    } else {
      obj.id = id;
      console.log(obj)
      res.render('details', {
        user: obj
      });
    }
  });
});

// // Get all users email
app.get('/users/view', function(req, res, next){
 
var all_parts = {};
let users = []
client.keys("*", function(err, keys) {
  var count = keys.length;
  if (count == 0) {
    console.log('No User Found')
    //res.send('No User Found')
    res.render('users', {
      user: {}
    });
  }
 // let all_parts;
  keys.forEach( function(key) {
    client.hgetall(key, function(err, obj) {
      all_parts[key] = obj;
      --count;
      if (count <= 0) {
        users.push(all_parts)
        console.log("all_parts", all_parts);
        //res.send(users)
        res.render('users', {
          user: all_parts
        });
      } else {
        console.log('waiting');
        
      }
    });
  }); 
});
});


// Add User Page
app.get('/', function(req, res, next){
  res.render('adduser');
});

// Process Add User Page
app.post('/', function(req, res, next){
  let id =  Math.random().toString(16).substr(2, 8);
  let fullname = req.body.fullname;
  let email = req.body.email;
  

  client.hmset(id, [
    'fullname', fullname,
    'email', email,
  ], function(err, reply){
    if(err){
      console.log(err);
    }
    console.log("reply", reply);
    res.redirect('/');
  });
});

// Delete User
app.delete('/user/delete/:id', function(req, res, next){
  client.del(req.params.id);
  res.redirect('/');
});

app.listen(port, function(){
  console.log('Server started on port '+port);
});
