var users= require('./../server/controllers/controller.js');


module.exports = function(app) {


	app.post('/register', function(req,res){
		users.register(req,res);
	});

  app.post('/login', function(req, res){
    users.login(req, res);
  })
}
