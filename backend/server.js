require('dotenv').config();
const express=require('express');
const cors=require('cors');
const connectDB=require('./config/db');

connectDB();


const app=express();
const PORT=process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/api/transactions', require('./routes/transactions'));

app.get('/',(req,res)=>{
    res.send("API is running....");
});

app.listen(PORT,()=>{
    console.log('server is running on port',PORT);
});