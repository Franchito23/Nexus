import express from "express"
import { formLogin, formRegister, formResetPassword, register } from "../controllers/userController.js";

const router = express.Router(); 

//URL LIMPIAS

//------- TIPO GET ---------
router.get('/login', formLogin);
router.get('/register', formRegister);
router.get('/resetPassword', formResetPassword);

//------- TIPO POST ---------
router.post('/register', register);


export default router