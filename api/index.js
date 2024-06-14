import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

// Importacion de rutas
import userRoutes from './routes/user.routes.js'


dotenv.config();

mongoose.connect(process.env.MONGO).then(
    ()=> {console.log('Mongo DB está conectado')

    })
    .catch((err)=>{
        console.log(err);
    })

const app = express();

app.listen(3000, ()=>{
    console.log('Servidor corriendo en puerto 3000')
});

app.use('/api/user' , userRoutes);
