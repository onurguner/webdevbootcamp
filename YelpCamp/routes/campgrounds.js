var express     = require("express"),
    router      = express.Router(),
    middleware  = require("../middleware/index"),
    Campground  = require("../models/campground");

/* RESTful route
 * name     path            http verb   purpose
 * index    /campgrounds    GET         list all campgrounds */
router.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if(err) {
            console.log(err); 
        }
       else {
           res.render("campgrounds/index", {campgrounds: campgrounds});
       }
    });
});

/* RESTful routes
 * name     path                http verb   purpose
 * new      /campgrounds/new    GET         show new campground form */
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

/* RESTful routes
 * name     path            http verb   purpose
 * create   /campgrounds    POST        create new campground and redirect somewhere */
router.post("/campgrounds", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = { id: req.user._id, username: req.user.username };
    
    var campground = { 
        name: name, 
        image: image, 
        description: description,
        author: author
    };
    
    Campground.create(campground, function(err, campground) {
        if (err) {
            console.log("error");
        } else {
             res.redirect("/campgrounds");
        }
    });
});


/* RESTful routes
 * name     path                http verb   purpose
 * show     /campgrounds/:id    GET         show info about one specific campground */
router.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, item) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: item});
        }
    });
});

/* RESTful routes
 * name     path                    http verb   purpose
 * edit     /campgrounds/:id/edit   GET  edit   edit form for one campground */
router.get("/campgrounds/:id/edit", middleware.checkCampgroundAuthorization, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        res.render("campgrounds/edit", {campground: campground});
    });
});

/* RESTful routes
 * name     path                    http verb   purpose
 * update   /campgrounds/:id        PUT  update campground and redirect somewhere */
router.put("/campgrounds/:id", middleware.checkCampgroundAuthorization, function(req, res) {
    var campground = req.body.campground;
    //var author = { id: req.user._id, username: req.user.username };
    //campground.author = author;
    
    Campground.findByIdAndUpdate(req.params.id, campground, 
        function(err, campground) {
            if (err) {
                res.redirect("/campgrounds");
            } else {
                res.redirect("/campgrounds/" + req.params.id);
            }   
        });
});

/* RESTful routes
 * name     path                    http        verb   purpose
 * destroy  /campgrounds/:id        DELETE      delete campground and redirect somewhere */
router.delete("/campgrounds/:id", middleware.checkCampgroundAuthorization, function(req, res) {
    Campground.findByIdAndRemove(req.params.id,
        function(err) {
            if (err) {
                res.redirect("/campgrounds");
            } else {
                res.redirect("/campgrounds");
            }   
        });
});

module.exports = router;