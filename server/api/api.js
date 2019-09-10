var db=require('../db');
var express=require('express');
var moment=require('moment');
var router=express.Router();
var mysql=require('mysql');
var $sql=require('../sql');

var conn=mysql.createConnection(db.mysql);
conn.connect();

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
    conn.query(sql,function(error,result){
        if(error){
            console.log("error");
        }
        if(result){
            jsonWrite(res,result);
        }
    })
})
module.exports=router;