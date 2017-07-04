var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");
   
var campgrounds = [
    {
        name: "Kadıralak",
        image: "http://aa.com.tr/uploads/Contents/2016/04/19/thumbs_b_c_146715c3b8954d48b9bbcbc0a3c0ea21.jpg",
        description: "Trabzon'un Tonya ilçe merkezine 9 kilometre uzaklıktaki bin 300 metre yüksekliğindeki Kadıralak Yaylası, her yıl nisan ayında 'mavi zakkum' olarak da isimlendirilen 'mavi yıldız' çiçeğine ev sahipliği yapıyor."        
    },
    {
        name: "Santa Harabeleri",
        image: "http://www.karadenizgazete.com.tr/uploads/news/12005910R1bg7g8s.jpg",
        description: "Trabzon’un ve Gümüşhane’nin ortak kültüründen Araklı, Arsin ve Gümüşhane sınırlarında yer alan, Gümüşhane’nin Dumanlı Köyü, eski adıyla Santa yeni adıyla Santa Harabeleri bölgemizin keşfedilmeyi bekleyen önemli tarihi ve turistik merkezi olmaya aday."        
    }
];

function seedDB() {
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("database cleared");
        // add data
        // campgrounds.forEach(function(campground) {
        //     Campground.create(campground, function(err, campground) {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             Comment.create({
        //                 text: "Gittim güzel yer",
        //                 author: "Onur Guner"
        //             }, function(err, comment) {
        //                 if (err) {
        //                     console.log(err);
        //                 } else {
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log("campground added...");
        //                 }
        //             });
        //         }
        //     });
        // });
    });   
}
   
module.exports = seedDB;