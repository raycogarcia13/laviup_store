const mongoose = require('mongoose');

const uri = (process.env.NODE_ENV=='DEVELOPMENT')?process.env.DATABASE_DEV_URI||'mongodb://localhost:27017/store_laviup':process.env.DATABASE_URI||'mongodb://localhost:27017/store_laviup';
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db=> console.log(`Mongodb connected to ${uri}`))
.catch(err=>console.log(err))