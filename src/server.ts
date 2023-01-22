import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from 'cors';
import { protectRoutes } from "./modules/auth";
import { createNewUser, signin } from "./handlers/users";

const app = express();

const customLogger = (message) => (req, res, next) =>{
    console.log(`Hello from ${message}`)
    next()
}

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(customLogger('custom logger'))


app.get("/", (req, res) =>{
    console.log("Hello from Express");
    res.status(200);
    res.json({message: 'hello'})
})

app.use('/api', protectRoutes, router);

app.use((err, req, res, next) => {
    if(err.type === "auth") {
        res.status(401).json({message: 'unauthorized'})
    } else if(err.type === 'input') {
        res.status(400).json({message: 'invalid input'})
    }  else {
        res.status(500).json({message: 'oops thats on us!'})
    }
})

app.post("/user", createNewUser);
app.post("/signin", signin)



export default app