var express = require("express");
var app = express();

//
app.get("/", function(req, res) {
   res.send("Hi there, wellcome to my first assignment!");
});

//
app.get("/speak/:animal", function(req, res) {
   var sounds = {
       pig: "Oink",
       dog: "Woof Woof!",
       cow: "Moo"
   }
   var animal = req.params.animal.toLowerCase();
   var message = "The " + animal + " says " + sounds[animal];
   res.send(message);
});

//
app.get("/repeat/:message/:iter", function(req, res) {
   var text = "";
   for (var i=0; i<req.params.iter; i++) {
       text += req.params.message + " ";
   }
   res.send(text);
});

//
app.get("*", function(req, res) {
    res.send("Sorry, page not found...What are you doing with yoru life?");
});

// start server
app.listen(process.env.PORT, process.IP);