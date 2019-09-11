const api=require('./api/api');
const bodyParser=require('body-parser');
const express=require('express');
const app=express();
const session=require('express-session')//實作session登入
const router=express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use('/',api);
//app.use('/',router)
app.listen(3000);
console.log('success')