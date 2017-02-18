"use strict";

const ClientController = require('../controller/client-controller');

module.exports = class ClientRoutes {
    static init(router) {
      router
        .route('/api/active-calls/:id')
        .get(ClientController.getActiveCallers)
        .delete(ClientController.deleteActiveCaller);


      router
        .route('/api/call-details/:id')
        .get(ClientController.getCallDetails)
        .delete(ClientController.deleteCallDetails);

      router
         .route('/api/send-message/:message/:id')
         .post()



    }


}
