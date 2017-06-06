var express = require("express");
var app = express();

// root route
app.get("/", function(req, res){
    res.render("home.ejs", {mThing: ""});
});

// root route
app.get("/love/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("home.ejs", {mThing: thing});
});

//
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
});