import express  from "express";
import {registerController, loginController} from '../controller/authController.js'

//router object
const router = express.Router();

// routing

router.post("/register", registerController);
router.post("/login", loginController);




export default router