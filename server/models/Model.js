var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	name: String,
    	password: String,
    	email: String,
    	age: Number,
    	weight: Number
})
mongoose.model('User', userSchema);
