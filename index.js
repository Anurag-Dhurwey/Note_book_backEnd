const connection=require("./config/db/db");
require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const router=require("./routers/router");

// middleware setups 
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/',router);

app.listen(port, async() => {
   await connection(process.env.connectionUrl);
  console.log(`Example app listening on http://localhost:${port}`);
});