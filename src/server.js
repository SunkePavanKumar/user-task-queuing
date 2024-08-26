const express = require("express");
const cluster = require("cluster");
const os = require("os");
const { PORT } = require("../config/index")
const taskRouter = require("./routes/taskRouter.js");
const errorHandler = require('./middleware/errorHandler');
const app = express();
const numsCpus = os.cpus().length;

if (cluster.isMaster) {
    for (let i = 0; i < numsCpus; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} died, starting new worker`);
        cluster.fork();
    });

} else {
    app.use(express.json());
    app.use("/api/v1", taskRouter);
    app.use(errorHandler);
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}, with worker ${process.pid}`);
    });

}





// Catch unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

module.exports = app;