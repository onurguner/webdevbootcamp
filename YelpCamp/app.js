var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelpcamp");

// schema setup
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

//create (add data to db)
// Campground.create({
//     name: "Uzungöl",
//     image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg",
//     description: "Best place in the world!"
// }, function(err, item) {
//     if (err) {
//         console.log("error");
//     } else {
//         console.log(item);
//     }
// });

/*var campgrounds = [
    { name: "Kızılcahamam", image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg" },
    { name: "Uzungöl", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg" },
    { name: "Zigana", image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg" },
    { name: "Kızılcahamam", image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg" },
    { name: "Uzungöl", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg" },
    { name: "Zigana", image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg" },
    { name: "Kızılcahamam", image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg" },
    { name: "Uzungöl", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg" },
    { name: "Zigana", image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg" },
];*/

//home page
app.get("/", function(req, res) {
    res.render("landing");
});

/* RESTful route
 * name     path            http verb   purpose
 * index    /campgrounds    GET         list all campgrounds */
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if(err) {
            console.log(err); 
        }
       else {
           res.render("index", {campgrounds: campgrounds});
       }
    });
});

/* RESTful routes
 * name     path            http verb   purpose
 * create   /campgrounds    POST        create new campground and redirect somewhere */
app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    
    var campground = { name: name, image: image, description: description };
    
    Campground.create(campground, function(err, item) {
        if (err) {
            console.log("error");
        } else {
            console.log(item);
        }
    });
    
    res.redirect("index");
});

/* RESTful routes
 * name     path                http verb   purpose
 * new      /campgrounds/new    GET         show new campground form */
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

/* RESTful routes
 * name     path                http verb   purpose
 * show     /campgrounds/:id    GET         show info about one specific campground */
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, item) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground: item});
        }
    });
});

/* RESTful routes
 * name     path                    http verb   purpose
 * update   /campgrounds/:id        PUT         update campground and redirect somewhere */


/* RESTful routes
 * name     path                    http verb   purpose
 * destroy  /campgrounds/:id        DELETE      delete campground and redirect somewhere */
 

/* RESTful routes
 * name     path                    http verb   purpose
 * edit     /campgrounds/:id/edit   GET         show edit form for one campground */


// listen
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("camping server has started");
});