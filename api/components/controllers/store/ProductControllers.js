const ErrorHandler = require("../../utils/errorHandler");
const catchAsyncErrors = require("../../middlewares/catchAsyncErrors")
const fs = require("fs");
const path = require("path")
const xlsx = require('node-xlsx');

const Store = require('../../models/Store');
const Product = require("../../models/Product");

exports.addProduct = catchAsyncErrors(async (req,res,next) =>{
    const {name, price, description} = req.body

    const store = await Store.findOne({user:req.user.id})
    if(!store){
        fs.unlinkSync(req.file.path)
        return next(new ErrorHandler('No tiene tienda aun configurada', 402))
    }
    
    if(!req.file)
        return next(new ErrorHandler("Error en la estructura, no se ha enviado la foto",400))

    const product = await Product.create({
        name,
        price,
        description,
        store:store._id,
        photo: process.env.NODE_ENV=='DEVELOPMENT' ? `images/dev/${req.file.filename}` : `images/${req.file.filename}`,
    })

    return res.json({
        status:"success",
        message:"Producto insertado correctamente",
        data:product
    })
})

exports.removeProduct = catchAsyncErrors(async (req,res,next) =>{
    const {id} = req.params

    const product = await Product.findById(id)
    if(!product){
        return next(new ErrorHandler('No existe el producto', 404))
    }

    if(product.photo && fs.existsSync(path.join(__dirname, "../../public/",product.photo)))
        fs.unlinkSync(path.join(__dirname, "../../public/",product.photo) )

    await Product.findByIdAndRemove(product._id)

    return res.json({
        status:"success",
        message:"Producto eliminado correctamente",
    })
})

exports.get = catchAsyncErrors(async (req,res,next) =>{

    const store = await Store.findOne({user:req.user.id})
    if(!store)
        return next(new ErrorHandler('No tiene tienda aun configurada', 402))
    
    const all = await Product.find({
        store:store._id
    })

    return res.json({
        status:"success",
        data:all
    })
})

exports.getAll = catchAsyncErrors(async (req,res,next) =>{

    const {filter} = req.params
    let all
    if(filter){
        all = await Product.find(
            {
                $or:[
                    {
                        name: {
                            $regex: filter,
                            $options: `i`
                        },
                    },
                    {
                        description: {
                            $regex: filter,
                            $options: `i`
                        },
                    }
                ]
            }
        );
    }else{
        all = await Product.find()
    }

    return res.json({
        status:"success",
        data:all
    })
})

exports.importProducts = catchAsyncErrors(async (req,res,next) =>{

    const store = await Store.findOne({user:req.user.id})
    
    if(!store){
        fs.unlinkSync(req.file.path)
        return next(new ErrorHandler('No tiene tienda aun configurada', 402))
    }

    let obj = xlsx.parse(req.file.path); // parses a file  
    const items = obj[0]['data']

    const all = []
    for(let item of items){ 
        all.push({
            name:item[0],
            description:item[1],
            price:item[2],
            photo:item[3],
            imported:true,
            store:store._id
        })
    }

    await Product.insertMany(all);


    fs.unlinkSync(req.file.path)

    const products = await Product.find({
        store:store._id
    })

    return res.json({
        status:"success",
        data:products
    })

})

