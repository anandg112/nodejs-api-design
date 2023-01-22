import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePasswords = (passwordSent, hash) => {
    return bcrypt.compare(passwordSent, hash)
}

export const hashPassword = (password) => {
     return bcrypt.hash(password, 5)
}

export const createJWT = (user) => {
    const token = jwt.sign({
        id: user.id, username: user.username},
        process.env.JWT_SECRET)
    return token
}

export const protectRoutes = (req, res, next) => {

    const bearer = req.headers.authorization

    if(!bearer) {
        res.status(401);
        res.send("Forbidden - not authorized");
        return;
    }

     const[, token] = bearer.split(" ");
     if(!token) {
        res.status(401);
        res.json()
     }

     try { 
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        console.log(user);
        next();
        return;
     } catch (e) {
        console.error(e);
        res.status(401);
        res.send({Message: "Not valid token"})
        return;
     }

}