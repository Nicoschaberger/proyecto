import { Router } from "express";
import passport from 'passport';
import { getSessionGithub, getSessionGithubCallback, postSession, postSessionLogin, postSessionPassword, postSessionRegister } from "../controllers/session.controller.js";

const sessionRoutes = Router();

sessionRoutes.post(passport.authenticate("register", { failureRedirect: "/failregister" }), postSessionRegister);

sessionRoutes.post('/login', passport.authenticate("login", { failureRedirect: "/faillogin" }), postSessionLogin);

sessionRoutes.post('/logout', postSession);

sessionRoutes.post("/restore-password", postSessionPassword);

  sessionRoutes.get("/github", passport.authenticate("github", { scope: ["user:email"] }), getSessionGithub);
  
  sessionRoutes.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), getSessionGithubCallback);

export default sessionRoutes;