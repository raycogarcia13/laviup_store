
const db = require('./database')
const base_data_uri = './datas/'
const bcrypt = require('bcryptjs')
const Rol = require('../components/models/Rol');
const User = require('../components/models/User');

const seed = async (tabla,values, prop = null)=>{
    try{
        console.log(`Seeding ${tabla.collection.collectionName}`)
        await tabla.deleteMany();
        // await tabla.insertMany(values)
        for(let item of values){
            if(prop){
                await tabla.findOneAndUpdate( { [prop]:item[prop] }, item, { upsert: true });
            }else
                await tabla.findOneAndUpdate( item, item, { upsert: true });
        }
        return true;
    }catch(error){
        console.log('error',error);
        return false;
    }
}

const loadDatas = (name)=>{
    return require(`${base_data_uri}${name}`)
}

const seeders =[
    {tabla:Rol,values:loadDatas('rols')},
]


const seedUser = async()=>{
    console.log(`Seeding Users`)
    const values = require(`${base_data_uri}user`);
    const rols = await Rol.find();
    await User.deleteMany();
    // await tabla.insertMany(values)
    for(let item of values){
        const r = rols.find(it=>it.rol+''==item.role+'');
        item.rol = r._id;
        await User.create({
            name:item.name,
            email:item.email,
            phone:item.phone,
            password:item.password,
            role:item.rol
        });
    }
}

// run all seeders
exports.init = async()=>{
    let status = true; 

    for(const item of seeders){
        let st = await seed(item.tabla,item.values, item.prop?item.prop:null)
        if(!st) status =false
    }

    await seedUser();


    return status;
}
