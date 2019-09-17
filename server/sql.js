var sqlMap={
    projectSql:{
        test:'select * from chat',
        login: 'select doctor.dr_ID, drdata.dr_name as name ,drdata.profi as pic from doctor,drdata where doctor.dr_ID=? and doctor.dr_password=? and doctor.dr_ID=drdata.dr_ID',
        newPatient: 'insert into pdata(P_name,P_birthday,ID_code,P_code) values(?,?,?,?)',
        oldPatient: 'select medical_order.P_code as code , date_format(medical_order.date,"%Y-%m-%d") as date,medical_order.content ,medical_order.m_order as medicalOrder ,medical_order.remark ,pdata.P_name as name from pdata,medical_order where pdata.ID_code=? and pdata.P_code=medical_order.P_code order by medical_order.date DESC limit 1',
        order: 'insert into medical_order(P_code,dr_ID,date,content,m_order,remark,visit_back_date) values(?,?,?,?,?,?,?)',
        getAllPatient: 'select patient.P_ID as id , pdata.P_name as name, date_format(pdata.P_birthday,"%Y-%m-%d") as birth, pdata.P_code as code, pdata.profi ,date_format(medical_order.date,"%Y-%m-%d") as date from patient, pdata, medical_order where pdata.P_code=patient.P_code and pdata.P_code=medical_order.P_code group by medical_order.P_code order by medical_order.date',
        getPatient: 'select date_format(date,"%Y-%m-%d") as date, content , m_order , remark from medical_order where P_code=? order by date desc',
        getRecord: 'select date_format(finish_date,"%Y-%m-%d") as date , date_format(finish_time,"%H:%i:%S") as time , spend_time from record where P_ID=?',
        getChat: 'select * from chat where P_ID=? and id>?',
        charCommit: 'insert into chat(P_ID,sender,content,date,time) values(?,1,?,date_format(now(),"%Y-%m-%d"),date_format(now(),"%H:%i:%S"))',
        getChatList: 'select pdata.profi as profi,chat.content as content from chat, pdata, patient where chat.P_ID=patient.P_ID and patient.P_code=pdata.P_ID and chat.dr_ID=? group by chat.P_ID order by chat.id desc'
    }
}
module.exports=sqlMap;