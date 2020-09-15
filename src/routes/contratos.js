import config from "./config";
import sql from "mssql";
import express from "express";
const router=express.Router();

router.get("/terceros/:id", async (req,res)=>{
    const buscar=req.params.id;
    try {
        config.close();
        await config.connect()
        .then(()=>{
             config.request().query("EXEC SPKWEB_CONTRATOS '"+buscar+"',1",function(err,recordset){
                if (err) console.log(err);
                res.json(recordset.recordset);
                config.close();
                recordset=null;           
            });
        })
    } catch (error) {
        return res.status(400).json({mensaje:'ocurrio un error',error});
    }
});
router.get("/planes/:id", async (req,res)=>{
    const id=req.params.id;
    try {
        config.close();
       await config.connect()
        .then(()=>{
             config.request().query("EXEC SPKWEB_CONTRATOS '"+id+"',2",function(err,recordset){
                if (err) console.log(err);
                res.json(recordset.recordset);
                config.close();            
            });
        })
    } catch (error) {
        return res.status(400).json({mensaje:'ocurrio un error',error});
    }
});
module.exports=router;