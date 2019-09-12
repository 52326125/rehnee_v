var sqlMap={
    projectSql:{
        test:'select * from chat',
        login: 'select doctor.dr_ID, drdata.dr_name as name ,drdata.profi as pic from doctor,drdata where doctor.dr_ID=? and doctor.dr_password=? and doctor.dr_ID=drdata.dr_ID'
    }
}
module.exports=sqlMap;