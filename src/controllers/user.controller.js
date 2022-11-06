import Response from "../libs/Response.js";
import { UserDto } from '../dtos/index.dto.js'
import passport from "passport";

const getLogged = (req, res) => {
    try {
        res.json(new Response({ status: "ok", user: new UserDto(req.session.user) }, "success getting logged status"))
    } catch {
        console.log("error getting logged status")
        res.status(500).json(new Response(null, "internal server error", true, 500))
    }
}

const logout = (req, res) => {
    const user = req.session.user;
    req.session.destroy((err) => {
        err ? res.json(new Response({ status: "logout error", error: err }, "logout error", true, err)) : res.json(new Response({ status: "ok", user: new UserDto(user) }, "success logging out"));
        return;
    })
}

const login = (req, res) => {
    passport.authenticate('login', (err, user, info) => {
        res.json(new Response(info, "login auth"))
    })(req, res)
}

const register = (req, res) => {
    const file = req.file;
    if (!file) {
        return res.json(new Response({ error: "please upload a profile pic" }, "error: please upload a profile pic", true, 400))
    }
    passport.authenticate('register', (err, user, info) => {
        res.json(new Response(info, "register auth"))
    })(req, res)
}


export default { getLogged, logout, login, register }