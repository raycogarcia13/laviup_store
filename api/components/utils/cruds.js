//crud.js

const express = require('express');
const ErrorHandler = require("./errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const { isAuthenticatedUser, authorizeRole } = require("../middlewares/auth")


module.exports = (Collection, isAuth = false, ...authorize) => {

  // ======
  // Create
  // ======
  const create = catchAsyncErrors(async (req,res,next) =>{
    const newEntry = req.body;
    const e = await Collection.create(newEntry);

    return res.json({
        status:"success",
        message:"created",
        data:e
    })
  });
  
  // =========
  // Read many
  // =========
  const readMany = catchAsyncErrors(async (req,res,next) =>{
    let query = res.locals.query || {};
  
    const e = await Collection.find(query);
    return res.json({
        status:"success",
        data:e
    })
  });

  // ========
  // Read one
  // ========
  const readOne = catchAsyncErrors(async (req,res,next) =>{
    const { id } = req.params;
  
    const e = await Collection.findById(id);

    return res.json({
        status:"success",
        data:e
    })
  });
  
  // ======
  // Update
  // ======
  const update = catchAsyncErrors(async (req,res,next) =>{
    const changedEntry = req.body;

   const e = await Collection.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify: false
    });
    if(!e)
        return next(new ErrorHandler('Object not found',404))
   
    
    return res.json({
        status:"success",
        message:"updated",
        data:e
    })
  });
  
  // ======
  // Remove
  // ======
  const remove = catchAsyncErrors(async (req,res,next) =>{
    const { id } = req.params;

    const e = await Collection.findById(id);
    
    if(!e)
        return next(new ErrorHandler('Object not found',404)) 

    await Collection.findByIdAndDelete(id);

    return res.json({
        status:"success",
        message:"deleted"
    })
  });

  // ======
  // Routes
  // ======

  let router = express.Router();

  router.post('/',isAuth?isAuthenticatedUser: (req,res,next)=>next(), authorize.length>0 ? authorizeRole(...authorize) : (req,res,next)=>next(), create);
  router.get('/', isAuth?isAuthenticatedUser: (req,res,next)=>next(), authorize.length>0 ? authorizeRole(...authorize) : (req,res,next)=>next(), readMany);
  router.get('/:id', isAuth?isAuthenticatedUser: (req,res,next)=>next(), authorize.length>0 ? authorizeRole(...authorize) : (req,res,next)=>next(), readOne);
  router.put('/:id', isAuth?isAuthenticatedUser: (req,res,next)=>next(), authorize.length>0 ? authorizeRole(...authorize) : (req,res,next)=>next(), update);
  router.delete('/:id', isAuth?isAuthenticatedUser: (req,res,next)=>next(), authorize.length>0 ? authorizeRole(...authorize) : (req,res,next)=>next(), remove);

  return router;
}