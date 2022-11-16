import { checkAuth } from "../middlewares/checkAuth.js";
import dotenv from 'dotenv';
import express from "express";
import upload from "../multer.js";
import { userController } from "../controllers/index.controller.js";

dotenv.config();
const userRouter = express.Router();

const {getLogged, logout, login, register} = userController;

/* routing */

userRouter.get("/logged", checkAuth, getLogged);

userRouter.get("/logout", logout);

userRouter.post("/login", login);

userRouter.get("/login", (req, res) => res.render('login', {}));

userRouter.post("/register", upload.single("avatar"), register);

userRouter.get('/register', (req, res) => { res.render('register', {}) });

userRouter.get('/faillogin', (req, res) => { res.render('faillogin', {}) });

userRouter.get('/failsignup', (req, res) => { res.render('failsignup', {}) });


export default userRouter;