import {checkAuth, checkExistingUser} from '../middlewares/auth.js'


export const getUser = (checkAuth, (req, res) => {
    const {user} = req.session;
    res.render('index', user);
});

export const getUserLogin = (checkExistingUser, (req, res) => {
    res.render('login');
});

export const getUserRegister = (checkExistingUser, (req, res) => {
    res.render('register');
});
