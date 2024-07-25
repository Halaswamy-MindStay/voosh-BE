const { todoData, getTodoData, deleteTodoData, updateTodoData } = require('../controllers/todoController');

const route = require('express').Router()

route.post('/addTodo', todoData)
route.get('/getTodo', getTodoData)
route.delete('/deleteTodo/:id', deleteTodoData);
route.put('/updateTodo/:id', updateTodoData);

module.exports = route;