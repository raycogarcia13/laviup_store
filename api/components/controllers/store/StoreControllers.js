const ErrorHandler = require("../../utils/errorHandler");
const catchAsyncErrors = require("../../middlewares/catchAsyncErrors")
const fs = require("fs");
const path = require("path")
const Store = require('../../models/Store')
const Product = require('../../models/Product')

exports.create = catchAsyncErrors(async (req,res,next) =>{

    const newed = await Store.create({
        user:req.user._id
    })

    return res.json({
        status:"success",
        data:newed
    })
})

exports.all = catchAsyncErrors(async (req,res,next) =>{

   const all = await Store.find();

    return res.json({
        status:"success",
        data:all
    })
})

exports.logoStore = catchAsyncErrors(async (req,res,next) =>{ 
    const {id} = req.params

    if(!req.file)
        return next(new ErrorHandler("Error in structure, not code or no logo sended",400))

    let exist = await Store.findById(id)

    if(!exist){
        fs.unlinkSync(req.file.path)
        return next(new ErrorHandler("Store not found",404))
    }

    if(exist.logo){
        fs.unlinkSync(path.join(__dirname, "../../public/",exist.logo) )
    }

    exist = await Store.findByIdAndUpdate(id,{
        logo:process.env.NODE_ENV=='DEVELOPMENT' ? `logo/dev/${req.file.filename}` : `logo/${req.file.filename}`,
    },{
        new:true,
        runValidators:true,
        useFindAndModify: false
    });


    return res.json({
        status:"success",
        data:exist
    })
})

exports.getStores = catchAsyncErrors(async (req,res,next) =>{

    const all = await Store.findOne({
        user:req.user._id
    })

    return res.json({
        status:"success",
        data:all
    })
})

exports.update = catchAsyncErrors(async (req,res,next) =>{
    const {id} = req.params

    let exist = await Store.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify: false
    });

    if(!exist)
        return next(new ErrorHandler("Store not exist",404))

    

    return res.json({
        status:"success",
        message:"Store updated",
        data:exist
    })
})

exports.clear = catchAsyncErrors(async (req,res,next) =>{
    const store = await Store.findOne({
        user:req.user._id
    })

    await Product.remove({
        store:store._id
    })
    

    return res.json({
        status:"success",
        message:"Store clear",
    })
})

