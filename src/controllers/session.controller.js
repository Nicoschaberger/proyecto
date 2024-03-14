
import { userModel } from "../dao/models/user.model.js"
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import passport from 'passport';
import UserDTO from "../dao/dtos/user.dto.js";

export const getCurrentUser = (req, res) => {
    const user = new UserDTO(req.user);
    res.send(user.getCurrentUser());
}

export const postSessionRegister = (passport.authenticate("register", { failureRedirect: "/failregister" }), async (req, res)=> {
    res.status(201).send({ message: "Usuario Registrado" });
  }
);

export const postSessionLogin = (passport.authenticate("login", { failureRedirect: "/faillogin" }), async (req, res) =>  {
    if(!req.user){
        return res.status(400).send({message: 'Error de credenciales'});
    }
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }
    res.redirect('/');
});

export const postSession = async(req, res) => {
    try {
        req.session.destroy((err) => {
            if(err){
                return res.status(500).json({message: 'El logout fallo'});
            }
        });
        res.send({redirect: 'http://localhost:8080/login'});
    } catch (error) {
        res.status(400).send({error});
    }
};

export const postSessionPassword = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(401).send({ message: "No autorizado" });
      }
      user.password = createHash(password);
      await user.save();
      res.send({ message: "Password creada" });
    } catch (error) {
      console.error(error);
      res.status(400).send({ error });
    }
  };

  export const getSessionGithub = (passport.authenticate("github", { scope: ["user:email"] }), (req, res) => {

  });
  
  export const getSessionGithubCallback = (passport.authenticate("github", { failureRedirect: "/login" }), (req, res) => {
      req.session.user = req.user;
      res.redirect("/");
  });
