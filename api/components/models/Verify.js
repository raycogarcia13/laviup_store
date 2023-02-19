const { Schema, model, Types } = require("mongoose");
const validator = require("validator")

const User = require('./User')

const dataSchema = new Schema({
    code:{
        type: String,
        required:true
    },
    type:{ type: String, enum:['forget', 'register'], default:'register'},
    createdAt:{
        type: Date,
        default: Date.now()
    },
    expiresIn:{
        type: Date,
        default: +new Date() + 3*24*60*60*1000
    },
    data:{ }
});

module.exports =  model('Verify',dataSchema);