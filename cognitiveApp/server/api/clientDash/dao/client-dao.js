"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const callSchema = require('../model/client-model');
const _ = require('lodash');

callSchema.statics.getAllCalls = () => {
    return new Promise((resolve, reject) => {
        let _query = {"sessionAttributes.closed": false};

        Call
          .find(_query)
          .sort({'sessionAttributes.PriorityValue': 1})
          .sort({'createdAt': 1})
          .exec((err, calls) => {
              err ? reject(err)
                  : resolve(calls);
          });
      });
}

callSchema.statics.getClosedCalls = () => {
    return new Promise((resolve, reject) => {
        let _query = {"sessionAttributes.closed": true};

        Call
          .find(_query)
          .sort({'sessionAttributes.PriorityValue': 1})
          .sort({'createdAt': 1})
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

callSchema.statics.getCallsByNumber = (number) => {
   return new Promise((resolve, reject) => {
      let _query = {"dialogAction.slots.Phone": number};
      if (!_.isString(number))
         return reject(new TypeError('Phone is not a valid string.'));

      Call
         .find(_query)
         .sort({'sessionAttributes.PriorityValue': 1})
         .sort({'createdAt': 1})
         .exec((err, call) => {
            err ? reject(err)
               : resolve(call);
         });
   });
}

callSchema.statics.getCallsByGroup = (group) => {
   return new Promise((resolve, reject) => {
      let _query = {"dialogAction.groupID": group, "sessionAttributes.closed": false};

      Call
         .find(_query)
         .sort({'sessionAttributes.PriorityValue': 1})
         .sort({'createdAt': 1})
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

callSchema.statics.closeCall = (id) => {
    return new Promise((resolve, reject) => {
        console.log("In DAO");
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Call
          .findOne({'_id': id}, function(err, call) {
             console.log(call);
             call.sessionAttributes.closed = true;
             call.save();
          })
         //  .findOneAndUpdate({_id: id}, {$set:{'sessionAttributes.closed': true}})
          .exec((err, updated) => {
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

const Call  = mongoose.model('Call', callSchema);

module.exports = Call;
