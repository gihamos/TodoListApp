const express = require("express");
const router = express.Router();
const validateWithJoi = require("../middlewares/validation.middleware");
const { createtaskSchema } = require("../dtos/task.dto");
const authenticate = require("../middlewares/authenticate.middleware");
const { taskController } = require("../controllers/task.controller");
const mongoIdShema = require("../dtos/mongoId.dto");

router.post("/",authenticate,validateWithJoi(createtaskSchema),taskController.create);
router.post("/checked/:id/:value",authenticate,validateWithJoi(mongoIdShema),taskController.checked);
router.post("/drop/:id",authenticate,validateWithJoi(mongoIdShema),taskController.drop);
module.exports = router;

