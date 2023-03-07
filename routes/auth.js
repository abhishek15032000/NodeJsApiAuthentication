import express from 'express';
import x from '../model/User.js';
export const router = express.Router();
import {
	registerValidation,
	loginValidation
} from '../validation.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';


router.post('/register', async (req, res) => {
	// validate the date provided by the user
	const {
		error
	} = registerValidation(req.body);
	if (error) {
		const val = error.details[0].message;
		return res.status(400).send(val);
	}

	// check if the user already exist in the database
	const emailExist = await x.findOne({
		email: req.body.email
	});
	if (emailExist) {
		return res.status(400).send('Email alreadye exists');
	}


	// HASH PASSWORD
	const saltRounds = 10;
	let hashedPassword;
	try {
		const prmse = await bcrypt.hash(req.body.password, saltRounds);
		hashedPassword = prmse;
	} catch (err) {
		return res.status(404).send('Something went wrong!');
	}



	// here we are creating a new user
	const user = new x({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
	})
	// here we are saving the user to the data base
	try {
		const savedObj = await user.save();
	} catch (err) {
		return res.status(404).send('ok');
	}
})


router.post('/login', async (req, res) => {
	// LETS VALIDATE THE DATA BEFORE WE A USER
	const {
		error
	} = loginValidation(req.body);
	if (error) {
		const val = error.details[0].message;
	return 	res.status(400).send(val);
	}
	// CHECK IF THE USER EMAIL EXIST OR NOT 
	const user = await x.findOne({
		email: req.body.email
	});
	if (!user) {
		return res.status(400).send('Email does not exist');
	}
	// PASSWORD IS CORRECT OR NOT 
	let correct = false;
	try {
		let check = await bcrypt.compare(req.body.password, user.password);
		correct = check;
	} catch (err) {
		return res.status(404).send('Something went wrong');
	}
  
  if(!correct){
    return res.status(400).send('Invalid password');
  }
  
  // CREATE AND ASSIGN TOKEN
  console.log(user._id);
  const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET);// it is just to ensure that after being logged in , any other activites on the site are done if they are logged in and to have a certificate of login we assign them a token which they can show and undergo those activities on the site and prevents not logged in users from using functions or features for logged in users.
  res.header('auth-token',token).send(token);
})