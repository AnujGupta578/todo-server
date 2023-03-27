var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    name: String,
    description: String,
    dueDate: { type: Date, default: Date.now },
    status: { type: String, default: "New" },
    inProgress: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false }
});

const task = mongoose.model('Task', taskSchema);
module.exports = task;