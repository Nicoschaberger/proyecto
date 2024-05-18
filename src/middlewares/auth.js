import { userModel } from "../dao/models/user.model.js";
import { isValidPassword } from "../utils/bcrypt.js";

export const checkAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}

export const checkExistingUser = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/products');
    }
    next();
}

export const checkLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (!user || !isValidPassword(user, password)) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
    }
}

export const authorizeAdmin = (req, res, next) => {
    if (req.session?.user?.rol !== "admin" ) {
        return res.status(403).json({ error: 'No tienes permiso para acceder a esta funcionalidad.' });
    } else {
        next();
    }
};

export const authorizeAdminAndPremium = (req, res, next) => {
    if (req.session?.user?.rol === "admin" || req.session?.user?.rol === "premium" ) {
        next();
    } else {
        return res.status(403).json({ error: 'No tienes permiso para acceder a esta funcionalidad.' });
    }
};

export const authorizeUserAndPremium = (req, res, next) => {
    if (req.session?.user?.rol === "user" || req.session?.user?.rol === "premium" ) {
        next();
    } else {
        return res.status(403).json({ error: 'No tienes permiso para acceder a esta funcionalidad.' });
    }
};

export const authorizeUser = (req, res, next) => {
    if (req.session?.user?.rol !== "user" ) {
        return res.status(403).json({ error: 'No tienes permiso para acceder a esta funcionalidad.' });
    } else {
        next();
    }
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id); // Asegúrate de tener el ID del usuario en `req.user`
  if (user && user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Acceso denegado' });
  }
};


