var express  = require("express"),
    router   = express.Router(),
    User     = require("../models/user"),
    passport = require("passport");
 
//home page
router.get("/", function(req, res) {
    res.render("landing");
});

// ============================
// Auth Routes
// ============================
router.get("/register", function(req, res) {
   res.render("register"); 
});

router.post("/register", function(req, res) {
   
   var user = new User({username: req.body.username});
   var password = req.body.password;
   
   User.register(user, password, function(err, user) {
      if (err) {
          req.flash("error", err.message);
          return res.redirect("/register");
      }
      passport.authenticate("local")(req, res, function() {
         req.flash("success", "Wellcome to YelpCamp");
         res.redirect("/campgrounds");
      });
   });
});

router.get("/login", function(req, res) {
   res.render("login"); 
});

router.post("/login", 
    passport.authenticate("local", {successRedirect: "/campgrounds", failureRedirect: "/login"}),
    function(req, res) {
});

router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logged you out...");
   res.redirect("/campgrounds");
});

module.exports = router;