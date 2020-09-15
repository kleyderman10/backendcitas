import config from "./config";
import sql from "mssql";
import express from "express";
import jwt from 'jsonwebtoken';
const router=express.Router();

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
router.get("/autenticar/:id", async (req,res)=>{
    var usuario=req.params.id;
        config.close();
        config.connect()
        .then(()=>{
             config.request().query("EXEC SPKWEB_AFI '"+usuario+"','','','','','','','','','','','','','','','','',1",function(err,recordset){
                if (err) console.log(err);
               const  dat=recordset.recordset[0];
                var idtercero=dat.IDADMINISTRADORA;
                var idpla=dat.IDPLAN;
                var sexo=dat.SEXO;
            if(usuario.length>0){   
                const payload = {
                        usuario:usuario,
                        idtercero:idtercero,
                        idplan:idpla,
                        sexo:sexo,
                        check:  true
                    };
                    const token = jwt.sign(payload, 'Clinica2020', {
                        expiresIn: 7200000
                    });
                    res.json({
                        mensaje: 'Autenticación correcta',
                        token: token
                    });
            } else {
                 res.json({ mensaje: "Usuario o contraseña incorrectos"})
            }
                config.close();            
            })
        });
});
module.exports=router;