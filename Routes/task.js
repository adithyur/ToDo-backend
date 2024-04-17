const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.post('/add', async (req, res) => {
    try {
        const { userid, task, createDate, dueDate } = req.body;
        const newTask = new Task({
            userid,
            task,
            createDate,
            dueDate
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/pending/:userid', async (req, res) => {
    const { userid } = req.params;
    //console.log('user id : ',userid)
    try {
      const pendingTasks = await Task.find({ userid, status: 'pending' }).select('task dueDate'); 
      res.status(200).json(pendingTasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/today/:userid', async (req, res) => {
    const { userid } = req.params;
    console.log('user id : ', userid);
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
  
      const tasks = await Task.find({
        userid,
        dueDate: { $gte: startOfDay, $lte: endOfDay }
      });
  
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.put('/statusupdate/:taskId', async (req, res) => {
    const { taskId } = req.params;
    try {
        // Update the task status to completed
        const task = await Task.findByIdAndUpdate(taskId, { status: 'completed' });
      
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
      
        res.status(200).json({ message: 'Task updated to completed status successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



  router.get('/completed/:userid', async (req, res) => {
    const { userid } = req.params;
    //console.log('user id : ',userid)
    try {
      const completedTasks = await Task.find({ userid, status: 'completed' }).select('task dueDate'); 
      res.status(200).json(completedTasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

module.exports = router;
