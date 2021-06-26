const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require("body-parser");
const connectDB = require('./server/database/connection');
const app = express();

const PORT = process.env.PORT || 8080;
dotenv.config( { path : 'config.env'} )

connectDB();

app.use(bodyparser.urlencoded({ extended : true}))

app.use('/', require('./server/routes/router'))


app.listen(PORT, () => {console.log(`Server Startes on ${PORT}`)});