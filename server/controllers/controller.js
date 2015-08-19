var mongoose = require('mongoose');
var genericController = {};
var User = mongoose.model('User');

genericController.register = function(req,res){
  console.log('sc', req.body);
	User.findOne({email: req.body.email}, function(err, results){
    console.log('sc', results);
		if(results){
			res.json({status: 1, message: "Email already taken"});
		}
		else{
			var user = new User(req.body);
			user.save(function(err){
				if(err){
					console.log(err);
				}
				else{
					res.json({status: 0, message: "Registration was successful! Please sign in!"});
				}
			})
		}
	});
}	
genericController.login = function(req,res){
  // console.log('sc:login', req.body);
	User.findOne({email: req.body.email}, function(err, results){
		if(results){
			if(results.password==req.body.password){
				res.json({status: 1, results: results});
			}else{
				res.json({status: 0, message: "Passwords do not match"});
			}
		}
		else{
			res.json({status: 0, message: "Email does not exist"});
		}
	})
}
	
module.exports = genericController;
