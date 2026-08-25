require('dotenv').config()
const app = require('./src/app')
const conectedDB = require('./src/db/db');
const { server } = require('./src/socket/socket');


conectedDB();






server.listen(3000,(req,res)=>{
    console.log("Server is listening post 3000")
})