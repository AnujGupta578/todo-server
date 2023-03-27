const Task = require('./models/Task');

const getAllTasks = function() {
    return Task.find({})
        .then(data => {
            return { status: 'success', data }
        })
        .catch(error => {
            return { status: 'failed', msg: 'Failed to get all tasks', error: error.message }
        })
}

const getTaskByID = function(taskID) {
    return Task.findById(taskID)
        .then(data => {
            return { status: 'success', data }
        })
        .catch(error => {
            return { status: 'failed', msg: 'Failed to get task', error: error.message }
        })
}

const saveTask = function(saveObject) {
    let newTask = new Task(saveObject);

    return newTask.save()
        .then(saved => {
            return { status: 'success', msg: 'Saved to db', data: saved }
        })
        .catch(error => {
            return { status: 'failed', msg: 'Error saving to db', error: error.message }
        })
}

const updateTask = function(taskID, updateObject) {
    return Task.updateOne({ _id: taskID }, { $set: updateObject })
        .then(updated => {
            return { status: 'success', msg: 'Task Updated', data: updated }
        })
        .catch(error => {
            return { status: 'failed', msg: 'Error updating the task', error: error.message }
        })
}

const getAllByFilter = function(filterBy) {
    let filter = {};
    if (filterBy === 'isCompleted')
        filter = { isCompleted: true };
    else if (filterBy === 'inProgress')
        filter = { inProgress: true }

    return Task.find(filter)
        .then(data => {
            return { status: 'success', data }
        })
        .catch(error => {
            return { status: 'failed', msg: 'Failed to get all tasks', error: error.message }
        })
}

const deleteTask = function(taskID) {
    return Task.deleteOne({ _id: taskID })
        .then(response => {
            return { status: 'success', msg: 'Task Deleted', data: response }
        })
        .catch(error => {
            return { status: 'failed', msg: 'Error deleting the task', error: error.message }
        })
}

module.exports = { getAllTasks, saveTask, getAllByFilter, getTaskByID, updateTask, deleteTask };