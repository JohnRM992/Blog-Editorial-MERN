import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
// Importacion de rutas
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'
import commentRoutes from './routes/comments.routes.js'
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGO).then(
    ()=> {console.log('Mongo DB está conectado')

    })
    .catch((err)=>{
        console.log(err);
    })


const __dirname = path.resolve();

const app = express();
app.use(cookieParser());

app.use(express.json());

app.listen(3000, ()=>{
    console.log('Servidor corriendo en puerto 3000')
});

app.use('/api/user' , userRoutes);
app.use('/api/auth' , authRoutes);
app.use('/api/post' , postRoutes);
app.use('/api/comment' , commentRoutes);

app.use(express.satatic(path.join(__dirname,'/client/dist')));

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname ,'client' , 'dist' , 'index.html'));
});

app.use((err, req,res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
    
});