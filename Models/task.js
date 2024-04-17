const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    userid: {
        type: String
    },
    task: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    dueDate: {
        type: Date,
        required: true
    }

});
module.exports = mongoose.model('task', taskSchema);