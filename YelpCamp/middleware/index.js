var Campground  = require("../models/campground"),
    Comment     = require("../models/comment");

//all middleware goes here
var middleware = {};

middleware.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login!");
    res.redirect("/login");
} 

middleware.checkCampgroundAuthorization = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, campground) {
            if (err) {
                req.flash("error", "Campground Not Found!");
                res.redirect("back");
            } else {
                if (campground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please Login!");
        res.redirect("back");
    }
}

middleware.checkCommentAuthorization = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.cid, function(err, comment) {
            if (err) {
                req.flash("error", "Comment Not Found!");
                res.redirect("back");
            } else {
                if (comment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please Login!");
        res.redirect("back");
    }
}

module.exports = middleware;