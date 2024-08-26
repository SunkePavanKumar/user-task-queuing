const express = require("express");
const cluster = require("cluster");
const os = require("os");
const { PORT } = require("../config/index")
const taskRouter = require("./routes/taskRouter");

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
    const app = express();
    app.use(express.json());
    app.use(taskRouter);
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}, with worker ${process.pid}`);
    });

}



