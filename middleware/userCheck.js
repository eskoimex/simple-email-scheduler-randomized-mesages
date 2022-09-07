const { client } = require("../utils/redis.util");


checkIfUserExist = (req, res, next) => {
  let email = req.body.email;
  //MIDDLEWARE CHECK IF USER ALREADY EXIST
  client.keys("*", function(err, keys) {

   let check = keys.includes(email)
  if(check === true){
    res.render('adduser', {
         warning: 'User Already exist'
    });
     return;
  }
    next();

})

}
  const verifyUserExist = {
    checkIfUserExist: checkIfUserExist
  };
  
  module.exports = verifyUserExist;