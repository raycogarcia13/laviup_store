const { Schema, model, Types } = require("mongoose");
const validator = require("validator")

const User = require("./User")

const dataSchema = new Schema({
    name:{type: String},
    user:{ type: Types.ObjectId, ref: User, autopopulate: true },
    logo:{type: String},
    address:{type: String},
    location:[Number]
},{ timestamps: true });

dataSchema.plugin(require('mongoose-autopopulate'));

module.exports =  model('Store',dataSchema);