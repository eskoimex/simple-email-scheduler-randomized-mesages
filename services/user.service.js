const { handleResSuccess } = require("../utils/success.util");
const { handleResError } = require("../utils/err.util");
const { client } = require("../utils/redis.util");
const { sendScheduledMessages } = require('../utils/sendUserEmail');
require('dotenv').config();

const registerUser = async (req, res, next) => {
 let err; 
  try { 
    let fullname = req.body.fullname;
    let email = req.body.email;
 
         client.hmset(email, [
              'fullname', fullname,
              'email', email,
            ], function(err, reply){
              if(err){
                handleResError(res, err, res.statusCode);
              }
              console.log("reply", reply);
              res.redirect('/users/view');

           });

    } catch (e) {
       console.log(e)
      handleResError(res, e, res.statusCode);
    }

};

const sendScheduledMessageToUsers = async (req, res, next) => {
  try { 

    // LOOP THROUGH USERS DATA IN THE CACHE
    client.keys("*", function(err, keys) {
        
      
      let users_email = keys //STORE USER ID(EMAILS) FROM THE REDIS IN-MEMORY CACHE IN AN ARRAY
      

      //CHECK IF USERS EXIST
      if(users_email.length === 0){
        res.render('users', {
          message: "No user found" 
        });
        return;
      }
 
    //SEND MESSAGES
      sendScheduledMessages(users_email, res, req)

  
  })
} catch (e) {
       console.log(e)
      handleResError(res, e, res.statusCode);
    }

};



const viewAllUsers = async (req, res, next) => {
try { 
        var users = {};
        //LOOP THROUGH ALL DATA IN THE CACHE
        client.keys("*", function(err, keys) {
          let count = keys.length;
          if (count == 0) {
            res.render('users', {
              message: 'No User found'
            });
          }

          //LOOP THROUGH USER DETAILS AND SEND TO THE FRONTEND
          keys.forEach( function(key) {
            client.hgetall(key, function(err, obj) {
              users[key] = obj;
              --count;
              if (count <= 0) {
                  res.render('users', {
                  user: users
                });
               }
            });
          }); 
        });
} catch (e) {
        console.log(e)
       handleResError(res, e, res.statusCode);
     }
 
 };

const searchUserById = async (req, res, next) => {
  try { 
    // GET THE ID(USER'S EMAIL) FROM THE BODY
    let id = req.body.id;
  
    //LOOP THROUGH THE CACHE AND FETCH USERS BY ID
    client.hgetall(id, function(err, obj){
      if(!obj){
        res.render('searchusers', {
          error: 'User does not exist'
        });
      } else {
        obj.id = id;
        res.render('details', {
          user: obj
        });
      }
    });
     } catch (e) {
        console.log(e)
       handleResError(res, e, res.statusCode);
}
 
 };

 const deleteUserById = async (req, res, next) => {
   try { 
    client.del(req.params.id);
     res.redirect('/users/view');
     } catch (e) {
        console.log(e)
       handleResError(res, e, res.statusCode);
     }
 
 };

module.exports = { registerUser, sendScheduledMessageToUsers, viewAllUsers, searchUserById, deleteUserById}