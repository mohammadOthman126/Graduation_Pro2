const express=require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app=express();

app.use(bodyParser.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('connected to MongoDB')).catch(err=>console.log(err));

app.get('/test',(req,res)=>{
    res.send('Hello from the Server');
})

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})