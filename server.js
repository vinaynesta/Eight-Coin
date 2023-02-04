const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({path: './config.env'});
const app = require('./app');


const db = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
.then(con =>{console.log('Data base connected successfully');});

const port =  process.env.PORT || 8080;

app.listen(port,()=>{
    console.log(`running on port ${port}`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
});

//heroku ps:scale web=0
//heroku ps:scale web=1