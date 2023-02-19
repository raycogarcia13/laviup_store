const { Schema, model, Types } = require("mongoose");
const validator = require("validator")

const Store = require("./Store")

const dataSchema = new Schema({
    name:{type: String},
    description:{type: String},
    photo:{type: String},
    store:{ type: Types.ObjectId, ref: Store, autopopulate: true },
    price:{type: String}
},{ timestamps: true });

dataSchema.plugin(require('mongoose-autopopulate'));

module.exports =  model('Product',dataSchema);