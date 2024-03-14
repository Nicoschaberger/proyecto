export const checkAuth = (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/register');
    }
    next();
} 

export const checkExistingUser = (req, res, next) => {
    if(req.session.user){
        return res.redirect('/login');
    }
    next();
}

export const authorizeAdmin = (role) => {
    return async (req, res, next) => {
      if(req.session?.user?.rol !== role){
        return res.status(403).send({error: 'No permissions'});
      }
      next();
    }
  }

  export const authorizeUser = (req, res, next) => {
    if (req.session?.user?.rol !== "user" ) {
        return res.status(403).json({ error: 'No tienes permiso para acceder a esta funcionalidad.' });
    } else {
        next();
    }
};