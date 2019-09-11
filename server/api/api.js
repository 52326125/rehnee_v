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

router.get('/api/login',(req,res)=>{
    var sql=$sql.projectSql.login;
    var user = req.body;
    conn.query(sql,[user.account,user.password],function(error,result){
        if(error){
            alert('login error; worng ID or password!')
        }
        if(result){
            console.log('login success!');
            jsonWrite(res,result);
        }
    })
})
module.exports=router;