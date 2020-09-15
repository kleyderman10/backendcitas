import config from "./config";
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
router.delete("/:id", async (req,res)=>{
    try {
        config.close(); 
        const id=req.params.id;
        await config.connect()
        .then(()=>{
              config.request().query("EXEC SPKWEB_CITAS '0','','','"+id+"','','','','','','',5",function(err){
                if (err) console.log(err);
                res.json('cita cancelada');
                config.close();            
            });
        })
    } catch (error) {
        return res.status(400).json({mensaje:'ocurrio un error',error});
    }
    
});
module.exports=router;