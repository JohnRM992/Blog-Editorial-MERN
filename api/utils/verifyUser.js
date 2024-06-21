import jwt from 'jsonwebtoken';
import {errorHandler} from './error.js';
import dotenv from 'dotenv'

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return next(errorHandler(401,'Sin autorización'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err,user)=>{
        if(err){
            return next(errorHandler(401,'Sin autorización'))
        }
        req.user = user;  
        next();
    });
}

