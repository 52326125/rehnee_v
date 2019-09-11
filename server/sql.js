var sqlMap={
    projectSql:{
        test:'select * from chat',
        login: 'select * from doctor where dr_ID=? and dr_password=?'
    }
}
module.exports=sqlMap;