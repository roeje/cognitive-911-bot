"use strict";

const ClientController = require('../controller/client-controller');
const UserController = require('../controller/user-controller');

module.exports = class ClientRoutes {
    static init(router) {
      router
         .route('/api/active-calls')
         .get(ClientController.getAllCalls)
         .delete(ClientController.deleteAllCalls);

      router
         .route('/api/create-call')
         .post(ClientController.createCall);

      router
         .route('/api/call-detail/:id')
         .get(ClientController.getCall)
         .delete(ClientController.deleteCall);

      router
         .route('/api/send-message/:message/:id')
         .post(ClientController.sendMessage);

      router
         .route('/api/login')
         .post(UserController.login);

      router
         .route('/api/logout')
         .post(UserController.logout);

      router
         .route('/api/register')
         .post(UserController.registerUser);

      router
         .route('/api/delete-user')
         .post(UserController.deleteUser);
    }


}
