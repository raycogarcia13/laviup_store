const {uncaught,unhandled} = require('./components/utils/otherErrors')
uncaught();

require('dotenv').config({path:'config.env'});
const db = require('./config/database')

const app = require('./app')

function main() {
    const server = app.listen(app.get('port'),()=>{
        console.log(`GestProy API running at ${app.get('port')} port in ${process.env.NODE_ENV} mode`)
    });
    unhandled(server)
}

main();
