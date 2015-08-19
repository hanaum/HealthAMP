var users= require('./../server/controllers/controller.js');


module.exports = function(app) {


	app.post('/register', function(req,res){
    // console.log('sr', req.body)
		users.register(req,res);
	});

  app.post('/login', function(req, res){
    console.log('sr', req.body)
    users.login(req, res);
  })
}
