"use strict";

const ClientDAO = require('../dao/client-dao');

module.exports = class ClientController {
  static getAll(req, res) {
      ClientDAO
         .getAll()
         .then(todos => res.status(200).json(todos))
         .catch(error => res.status(400).json(error));
  }

  static createTodo(req, res) {
      let _todo = req.body;

      ClientDAO
         .createTodo(_todo)
         .then(todo => res.status(201).json(todo))
         .catch(error => res.status(400).json(error));
  }

   static deleteTodo(req, res) {
      let _id = req.params.id;

      ClientDAO
         .deleteTodo(_id)
         .then(() => res.status(200).end())
         .catch(error => res.status(400).json(error));
  }
}
