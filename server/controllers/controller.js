var mongoose = require('mongoose');
var genericController = {};
var User = mongoose.model('User');
var Todo = mongoose.model('Todo');
var Goal = mongoose.model('Goal');
var Plan = mongoose.model('Plan');

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
genericController.addPlan = function(req, res) {
    console.log(req.body.user_id);
    User.findOne({_id: req.body.user_id}, function(err, user) {
        var plan = new Plan({_user: req.body.user_id, title: req.body.title,
         description: req.body.description, todo: req.body.plans});
        plan._user = user._id;
        user.plans.push(plan);
        plan.save(function(err) {
            user.save(function(err, results) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("DATA: ", results)
                    res.json(results);
                }
            })
        })

    })
}
genericController.getOneUser = function(req,res){
	User.findOne({_id: req.params.id}).populate('plans')
        .exec(function(err, data) {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
            }
        })
}
genericController.getAllTodos = function(req, res) {
    Todo.find({}, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            res.json(results);
        }
    })
}
genericController.getAllGoals = function(req, res) {
    Goal.find({}).populate('todos')
        .exec(function(err, data) {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
            }
        })
}

module.exports = genericController;
