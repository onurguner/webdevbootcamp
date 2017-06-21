var express         = require("express"),
    app             = express(),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    eSanitizer      = require("express-sanitizer");

mongoose.connect("mongodb://localhost/blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(eSanitizer());
app.use(methodOverride("_method"));

// schema setup
var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now()},
});
var Blog = mongoose.model("Blog", blogSchema);
// Blog.create({
//     title: "Lions",
//     image: "https://images.unsplash.com/reserve/wrev1ljvQ6KlfyljCQG0_lion.jpg",
//     body: "This is a test comment"
// });


//RESTFUL ROUTES
app.get("/", function(req, res) {
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    })
});

//create route
app.post("/blogs", function(req, res) {
    //sanitize blog body not to run js code
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, item) {
        if (!err) {
             res.redirect("/blogs");
        }
    });
});

//new route
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

//show blog
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, item) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {blog: item});
        }
    });
});

//update route
app.put("/blogs/:id", function(req, res) {
    //sanitize blog body not to run js code
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, 
        req.body.blog, function(err, item) {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/blogs/" + req.params.id);
            }   
        });
});

//delete route
app.delete("/blogs/:id", function(req, res) {
    Blog.findByIdAndRemove(req.params.id,
        function(err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/blogs");
            }   
        });
});

//edit route
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, item) {
        if (err) {
            console.log(err);
        } else {
            res.render("edit", {blog: item});
        }
    });
});


// listen
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("blog server has started");
});