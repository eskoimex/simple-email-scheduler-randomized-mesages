//IMPORT REDIS IN-MEMORY DATABASE
const redis = require('redis');

// Create Redis Client
let client = redis.createClient();

//Connect to Redis Client
client.on('connect', function(){
  console.log('Connected to Redis in-memory database.');
});

module.exports = { client }
