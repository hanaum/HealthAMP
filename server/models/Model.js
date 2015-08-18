var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	name: String,
    	password: String,
    	Email: String,
    	Age: Number,
    	Weight: Number
})
mongoose.model('User', userSchema);
