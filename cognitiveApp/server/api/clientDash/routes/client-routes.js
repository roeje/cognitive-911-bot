"use strict";

const TodoController = require('../controller/client-controller');

module.exports = class ClientRoutes {
    static init(router) {
      router
        .route('/api/todos')
        .get(TodoController.getAll)
        .post(TodoController.createTodo);

      router
        .route('/api/todos/:id')
        .delete(TodoController.deleteTodo);
    }
}
