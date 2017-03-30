"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const userSchema = require('../model/user-model');
const _ = require('lodash');

userSchema.statics.loginUser = (userName) => {
    return new Promise((resolve, reject) => {
        let _query = {username: userName};

        User
          .find(_query)
          .exec((err, user) => {
              err ? reject(err)
                  : resolve(user);
          });
      });
}

userSchema.statics.logoutUser = (_) => {
    return new Promise((resolve, reject) => {
        let _query = {};

        User
          .findOne(_query)
          .exec((err, user) => {
              err ? reject(err)
                  : resolve(user);
          });
      });
}

userSchema.statics.createUser = (user) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(user))
          return reject(new TypeError('User is not a valid object.'));

      let _user = new User(user);

      _user.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

userSchema.statics.deleteUser = (userName) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(userName))
            return reject(new TypeError('Username is not a valid string.'));

        User
          .findOneAndRemove({username: userName})
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const User  = mongoose.model('User', userSchema);

module.exports = User;
