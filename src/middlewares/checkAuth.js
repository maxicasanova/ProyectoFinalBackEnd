const checkAuth = (req, res, next) => {
    if (req.isAuthenticated() || req.session.user) {
        next()
    } else {
        // res.json({ status: 401, code: "invalid credentials" })
        if(req.path !== '/login') res.redirect('/user/login');
    }
}

const checkAuthAdmin = (req, res, next) => {
    if ((req.isAuthenticated() && req.user.role === "admin") || (req.session.user && req.session.user.role === "admin")) {
        next()
    } else {
        console.log(req.user)
        res.json({ status: 401, code: "invalid credentials" })
    }
}

export {checkAuth, checkAuthAdmin};