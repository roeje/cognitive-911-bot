"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const userSchema = require('../model/user-model');
const _ = require('lodash');

userSchema.statics.login = (username) => {
    return new Promise((resolve, reject) => {
        let _query = {username: username};

        Call
          .find(_query)
          .exec((err, calls) => {
              err ? reject(err)
                  : resolve(calls);
          });
      });
}

userSchema.statics.login = (_) => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Call
          .find(_query)
          .exec((err, calls) => {
              err ? reject(err)
                  : resolve(calls);
          });
      });
}

callSchema.statics.getCall = (id) => {
   return new Promise((resolve, reject) => {
      if (!_.isString(id))
         return reject(new TypeError('Id is not a valid string.'));

      Call
         .findById(id)
         .exec((err, call) => {
            err ? reject(err)
               : resolve(call);
         });
   });
}

callSchema.statics.createCall = (call) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(call))
          return reject(new TypeError('Call is not a valid object.'));

      let _call = new Call(call);

      _call.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

callSchema.statics.deleteCall = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Call
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

callSchema.statics.deleteAllCalls = () => {
   return new Promise((resolve, reject) => {

      let _query = {};

      Call
         .remove(_query)
         .exec((err, deleted) => {
            err ? reject(err)
               : resolve();
         });
   });
}

const User  = mongoose.model('User', userSchema);

module.exports = User;
