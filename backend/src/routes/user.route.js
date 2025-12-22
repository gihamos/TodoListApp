const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate.middleware");
const userController=require("../controllers/user.controller");
router.get("/",authenticate,userController.getUser)
router.patch("/",authenticate,userController.updateUser);