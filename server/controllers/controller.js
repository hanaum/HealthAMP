var mongoose = require('mongoose');
var genericController = {};
var User = mongoose.model('User');

genericController.register = function(req,res){
	var user = new User(req.body);
	user.save(function(err){
		if(err)
	{
		console.log(err);
	}
		else
	{
		res.end();
	}
	});
}	
module.exports = genericController;
