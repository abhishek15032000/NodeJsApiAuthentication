import mongoose from "mongoose";

// CREATE SCHEMA

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 6,
		max: 255
	},
	email: {
		type: String,
		required: true,
		max: 255
	},
	password: {
		type: String,
		required: true,
		max: 1024,
		max: 6
	},
	date: {
		type: Date,
		default: Date.now
	}

})


const x = mongoose.model('User', userSchema);
export default x;