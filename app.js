//Requires
const express = require('express');
const admin_routes = require('./routes/admin');
const resume_page = require('./routes/resumePage');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const mongoose = require('./configs/database/dbConnection');
const cors = require('cors');
require('./configs/setConfig');


//All Constant Variables
const PORT = process.env.PORT;
const app = express();

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

//Routes
// app.use('/',website);
app.use('/api/',resume_page);
app.use('/api/admin',admin_routes);

//App Listener!
app.listen(PORT,()=>{
    console.log(`App is listening on ${PORT}`);
});