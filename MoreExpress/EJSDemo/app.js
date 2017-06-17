var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

// root route
app.get("/", function(req, res){
    res.render("home", {mThing: ""});
});

// love route
app.get("/love/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("love", {mThing: thing});
});

// post route
app.get("/posts", function(req, res){
    var posts = [
        { title: "post1", author: "ahmet" },
        { title: "post2", author: "hasan" },
        { title: "post3", author: "cenk" },
    ];
    res.render("posts", {posts: posts});
});

//
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
});