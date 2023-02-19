const register = require('./mailTemplates/register')
// const register_complete = require('./mailTemplates/register_complete')
// const forget = require('./mailTemplates/forget')
// const new_report = require('./mailTemplates/new_report')
// const report_approved = require('./mailTemplates/report_approved')
// const report_approved_01 = require('./mailTemplates/report_approved_01')
// const report_complete = require('./mailTemplates/report_complete')
// const report_complete_01 = require('./mailTemplates/report_complete_01')
// const report_rejected = require('./mailTemplates/report_rejected')
// const report_rejected_01 = require('./mailTemplates/report_rejected_01')
// const notification = require('./mailTemplates/notification')
// const new_task = require('./mailTemplates/new_task')
// const task_solution = require('./mailTemplates/task_solution')
// const assignment_responsible = require('./mailTemplates/assignment_responsible')

const fillTemplate = (data,template) =>{
    let T = {};
    switch(template){
        case 'register':{
            T.subject = register.en.subject;  
            let textT = register.en.messageT.replace('%code',data.code);
            textT = textT.replace('%name',data.name);
            let textH = register.en.messageH.replace('%code',data.code)
            textH = textH.replace('%email',data.email)
            textH = textH.replace('%name',data.name);
            T.messageH = textH;  
            break;
        }
        case 'register_complete':{
            T.subject = register_complete.en.subject;  
            T.messageT = register_complete.en.messageT;  
            let textH = register_complete.en.messageH;
            textH = textH.replaceAll('%username',data.name)
            textH = textH.replace('%email',data.email)
            textH = textH.replace('%name',data.name);
            T.messageH = textH;
            break;  
        }
        case 'forget':{
            T.subject = forget.en.subject;  
            T.messageT = forget.en.messageT.replace('%link',varsLink('FORGET')+'?tkn='+data.tkn);  
            let textH = forget.en.messageH.replace('%link',varsLink('FORGET')+'?tkn='+data.tkn)
            textH = textH.replaceAll('%username',data.user)
            textH = textH.replace('%email',data.email)
            textH = textH.replace('%fullname',data.name);
            T.messageH = textH;
            break;  
        }
    }
    return T;
}

module.exports = {
   fillTemplate
}