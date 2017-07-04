var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    methodOverride  = require("method-override"),
    User            = require("./models/user"),
//    seedDB          = require("./seeds"),
    passport        = require("passport"),
    passportLocal   = require("passport-local");
    
var routeCampgrounds    = require("./routes/campgrounds"),
    routeComments       = require("./routes/comments"),
    routeIndex          = require("./routes/index");

//configuration
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//connect to db and seed db
mongoose.connect("mongodb://localhost/yelpcamp");
//seedDB();

// passport configuration
app.use(require("express-session")({ 
    secret: "bize her yer trabzon", 
    resave: false, 
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

//requiring routes
app.use(routeIndex);
app.use(routeCampgrounds);
app.use(routeComments);

// listen
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("camping server has started");
});