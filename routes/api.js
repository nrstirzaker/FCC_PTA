var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var cors = require('cors');
var ObjectID = mongodb.ObjectID;

var MEMBERS_COLLECTION = "members";

var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", { useNewUrlParser: true },function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");


});

/* GET home page. */
router.get('/member', function(req, res, next) {
  db.collection(MEMBERS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.render('index', { messaage: 'Success' });
    }
  });
    
});

router.post("/member", function(req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();

  if (!req.body.fullName) {
    res.render('error', { httpstatus: '400', message : 'No Name' });
  } else {
    db.collection(MEMBERS_COLLECTION).insertOne(newContact, function(err, doc) {
      if (err) {
        res.render('error', { httpstatus: '500', message : 'Failed to create contact' });
      } else {
        res.render('index',{message:'Data saved'});
      }
    });
  }
});

module.exports = router;

