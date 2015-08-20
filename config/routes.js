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
    app.get('/getOneUser/:id', function(req, res) {
        console.log("ROUTES : ", req.params.id);
        users.getOneUser(req, res);
    })
    app.get('/getAllTodos', function(req, res) {
        users.getAllTodos(req, res);
    })
    app.get('/getAllGoals', function(req, res) {

        users.getAllGoals(req, res);
    })
}
