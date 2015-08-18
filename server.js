// require express so that we can build an express app
var express = require('express');
// require path so that we can use path stuff like path.join
var path = require('path');
// instantiate the app
var app = express();

//allows us to handle post data from hhtp requests
var bodyParser = require('body-parser');
//this is for regular post requests
app.use(bodyParser.urlencoded());
//this is for post requests that want json back
app.use(bodyParser.json());

// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './client')));
//require mongoose config
require('./config/mongoose.js');

// this line requires and runs the code from our routes.js file and passes it app so that we can attach our routing rules to our express application!
require('./config/routes.js')(app);

app.listen(8888, function() {
  console.log('cool stuff on: 8888');
}); 