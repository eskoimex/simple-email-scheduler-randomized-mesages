const { handleResError } = require("../utils/err.util");
const { registerUser, 
       viewAllUsers, 
       searchUserById, 
       deleteUserById, 
       sendScheduledMessageToUsers} = require("../services/user.service");
const { validateRegistrationData } = require('../validators/user.validator');

// RENDER USER REGISTRATION PAGE
const viewRegistrationPage = async (req, res, next) => {    
  try { 
      res.render('adduser')
  } catch (e) {
        handleResError(res, e, res.statusCode);
  }
};

// CONTROL SERVICE TO REGISTER USER
const registerNewUser = async (req, res, next) => {    
      try { 
           let { err, value } = await validateRegistrationData(req.body); //VALIDATES USER REGISTRATION DATA
           if (err) handleResError(res, err, res.statusCode);
            await registerUser(req,res);
      } catch (e) {
            handleResError(res, e, res.statusCode);
      }
    };
    

    

// RENDER PAGE TO VIEW ALL USERS
const viewUsers = async (req, res, next) => {    
      try { 
            await viewAllUsers(req,res);
      } catch (e) {
            handleResError(res, e, res.statusCode);
      }
};


// RENDER PAGE TO SEACRH FOR USER
const viewSearchPage = async (req, res, next) => {    
  try { 
        res.render('searchusers');
  } catch (e) {
        handleResError(res, e, res.statusCode);
  }
};

// CONTROL SERVICE TO SEARCH FOR USERS BY ID
const searchUser = async (req, res, next) => {    
      try { 
            await searchUserById(req,res);
      } catch (e) {
            handleResError(res, e, res.statusCode);
      }
};


// CONTROLS SERVICE TO DELETE USER BY ID
const deleteUser = async (req, res, next) => {    
      let err;
      try { 
           if (err) handleResError(res, err, res.statusCode);
            await deleteUserById(req,res);
      } catch (e) {
            handleResError(res, e, res.statusCode);
      }
};


// CONTROL SERVICE TO SEND SCHEDULED MESSAGES TO ALL USERS
const sendUserMessages = async (req, res, next) => {    
      let err;
      try { 
           if (err) handleResError(res, err, res.statusCode);
            await sendScheduledMessageToUsers(req,res);
      } catch (e) {
            handleResError(res, e, res.statusCode);
      }
};


module.exports = { viewRegistrationPage, registerNewUser, viewUsers, viewSearchPage, searchUser, deleteUser, sendUserMessages}