"use strict";

const ClientDAO = require('../dao/client-dao');
const moment = require('moment');
const faker = require('Faker');

module.exports = class ClientController {

   static getAllCalls(req, res) {
      ClientDAO
         .getAllCalls()
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
      _call.dialogAction.locationLat = '42.966732';
      _call.dialogAction.locationLong = '-85.886891';
      console.log(_call);
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
