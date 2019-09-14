var db=require('../db');
var express=require('express');
var moment=require('moment');
var router=express.Router();
var mysql=require('mysql');
var $sql=require('../sql');

var conn=mysql.createConnection(db.mysql);
conn.connect();
//解決
var jsonWrite=function(res,ret){
    if (typeof ret ==='undefined'){
        res.json({
            code:'1',
            msg:'error'
        })
    }else{
        console.log(ret);
        res.json(ret);
    }
}

router.get('/api/test',(req,res)=>  {
    var sql=$sql.projectSql.test;
    var temp=req.query;
    conn.query(sql,function(error,result){
        if(error){
            console.log("error");
        }
        if(result){
            console.log(temp);
            jsonWrite(res,temp.id);
        }
    })
})
/*router.get('/api/login',(req,res)=>{
    var sql=$sql.projectSql.login;
    var user=req.query;
    conn.query(sql,[user.account,user.password],(error,result)=>{
        if(error){
            console.log('login error: '+error);
        }
        if(result){
            req.session
        }
        if(result){
            console.log(result);
            jsonWrite(res,result);
        }
    })
})*/
router.get('/api/login',(req,res)=>{
    var sql=$sql.projectSql.login;
    var user = req.query;
    conn.query(sql,[user.account,user.password],function(error,result){
        if(error){
            console.log('login error; worng ID or password!')
        }
        if(result){
            req.session.test=result;
            if(req.session.test){
                console.log(req.session.test[0].dr_ID);
            }
            console.log(req.session.test);
            jsonWrite(res,result);
        }
    })
})

router.get('/api/newPatient',(req,res)=>{
    var sql=$sql.projectSql.newPatient;
    var patient=req.query;
    conn.query(sql,[patient.name,patient.birth,patient.ID,patient.code],function(error,result){
        if(error){
            console.log('insert new patient error;');
            jsonWrite(res,error)
        }
        if (result){
            console.log('insert new patient success');
            jsonWrite(res,patient.name)
        }
    })
})

router.get('/api/oldpatient',(req,res)=>{
     var sql=$sql.projectSql.oldPatient;
     var patient=req.query;
     conn.query(sql,[patient.ID],function(error,result){
         if(error){
             console.log(error)
             jsonWrite(res,error)
         }
         if(result){
             console.log(patient)
             jsonWrite(res,result)
         }
     })
})

router.get('/api/order',(req,res)=>{
    var sql=$sql.projectSql.order;
    var order=req.query;//session problem
    conn.query(sql,['order.code','aaaa',order.date,order.content,order.medicalOrder,order.remark,order.time],function(error,result){
        if(error){
            console.log(error)
            jsonWrite(res,error)
        }
        if(result){
            console.log('success')
        }
    })
})
module.exports=router;