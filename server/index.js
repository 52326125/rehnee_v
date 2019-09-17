const api=require('./api/api');
const bodyParser=require('body-parser');
const express=require('express');
const app=express();
const session=require('express-session')//實作session登入
const fileStore=require('session-file-store')
const router=express.Router();

/*app.use(session({
    name: 'loginID',
    secret: 
}))*/
app.use(session({
    secret: 'recommand 128 bytes random string',
    cookie: {  maxAge: 30 * 60 * 1000 },
    saveUninitialized: true,
}))
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-with, X_Requested_With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('X-Powered-By', '3.2.1');
    res.header('Content-Type', 'application/json; charset=utf-8');

    if (req.method === 'OPTIONS') {
        res.end('options ok');
    } else {
        next();
    }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use('/',api);
app.use(express.static('public'))
//app.use('/',router)
app.listen(3000);
console.log('success')