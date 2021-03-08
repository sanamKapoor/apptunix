const routes = require('express').Router();
const { getTodos, getTodo, createTodo, updateTodo, deleteTodo } = require('../controllers');

routes.get('/*', getTodos);
// routes.get('/:id', getTodo);
routes.post('/create', createTodo);
routes.put('/update/:id', updateTodo);
routes.delete('/delete/:id', deleteTodo);

module.exports = routes;