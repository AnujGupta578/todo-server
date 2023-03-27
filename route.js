var express = require('express');
var router = express.Router();
var { getAllTasks, saveTask, getAllByFilter, getTaskByID, updateTask, deleteTask } = require('./dbAPI');

// get all tasks
router.get('/tasks', function(req, res) {
    getAllTasks()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json(data);
        })
})

// save new task
router.post('/task/save', function(req, res) {
    let name = req.body.name;
    let description = req.body.description;
    let dueDate = new Date(req.body.dueDate);
    let status = req.body.status;
    let inProgress = req.body.inProgress;
    let isCompleted = req.body.isCompleted;

    let saveObject = { name, description, dueDate, status, inProgress, isCompleted };

    saveTask(saveObject)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json(data);
        });
})

// get all tasks inProgress
router.get('/task/inprogress', function(req, res) {
    getAllByFilter('inProgress')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json(data);
        })
})

// get all tasks completed
router.get('/task/completed', function(req, res) {
    getAllByFilter('isCompleted')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json(data);
        })
})

// update a task
router.put('/task/:id', function(req, res) {
    let taskID = req.params.id;
    let name = req.body.name;
    let description = req.body.description;
    let dueDate = new Date(req.body.dueDate);
    let status = req.body.status;
    let inProgress = req.body.inProgress;
    let isCompleted = req.body.isCompleted;
    let updateObject = {};

    if (name)
        updateObject['name'] = name;

    if (description)
        updateObject['description'] = description;

    if (dueDate)
        updateObject['dueDate'] = dueDate;

    if (status)
        updateObject['status'] = status;

    updateObject['inProgress'] = inProgress;

    updateObject['isCompleted'] = isCompleted;
    updateTask(taskID, updateObject)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json(data);
        });
})

// delete a task
router.delete('/task/:id', function(req, res) {
    let taskID = req.params.id;

    deleteTask(taskID)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json(data);
        });
})

// get task by task ID
router.get('/task/:id', function(req, res) {
    let taskID = req.params.id;
    getTaskByID(taskID)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json(data);
        })
})

module.exports = router