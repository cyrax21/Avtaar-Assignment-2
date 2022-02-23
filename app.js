const mongoose = require('mongoose');
const express = require('express');
const app = express(); //intializes express

const bodyParser = require('body-parser'); // to work with rest api (json)
const cookieParser = require('cookie-parser'); // 
const cors = require('cors'); // to host in cross platform we need to add cors 


// loads environment variables from a . env file into process. env
require('dotenv').config(); // use dotenv


//db connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("DB is connected");
}).catch(()=>{
    console.log("unable to connect to DB");
}); 

// use parsing middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//import the routes 
const userRoutes = require("./routes/user")

// using routes
app.use('/api', userRoutes); // localhost:5000/api/signup



const port = process.env.PORT || 8000;

// start the server
app.listen(port, () => {
    console.log(`App is running at ${port}`);
});