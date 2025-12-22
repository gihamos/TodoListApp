const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validateWithJoi = require("../middlewares/validation.middleware");
const { signUpSchema, signInSchema, tokenSchema } = require("../dtos/auth.dtos");

// Utilisation du middleware Joi pour la vérification de données
router.post('/sign-up', validateWithJoi(signUpSchema), authController.SignUp);
router.post('/sign-in', validateWithJoi(signInSchema), authController.SignIn);
router.post("/refresh",validateWithJoi(tokenSchema),authController.refreshtoken);


module.exports = router;