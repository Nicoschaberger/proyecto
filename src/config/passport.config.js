import passport from "passport";
import local from 'passport-local';
import { productsModel } from "../dao/models/products.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { Strategy as GithubStrategy } from "passport-github2";
import { Command } from "commander";
import { getVariables } from "./config.js";

const LocalStrategy = local.Strategy;

const program = new Command();
program.option('--mode <mode>', 'Modo de trabajo', 'development');
const options = program.parse();
const { adminName, adminPassword } = getVariables(options);


const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        {passReqToCallback: true, usernameField: 'email'},
        async (req, username, password, done) => {
            const {first_name, last_name, email, age} = req.body;
            try {
                const user = await productsModel.findOne({email: username});
                if(user){
                    console.log('User already exists');
                    return done(null, false);
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                }

                const result = await productsModel.create(newUser);
                return done(null, result);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use('login', new LocalStrategy(
        {usernameField: 'email'},
        async (username, password, done) => {
            try {
                let user

                if(username===adminName)
                {
                  if (password===adminPassword)
                    user = {first_name: "Coder", last_name: "Admin", email: username, password: createHash(password), rol:"Admin"}
                  else
                    return done(null, false)
                }
                else
                {
                    user = await productsModel.findOne({email: username});
                    if(!user){
                        return done(null, false);
                    }
                    if(!isValidPassword(user, password)){
                        return done(null, false);
                    }
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use('github', new GithubStrategy(
        {
            clientID: ' Iv1.fc92e6f98e8ef50d',
            callbackURL: 'http://localhost:8080/api/session/githubcallback',
            clientSecret: 'a0b59561ca617a0a72a06c30bb7531966ad3e3e9'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log({profile});
                const user = await productsModel.findOne({email: profile._json.email});
                if(!user){
                    const newUser = {
                        first_name: profile._json.name.split(' ')[0],
                        last_name: profile._json.name.split(' ')[1],
                        age: 18,
                        email: profile._json.email,
                        password: 'GithubGenerated'
                    }
                    const result = await productsModel.create(newUser);
                    return done(null, result);
                }
                return done(null, user);
            } catch (error) {
                
                return done(error);
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await productsModel.findOne({_id: id});
        done(null, user);
    });
}

export default initializePassport;