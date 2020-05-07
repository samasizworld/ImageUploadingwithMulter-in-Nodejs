const express =require('express');
const connectDatabase =require('./config/database');
connectDatabase();
const app =express();
app.use('/multer',require('./routes/api/multer'));
app.use('public/uploads',express.static('public/uploads'));
app.listen(3000,()=>{console.log('Server running on port 3000')});