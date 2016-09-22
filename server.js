// Node.js server file for partials_and_custom_users

var express		= require("express"),
	bodyParser	= require("body-parser"),
	path		= require("path");

var app			= express(),
	root		= __dirname,
	port_number	= 8000;

app.use(express.static(path.join(root, "client")));
app.use(express.static(path.join(root, "node_modules")));

app.use(bodyParser.json());

app.listen(port_number, function(){
	console.log("Listening on port", port_number);
});
