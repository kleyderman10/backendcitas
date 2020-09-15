import config from "./config";
import sql from "mssql";
import express from "express";
import format from 'dateformat'
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

router.get("/", async (req,res)=>{
    try {
        config.close(); 
        var fini=req.query.fini;
        var ffin=req.query.ffin;
        if (fini===undefined){
            fini=format(new Date, "yyyy-mm-dd");
        }
        if (ffin===undefined){
            ffin=format(new Date, "yyyy-mm-dd");
        }
        config.connect()
        .then(()=>{
             config.request().query("EXEC SPKWEB_CITAS '','"+fini+"','"+ffin+"','','0','','','','','',1",function(err,recordset){
                if (err) console.log(err);
                res.json(recordset.recordset);
                config.close();            
            });
        })
    } catch (error) {
        return res.status(400).json({mensaje:'ocurrio un error',error});
    }
   
});
router.get("/:id", async (req,res)=>{
    try {
        config.close();
        const id=req.params.id;
        var fini=req.query.fini;
        var ffin=req.query.ffin;
        if (fini===undefined){
            fini=format(new Date, "yyyy-mm-dd");
        }
        if (ffin===undefined){
            ffin=format(new Date, "yyyy-mm-dd");
        }
        config.connect()
        .then(()=>{
             config.request().query("EXEC SPKWEB_CITAS '"+id+"','"+fini+"','"+ffin+"','','0','','','','','',2",function(err,recordset){
                if (err) console.log(err);
                res.json(recordset.recordset);
                config.close();            
            });
        })
    } catch (error) {
        return res.status(400).json({mensaje:'ocurrio un error',error});
    }
    
});
router.get("/historico/:id", async (req,res)=>{
    try {
        config.close();
        const id=req.params.id;
        var fini=req.query.fini;
        var ffin=req.query.ffin;
        if (fini===undefined){
            fini=format(new Date, "yyyy-mm-dd");
        }
        if (ffin===undefined){
            ffin=format(new Date, "yyyy-mm-dd");
        }
        config.connect()
        .then(()=>{
             config.request().query("EXEC SPKWEB_CITAS '0','"+fini+"','"+ffin+"','','"+id+"','','','','','',4",function(err,recordset){
                if (err) console.log(err);
                res.json(recordset.recordset);
                config.close();            
            });
        })
    } catch (error) {
        return res.status(400).json({mensaje:'ocurrio un error',error});
    }
    
});
router.put("/:id", async (req,res)=>{
    try {
        config.close(); 
        const id=req.params.id;
       await  config.connect()
        .then(()=>{
            config.request().query("EXEC SPKWEB_CITAS '"+req.body.idmedico+"','','','"+req.params.id+"','"
             +req.body.idafiliado+"','"+req.body.idtercero+"','"+req.body.idplan+"','"+req.body.tipo+"','"+req.body.idservicio+"','"+req.body.numaut+"',3",function(err){
                if (err) console.log(err);
                res.json('modificado');
                config.close();            
            });
        })
    } catch (error) {
        return res.status(400).json({mensaje:'ocurrio un error',error});
    }
    
});

module.exports=router;