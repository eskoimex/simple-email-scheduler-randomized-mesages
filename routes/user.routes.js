const express = require('express');
const { viewRegistrationPage, registerNewUser, viewUsers, viewSearchPage, searchUser, deleteUser, sendUserMessages } = require('../controller/user.controller');
const { userCheck } = require("../middleware");

const router = express.Router();

router.get('/', viewRegistrationPage) // END POINT TO DISPLAY USER REGISTRATION PAGE
      .post('/', [userCheck.checkIfUserExist], registerNewUser) //END POINT TO REGISTER USER WITH MIDDLEWARE TO PREVENT DUPLICATION OF USERS

router.get('/users/view', viewUsers) //ENd POINT TO VIEW ALL USERS

router.get('/user/search', viewSearchPage) // ENPOINT TO DISPLAY SEARCH PAGE
      .post('/user/search', searchUser); //END POINT TO SEARCH USER BY EMAIL

router.delete('/user/delete/:id', deleteUser); //END POINT TO DELETE USER

router.get('/user/send_scheduled_messages', sendUserMessages); //END POINT TO SEND SCHEDULED MESSAGES TO ALL USERS

module.exports = {
    routes: router
}