const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    todoStatus: {
        type: String
    }
},
    {
        timestamps: true
    },
)
module.exports = mongoose.model('Todo', todoSchema)