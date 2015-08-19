var mongoose = require('mongoose');
var genericController = {};
var User = mongoose.model('User');

genericController.register = function(req,res){
	User.findOne({email: req.body.email}, function(err, results){
		if(results>0){
			res.json("Email already taken");
		}
		else{
			var user = new User(req.body);
			user.save(function(err){
				if(err){
					console.log(err);
				}
				else{
					res.end();
				}
			})
		}
	});
}	
genericController.login = function(req,res){
	User.findOne({name: req.body}, function(err, results){
		if(results>0){
			if(result.password==req.body.password){
				res.json(1);
			}
			else{
				res.json("Incorrect Password");
			}
		}
		else{
			res.json("No such user in Database");
		}
	})
}
	
module.exports = genericController;
