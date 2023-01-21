// getting-started.js
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

async function main(connectionUrl) {
  mongoose.connect(connectionUrl,(err)=>{
         if(err){
            console.log(err)
         }else{
             console.log('connected to mongoose')
         }
  });
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


module.exports=main;