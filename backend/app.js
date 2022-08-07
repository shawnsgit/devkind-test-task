import express from 'express';
import mongoose from 'mongoose';
import user from './router/user.js';
import cors from 'cors';
const app = express()

//access-control-allow-credentials:true
const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));
app.use(express.json());

app.use('/', user)

const url = "your own mongoose atlas connection string";
await mongoose.connect(url).then(() => {
	console.log('db connected');
}).catch(e => console.log('error',e))

app.listen(5000), ()=>console.log('listening ...');


