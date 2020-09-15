import config from "./config";
import sql from "mssql";
import express from "express";
import jwt from 'jsonwebtoken';
const router=express.Router();
router.use((req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, 'Clinica2020', (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;   
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });
router.get("/:id", async (req,res)=>{
    const id=req.params.id;
    try {
        config.close();
        config.connect()
        .then(()=>{
              config.request().query("EXEC SPKWEB_AFI '"+id+"','','','','','','','','','','','','','','','','',1",function(err,recordset){
                if (err) console.log(err);
                res.json(recordset.recordset);
                config.close();            
            });
        })
    } catch (error) {
        return res.status(400).json({mensaje:'ocurrio un error',error});
    }
    
});
router.post("/crear/", async (req,res)=>{
    try {
        config.close();
        var body=req.body;    
        config.connect()
        .then(()=>{
             config.request().query("EXEC SPKWEB_AFI '"+body.id+"','"+body.cc+"','"+body.nombrep+"','"+body.nombrese+"','"+body.apellidop+"','"+body.apellidose+"','"+body.telefono+"','"+body.sexo+"','"+body.dirreccion+"','"+body.fecha+"','"+body.eps+"','"+body.plan+"','"+body.grup_san+"','"+body.nivel+"','"+body.ciudad+"','"+body.email+"','"+body.password+"',2",function(err){
                if (err) console.log(err);
                res.json('guardado');
                config.close();            
            });
        })
    } catch (error) {
        return res.status(400).json({mensaje:'ocurrio un error',error}); 
    }
    
});
router.put("/editar/:id", async (req,res)=>{
    try {
        config.close();
        var body=req.body;   
        config.connect()
        .then(()=>{
             config.request().query("EXEC SPKWEB_AFI '"+body.id+"','"+body.cc+"','"+body.nombrep+"','"+body.nombrese+"','"+body.apellidop+"','"+body.apellidose+"','"+body.telefono+"','"+body.sexo+"','"+body.dirreccion+"','"+body.fecha+"','"+body.eps+"','"+body.plan+"','"+body.grup_san+"','"+body.nivel+"','"+body.ciudad+"','"+body.email+"','"+body.password+"',3",function(err){
                if (err) console.log(err);
                res.json('modificado correctamente');
                config.close();            
            });
        })
    } catch (error) {
        return res.status(400).json({mensaje:'ocurrio un error',error});
    }
    
});
router.delete("/quitar/:id", async (req,res)=>{
    try {
        config.close();
        config.connect()
        .then(()=>{
             config.request().query("EXEC SPKWEB_AFI '"+req.body.IDAFILIADO+"','"+req.body.TIPO_DOC+"','"+req.body.PNOMBRE+"','"+req.body.SNOMBRE+"','"+req.body.PAPELLIDO+"','"+req.body.SAPELLIDO+"','"+req.body.TELEFONORES+"','"+req.body.SEXO+"','"+req.body.DIRECCION+"','"+req.body.FNACIMIENTO+"','"+req.body.IDADMINISTRADORA+"','"+req.body.IDPLAN+"',4",function(err){
                if (err) console.log(err);
                res.json('eliminando');
                config.close();            
            });
        })
    } catch (error) {
        return res.status(400).json({mensaje:'ocurrio un error',error});
    }
    
});


module.exports=router;