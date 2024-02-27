import { Router } from "express";
import { checkAuth, checkExistingUser } from "../middlewares/auth.js";
import { getUser, getUserLogin, getUserRegister } from "../controllers/login.controller.js";

const LoginRoutes = Router();

LoginRoutes.get('/', checkAuth, getUser);

LoginRoutes.get('/login', checkExistingUser, getUserLogin);

LoginRoutes.get('/register', checkExistingUser, getUserRegister);


export default LoginRoutes;