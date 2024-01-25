import { Router } from "express";
import { checkAuth, checkExistingUser } from "../middlewares/auth.js";

const LoginRoutes = Router();

LoginRoutes.get('/', checkAuth, (req, res) => {
    const {user} = req.session;
    res.render('index', user);
});

LoginRoutes.get('/login', checkExistingUser, (req, res) => {
    res.render('login');
});

LoginRoutes.get('/register', checkExistingUser, (req, res) => {
    res.render('register');
});


export default LoginRoutes;