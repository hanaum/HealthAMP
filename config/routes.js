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
    app.post('/addPlan', function(req, res){
        users.addPlan(req, res);
    })
    app.get('/getOneUser/:id', function(req, res) {
        users.getOneUser(req, res);
    })
    app.get('/getOnePlan/:id', function(req, res) {
        users.getOnePlan(req, res);
    })
    app.get('/getAllTodos', function(req, res) {
        users.getAllTodos(req, res);
    })
    app.get('/getAllGoals', function(req, res) {
        users.getAllGoals(req, res);
    })
    app.get('/seeTodoInfo/:id', function(req, res) {
        console.log(req.params.id);
        users.seeTodoInfo(req, res);
    })
    app.post('/removePlan', function(req, res){
        users.removePlan(req, res);
    })

    app.post('/updateTodos', function(req, res){
        users.updateTodos(req, res);
    })

    app.post('/shareplan', function(req, res){
        users.sharePlan(req, res);
    })

    app.get('/plans', function(req, res){
        users.getplans(req, res);
    })


    app.get('/userbyemail/:id', function(req,res){
        users.getuserbyemail(req,res);
    })

    app.post('/editPlan', function(req,res){
        users.editplan(req, res);

    })
}
