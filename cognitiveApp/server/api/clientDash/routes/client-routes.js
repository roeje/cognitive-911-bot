"use strict";

const ClientController = require('../controller/client-controller');

module.exports = class ClientRoutes {
    static init(router) {
      router
         .route('/api/active-calls')
         .get(ClientController.getActiveCallers)
         .delete(ClientController.deleteActiveCallers);

      router
         .route('/api/create-call')
         .post(ClientController.sendMessage);

      router
         .route('/api/call-details/:id')
         .get(ClientController.getCallDetails)
         .delete(ClientController.deleteCall);

      router
         .route('/api/send-message/:message/:id')
         .post(ClientController.sendMessage);

    }


}
