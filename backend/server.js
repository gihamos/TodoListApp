require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("./src/middlewares/logger.middleware");
const connectDB = require("./src/config/database.config");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  return res.status(200).json({
    message: "API todolist fonctionnelle ",
  });
});
app.use(logger);
app.use('/auth', require('./src/routes/auth.routes'));
app.use("/tasklist",require("./src/routes/listTask.routes"));
app.use("/task",require("./src/routes/task.routes"));

const PORT = process.env.API_PORT || 3000
const HOST=process.env.HOST|| "localhost"

connectDB();
app.listen(PORT, () => {
  console.log(`API démarrée sur : http://${HOST}:${PORT}`);
});
