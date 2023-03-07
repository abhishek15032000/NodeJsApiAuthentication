import express from 'express';
import {
	router as authRouter
} from './routes/auth.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoute from './routes/posts.js';

const app = express();
// MIDDLEWARES
app.use(express.urlencoded({
	extended: false
})); // get access to the body of the request being send by the client side 
app.use(express.json()); // read json data send from the client side(using body parser)




// CONNECT TO MONGOOSE Db

dotenv.config();
await mongoose.connect(process.env.DB_PASSWORD, {
	useNewUrlParser: true
}).then(() => console.log('Connected!'));


app.use('/api/user', authRouter);
app.use('/api/posts',postRoute);

app.listen(3000, () => {
	console.log(`listening !`);
})

/// create a model in mongo db , model is a structure of how we want the data to be structured while storing , here we are storing usernames and passwords