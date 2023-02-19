 

const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require("path")

const PORT =  (process.env.NODE_ENV=='DEVELOPMENT') ? process.env.PORT_DEV || 4000:process.env.PORT || 3000;

app.set('port',PORT)

const cookieParser = require('cookie-parser');
const corsOption = require('./config/cors');
app.use(cors(corsOption))
app.use(bodyParser.json({limit:'50mb'}));
app.use(cookieParser())

// ROUTES
app.use('/api/v1/',require('./components/router/auth/auth'))
app.use('/api/v1/',require('./components/router/products'))
app.use('/api/v1/users',require('./components/router/user'))
app.use('/api/v1/store',require('./components/router/store'))
//units routes
// app.use('/tdesign/api/v1',require('./components/router/units'))
    
// app.use('/api-docs',SwaggerUi.serve,SwaggerUi.setup(require('./api-docs.json')))

//statics files
app.use(express.static(path.join(__dirname, "./components/public")));

const errorMiddleware = require('./components/middlewares/errors')
app.use(errorMiddleware)


module.exports = app;