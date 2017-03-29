"use strict";

const UserDAO = require('../dao/user-dao');
const moment = require('moment');
const faker = require('Faker');
const password = require('password-hash-and-salt');

module.exports = class UserController {

   static login(req, res) {
      let _username = req.body.userName;
      let _password = req.body.password;



      UserDAO
         .loginUser(_username)
         .then(function(user) {
            password(_password).verifyAgainst(user.token, function(error, success) {
               if(error) {
                  throw new Error('Error validating Password');
               }
               if(!success) {
                  res.status(200).json(user);
               } else {
                  res.status(200).json(null);
               }

            })

         })
         .catch(error => res.status(400).json(error));
   }

   static logout(req, res) {
      let _token  = req.body.token;

      UserDAO
         .logoutUser(_token)
         .then(user => res.status(200).json(user))
         .catch(error => res.status(400).json(error));
   }

   static registerUser(req, res) {
      let _username = req.body.userName;
      let _password = req.body.password;

      password(_password).hash(function(error, hash) {
         if (error)
            throw new Error('Error creating hash' + error);

         let _token = hash;
      });

      UserDAO
         .registerUser(_token, _username)
         .then(user => res.status(200).json(user))
         .catch(error => res.status(400).json(error));
   }




}
