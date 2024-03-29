import {Router} from 'express'
import passport from 'passport';
import { getCurrentUser, getSessionGithub, getSessionGithubCallback, postSession, postSessionLogin, postSessionPassword, postSessionRegister } from "../controllers/session.controller.js";

const sessionRoutes = Router();

sessionRoutes.post('/register', passport.authenticate("register", { failureRedirect: "/failregister" }), postSessionRegister);

sessionRoutes.post('/login', passport.authenticate("login", { failureRedirect: "/faillogin" }), postSessionLogin);

sessionRoutes.post('/logout', postSession);

sessionRoutes.post("/restore-password", postSessionPassword);

  sessionRoutes.get("/github", passport.authenticate("github", { scope: ["user:email"] }), getSessionGithub);
  
  sessionRoutes.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), getSessionGithubCallback);

  sessionRoutes.get('/current', getCurrentUser);


export default sessionRoutes;