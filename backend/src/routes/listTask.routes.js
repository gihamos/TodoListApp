const express = require("express");
const router = express.Router();
const validateWithJoi = require("../middlewares/validation.middleware");
const { createListShema,updatelistShema} = require("../dtos/list.dto");
const authenticate = require("../middlewares/authenticate.middleware");
const { listTaskController } = require("../controllers/listTask.controller");


router.post("/",authenticate,validateWithJoi(createListShema),listTaskController.create);
router.get("/",authenticate,listTaskController.getAllUserTask);
router.get("/sync/:id",listTaskController.syncListTask)
router.get("/tasks/:id",authenticate,listTaskController.getAllTaskOfListTask);
router.get("/close/:id",authenticate,listTaskController.closeTask);
router.delete("/:id",authenticate,listTaskController.deleleTask);
router.patch("/:id",authenticate,validateWithJoi(updatelistShema),listTaskController.updateTask);

module.exports = router;