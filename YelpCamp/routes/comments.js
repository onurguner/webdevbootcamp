var express     = require("express"),
    router      = express.Router(),
    middleware  = require("../middleware/index"),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment");


//create new comment
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn ,function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            var comment = req.body.comment;
            Comment.create(comment, function(err, comment) {
               if (err) {
                   console.log(err);
               } else {
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/" + campground._id);
               }
            });
        }
    });
});

/* RESTful routes
 * name     path                    http verb   purpose
 * edit     /campgrounds/:id/edit   GET  edit   edit form for one campground */
router.get("/campgrounds/:id/comments/:cid/edit", middleware.checkCommentAuthorization, function(req, res) {
    Comment.findById(req.params.cid, function(err, comment) {
        if (err) {
            res.redirect("/campgrounds" + req.params.id);
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: comment});
        }
    });
});

/* RESTful routes
 * name     path                    http verb   purpose
 * update   /campgrounds/:id        PUT  update campground and redirect somewhere */
router.put("/campgrounds/:id/comments/:cid", middleware.checkCommentAuthorization, function(req, res) {
    var comment = req.body.comment;
    Comment.findByIdAndUpdate(req.params.cid, comment, 
        function(err, comment) {
            if (err) {
                res.redirect("/campgrounds/" + req.params.id);
            } else {
                res.redirect("/campgrounds/" + req.params.id);
            }   
        });
});

/* RESTful routes
 * name     path                    http        verb   purpose
 * destroy  /campgrounds/:id        DELETE      delete campground and redirect somewhere */
router.delete("/campgrounds/:id/comments/:cid", middleware.checkCommentAuthorization, function(req, res) {
    Comment.findByIdAndRemove(req.params.cid,
        function(err) {
            if (err) {
                res.redirect("/campgrounds/" + req.params.id);
            } else {
                res.redirect("/campgrounds/" + req.params.id);
            }   
        });
});

module.exports = router;