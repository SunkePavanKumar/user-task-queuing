const express = require("express");
const {rateLimiter} = require("../middleware/rateLimiter");
const taskQueue = require("../services/taskQueue");

const router = express.Router();

// health check

router.get("/health", (req, res)=>{
    res.status(200).json({
        message : "server is healthy"
    })
})

router.post("/task", rateLimiter, async(req, res)=>{

        const {user_id} = req.body;
        // add task to the queue
        taskQueue.addTask(user_id);
        res.status(200).json({
            message : "task received and queued successfully"
        })
  
})


module.exports = router;