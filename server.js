const express =require( "express");
const fs=require('fs')

const morgan=require('morgan')
const cors=require('cors')
const mongoose=require('mongoose')
require('dotenv').config()

const app = express();
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
const port=process.env.PORT || 8000
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));

// route middleware
fs.readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
const path = require('path')

if(process.env.NODE_ENV==='production')
{

    app.use('/' , express.static('client/build'))

    app.get('*' , (req , res)=>{

          res.sendFile(path.resolve(__dirname, 'client/build/index.html'));

    })

}
app.listen(port, () => console.log(`Server is running on port 8000`));
