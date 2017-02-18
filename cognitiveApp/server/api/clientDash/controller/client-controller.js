"use strict";

const ClientDAO = require('../dao/client-dao');

module.exports = class ClientController {
   static getAllCalls(req, res) {
      ClientDAO
         .getAllCalls()
         .then(calls => res.status(200).json(calls))
         .catch(error => res.status(400).json(error));
   }

   static createCall(req, res) {
      let _call = req.body;

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

   static getActiveCallers(req, res) {
      res.status(200).json({status: "Here are the active calls"})
      .catch(error => res.status(400).json(error));
   }

   static deleteActiveCaller(req, res) {
      let _id = req.params.id;
      res.status(200).json({status: "Here are the active calls"})
      .catch(error => res.status(400).json(error));
   }

   static deleteActiveCaller(req, res) {

   }

   static sendMessage(req, res) {
       let _id = req.params.id;
       let _message = req.params.message;
   }
}
