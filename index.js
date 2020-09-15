import express from "express";
import morgan from "morgan";
import sql from "mssql";
const app=express();
import path from 'path';
import cors from 'cors';
import history from 'connect-history-api-fallback';
import compression from 'compression';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser'
import methodOverride from 'method-override';

// Settings
app.set('port',process.env.PORT || 4000)
//middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(bodyParser.json());
app.use(methodOverride());
//routes
app.use('/api/afiliado/', require('./src/routes/afiliado'));
app.use('/api/citas/', require('./src/routes/citas'));
app.use('/api/ccitas/', require('./src/routes/ccitas'));
app.use('/api/servicios/', require('./src/routes/servicios'));
app.use('/api/contratos/', require('./src/routes/contratos'));
app.use('/api/ciudades/', require('./src/routes/ciudades'));
app.use('/api/contrasena/',require('./src/routes/contraseña'));
app.use('/api/correo/',require('./src/routes/correo'));
app.use('/api/login/',require('./src/routes/login'))
//middleweres for vue 
app.use(history());
//static files
app.use(express.static(path.join(__dirname, 'public')));
//server is litening
app.listen(app.get('port'),()=>{
    console.log("server on port ",app.get('port'));
});
