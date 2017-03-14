"use strict";

const ClientController = require('../controller/client-controller');

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

    }


}
