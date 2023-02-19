const ErrorHandler = require("../../utils/errorHandler");
const catchAsyncErrors = require("../../middlewares/catchAsyncErrors")
const Joi = require('joi');
const {sendMail} = require('../../utils/mail') 
const {fillTemplate} = require('../../utils/mail_templates') 

const User = require('../../models/User')
const Rol = require('../../models/Rol')
const Verify = require('../../models/Verify')

//POST  =>/login
exports.login = catchAsyncErrors(async (req,res,next) =>{
    const {username, password} = req.body;

    const exist = await User.findOne({email:username}).select('+password');
    console.log(exist);
    if(!exist)
        return next(new ErrorHandler('auth.error',403))
        
    const pasv = await exist.comparePassword(password);
    if(!pasv)
        return next(new ErrorHandler('auth.error',403))

    const user = await User.findById(exist._id);

    return res.json({
        status:"success",
        user:user,
        token:exist.getJwtToken()
    })
})

// POST => /register
exports.register = catchAsyncErrors(async (req,res,next) =>{

    const validator = Joi.object().keys({
        email:Joi.string().required().email(),
        password:Joi.required(),
        name:Joi.required()
    })
    const {error} = validator.validate(req.body); 

    if(error){
        return next(new ErrorHandler(error,422))
    }
    
    const exist = await User.findOne({
        email:req.body.email
    })

    if(exist){
        return next(new ErrorHandler("Email exist in database",422))
    }

    const rol = await Rol.findOne({
        rol:'Store'
    })

    const code = Math.round(Math.random()*999999)
    if(code<100000)
        code+='9'
    // send email here
    let send = true;
    console.log(`sending email to ${req.body.email}`)
    const mailT = fillTemplate({
        email:req.body.email,
        code,
        name:req.body.name,
    },"register");
    sendMail(req.body.email, mailT.messageT,mailT.messageH, mailT.subject )    
    .catch(e => {
        send = false;
        console.log(e);
        return next(new ErrorHandler("Email invalid",422))
    })

    await Verify.create({
        code,
        data:{
            email: req.body.email,
            name:req.body.name,
            password:req.body.password,
            role:rol._id
        }
    })

    return res.json({
        status:'success',
        message: 'message.sent',
        data:{
            email:req.body.email
        }
    })

})

exports.verify = catchAsyncErrors(async (req,res,next) =>{
    const {code} = req.body

    const verify = await Verify.findOne({code, type: 'register'})

    if(!verify){
        return next(new ErrorHandler("Código inválido",422))
    }

    let user = await User.create(verify.data)
    await Verify.findByIdAndDelete(verify._id)

    user = await User.findById(user._id);

    return res.json({
        status:'success',
        user:user,
        token:user.getJwtToken()
    })

})

