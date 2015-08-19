3var mongoose = require('mongoose');
var genericController = {};
var User = mongoose.model('User');

genericController.register = function(req,res){
	User.findOne({email: req.body.email}, function(err, results){
		if(results>0){
			res.json({status: 1, message: "Email already taken"});
		}
		else{
			var user = new User(req.body);
			user.save(function(err){
				if(err){
					console.log(err);
				}
				else{
					res.json({status: 0, results: results});
				}
			})
		}
	});
}	
genericController.login = function(req,res){
	User.findOne({name: req.body}, function(err, results){
		if(results>0){
			if(result.password==req.body.password){
				res.json({status: 1});
			}
			else{
				res.json({status: 0, message: "Passwords do not match"});
			}
		}
		else{
			res.json({status: 0, message: "Email does not exist"});
		}
	})
}
	
module.exports = genericController;
