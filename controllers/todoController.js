
const Todo = require('../models/todoModel')

const todoData = async (req, res) => {

    const { title, description, todoStatus } = req.body

    const todoVal = new Todo({
        title,
        description,
        todoStatus
    })

    if (todoVal) {
        todoVal.save()
        return res.status(201).json({ success: true, message: 'Task Added' });

    }
}

const getTodoData = async (req, res) => {

    try {
        const todoTasks = await Todo.find()
        if (!todoTasks) {
            res.status(200).json({ success: false, message: "No Data Found" })

        } else {
            res.status(201).json({ success: true, message: 'getting todoTasks', todoTasks })
        }
    } catch (error) {
        console.log(error)

    }
}

const deleteTodoData = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
        res.status(200).json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const updateTodoData = async (req, res) => {
    const { id } = req.params;
    const { title, description, todoStatus } = req.body;
    console.log(req.body);
    console.log(id);
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { title, description, todoStatus },
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        return res.status(200).json({ success: true, message: "Task updated successfully", updatedTodo });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = { todoData, getTodoData, deleteTodoData, updateTodoData }