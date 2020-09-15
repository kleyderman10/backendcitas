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
router.get("/:idplan/:idme/:idtercero/:sexo/:code", async (req,res)=>{
    try {
        const request= await new sql.Request(config.connect((err)=>{
            if (err){
                console.log(err);
            }else{
                var idplan=req.params.idplan;
                var idtercero=req.params.idtercero;
                var idme=req.params.idme;
                var sexo=req.params.sexo;
                var code=req.params.code;
                console.log(code);
                if (code!='Proc'){
                    config.close();    
                    config.connect()
                    .then(()=>{
                        config.request().query("EXEC SPKWEB_SERVICIOS '"+idme+"','"+idplan+"','"+idtercero+"','"+sexo+"',1",function(err,recordset){
                            if (err) console.log(err);
                            res.json(recordset.recordset);
                            config.close();            
                        });
                    })
                }
                if (code ==='Proc'){
                    config.close();    
                    config.connect()
                    .then(()=>{
                        config.request().query("EXEC SPKWEB_SERVICIOS '"+idme+"','"+idplan+"','"+idtercero+"','"+sexo+"',2",function(err,recordset){
                            if (err) console.log(err);
                            res.json(recordset.recordset);
                            config.close();            
                        });
                    })
                }
                
            }
        }));
    } catch (error) {
        return res.status(400).json({mensaje:'ocurrio un error',error});
    }
})
module.exports=router;