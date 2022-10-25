//Requires
const express = require('express');
const admin_routes = require('./routes/admin');
const resume_page = require('./routes/resumePage');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./configs/database/dbConnection');
const { notFoundErrorHandler } = require('./middlewares/errorHandler');
require('./configs/setConfig');
const passport = require('passport');


//All Constant Variables
const PORT = process.env.PORT;
const app = express();

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());


//Passport
require('./classes/PassportJWT')(passport);
app.use(passport.initialize());

//Routes
// app.use('/',website);
app.use('/api',resume_page);
app.use('/sudouser',admin_routes);


app.use("*", notFoundErrorHandler); // api route not found error handling


//App Listener!
app.listen(PORT,()=>{
    console.log(`App is Listening on a ${PORT}`);
});