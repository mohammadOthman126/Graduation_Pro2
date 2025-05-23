const express=require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const UserRouter=require('../server/routes/userRoute');
const CountryRouter=require('../server/routes/countryRoute')
const CartRouter=require('../server/routes/cartRoute');

const app=express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth',UserRouter);
app.use('/auth',CountryRouter);
app.use('/auth',CartRouter);
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('connected to MongoDB')).catch(err=>console.log(err));

app.get('/test',(req,res)=>{
    res.send('Hello from the Server updateeee222222222111111111');
})

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})