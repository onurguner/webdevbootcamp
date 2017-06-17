var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var friends = ["Tony", "Mirenda"];

app.get("/", function(req, res) {
    res.render("home");
})

app.get("/friends", function (req, res) {
    res.render("friends", {friends: friends});
})

app.post("/addFriend", function(req, res) {
    var newFriend = req.body.newFriend;
    friends.push(newFriend);
    res.redirect("/friends");
})

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("server started");
});