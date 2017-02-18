"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const callSchema = require('../model/client-model');
const _ = require('lodash');

callSchema.statics.getAllCalls = () => {
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

const Call  = mongoose.model('Call', callSchema);

module.exports = Call;
