var express = require("express");
var app = express();

//
app.get("/", function(req, res) {
   res.send("hi there!");
});

//
app.get("/bye", function(req, res) {
   res.send("goodbye!");
});

//
app.get("/r/:subrettiName", function(req, res) {
   var subreddit = req.params.subrettiName;
   res.send("welcome to the " + subreddit + " subreddit...");
});

app.get("/r/:subrettiName/comments/:id/:title", function(req, res) {
   console.log(req.params);
   res.send("welcome to subreddit comments!");
});


// the place is important
app.get("*", function(req, res) {
   res.send("you are a star!");
});

//tell express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function () {
    console.log("server started");
});