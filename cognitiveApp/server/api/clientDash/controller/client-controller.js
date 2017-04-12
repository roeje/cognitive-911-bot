"use strict";

const ClientDAO = require('../dao/client-dao');
const moment = require('moment');
const faker = require('Faker');
const _ = require('underscore');

module.exports = class ClientController {

   static getAllCalls(req, res) {
      ClientDAO
         .getAllCalls()
         .then(calls => res.status(200).json(calls))
         .catch(error => res.status(400).json(error));
   }

   static getAllCallGroups(req, res) {
      ClientDAO
         .getAllCalls()
         .then(function(calls){
            var used = [];
            var groups = [];

            _.each(calls, function(call) {
               if (!_.contains(used, call._id)) {
                  var new_group = []
                  new_group.push(call);
                  used.push(call._id);
                  _.each(calls, function(c){
                     // console.log(_.contains(used, c._id));
                     if (!_.contains(used, c._id)) {
                        // var time_one = moment(call.createdAt);
                        // var time_two = moment(c.createAt);
                        // var within_15 = (time_one.add(15, 'm').isBefore(time_two) && time_one.subtract(15, 'm').is)
                        var match = _.intersection(call.sessionAttributes.DuplicationKeywords, c.sessionAttributes.DuplicationKeywords);
                        if (match.length >= 2) {
                           new_group.push(c);
                           used.push(c._id);
                        }
                     }
                  })
                  groups.push(new_group);
               }
            });

            res.status(200).json(groups)
         })
         .catch(error => res.status(400).json(error));
   }

   static getGroupForCall(req, res) {
      let _id = req.params.id;
      ClientDAO
         .getAllCalls()
         .then(function(calls){
            var used = [];
            var group = [];
            _.each(calls, function(call) {
               if (call._id == _id) {
                  used.push(call._id);
                  _.each(calls, function(c){
                     // console.log(_.contains(used, c._id));
                     if (!_.contains(used, c._id)) {
                        // var time_one = moment(call.createdAt);
                        // var time_two = moment(c.createAt);
                        // var within_15 = (time_one.add(15, 'm').isBefore(time_two) && time_one.subtract(15, 'm').is)
                        var match = _.intersection(call.sessionAttributes.DuplicationKeywords, c.sessionAttributes.DuplicationKeywords);
                        if (match.length >= 2) {
                           group.push(c);
                           used.push(c._id);
                        }
                     }
                  });
               }
            });
            res.status(200).json(group)
         })
         .catch(error => res.status(400).json(error));
   }

   static getClosedCalls(req, res) {
      ClientDAO
         .getClosedCalls()
         .then(calls => res.status(200).json(calls))
         .catch(error => res.status(400).json(error));
   }

   static getCallsByGroup(req, res) {
      let _groupID = req.params.groupID
      ClientDAO
         .getClosedCalls(_groupID)
         .then(calls => res.status(200).json(calls))
         .catch(error => res.status(400).json(error));
   }

   static getCallsByNumber(req, res) {
      let _number = req.params.number
      ClientDAO
         .getCallsByNumber(_number)
         .then(calls => res.status(200).json(calls))
         .catch(error => res.status(400).json(error));
   }

   static getCall(req, res) {
      let _id = req.params.id;
      ClientDAO
         .getCall(_id)
         .then(call => res.status(200).json(call))
         .catch(error => res.status(400).json(error));
   }

   static createCall(req, res) {
      let _call = req.body;
      _call.dialogAction.firstName = faker.Name.firstName();
      _call.dialogAction.lastName = faker.Name.lastName();
      _call.dialogAction.date = moment().format('MM DD YYYY');
      _call.dialogAction.dateFormatted = moment().format('dddd, MMMM Do YYYY');
      _call.dialogAction.startTime = moment().format('h:mm:ss a');
      _call.dialogAction.endTime = moment().add(2, 'm').add(23, 's').format('h:mm:ss a');
      _call.dialogAction.locationCity = 'Allendale';
      _call.dialogAction.locationState = "MI";
      _call.dialogAction.locationSpecific = 'Mackinac Hall';
      _call.dialogAction.locationLat = faker.Address.latitude();
      _call.dialogAction.locationLong = faker.Address.longitude();
      _call.dialogAction.transcript = faker.Lorem.paragraph();      
      ClientDAO
         .createCall(_call)
         .then(call => res.status(201).json(call))
         .catch(error => res.status(400).json(error));
   }

   static deleteCall(req, res) {
      let _id = req.params.id;

      ClientDAO
         .deleteCall(_id)
         .then(() => res.status(200).end())
         .catch(error => res.status(400).json(error));
   }

   static closeCall(req, res) {
      let _id = req.params.id;

      ClientDAO
         .closeCall(_id)
         .then(() => res.status(200).end())
         .catch(error => res.status(400).json(error));
   }

   static deleteAllCalls(req, res) {
      ClientDAO
         .deleteAllCalls()
         .then(() => res.status(200).end())
         .catch(error => res.status(400).json(error));
   }

   static getActiveCallers(req, res) {
      res.status(200).json({status: "Here are the Active Callers"});
   }

   static deleteActiveCallers(req, res) {
      let _id = req.params.id;
      res.status(200).json({status: "Active Caller Deleted"});
   }

   static getCallDetails(req, res) {
      let _id = req.params.id;
      res.status(200).json({status: "Here are the Call Details"});
   }

   static deleteCallDetails(req, res) {
      let _id = req.params.id;
      res.status(200).json({status: "Call Details Deleted"});

   }

   static sendMessage(req, res) {
      let _id = req.params.id;
      let _message = req.params.message;
      res.status(200).json({status: "Message Sent"});
   }

}

// buildCallData = function(data) {
//    data.dialogAction.firstName = faker.Name.firstName();
//    data.dialogAction.lastName = faker.Name.lastName();
//    data.dialogAction.date = moment().format('MM DD YYYY');
//    data.dialogAction.dateFormatted = moment().format('dddd, MMMM Do YYYY');
//    data.dialogAction.startTime = moment().format('h:mm:ss a');
//    data.dialogAction.endTime = moment().add(2, 'm').add(23, 's').format('h:mm:ss a');
//    data.dialogAction.locationCity = 'Allendale';
//    data.dialogAction.locationState = "MI";
//    data.dialogAction.locationSpecific = 'Mackinac+Hall';
//    data.dialogAction.locationLat = '42.966732';
//    data.dialogAction.locationLong = '-85.886891';
//    return data;
// }
