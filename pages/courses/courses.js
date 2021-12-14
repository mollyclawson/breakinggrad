var http = require('http');
var qs = require('querystring');
var express = require('express');
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://mollyclaw:Whiplash2015@cluster0.yqtdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(express.static(path.join(__dirname, `public`)));

http.createServer(function (req, res)
{
    res.writeHead(200, {'Content-Type':'text/html'});

    if (req.url == "/") {
        console.log("1");
        res.write("in the default");

    } else if (req.url == "/process") {
        res.write('<html><head><title>Your Schedule Has Been Saved!</title><style type="text/css">' +
        '@import url("https://fonts.googleapis.com/css?family=Poppins");\
        body {\
            background-color: #fff8e8;\
            text-align: center;\
            font-family: "Poppins";\
            font-size: 45px;\
        }\
        button {\
          background-color: #8ab7de;\
          font-size: 36px;\
          text-decoration: none;\
          font-family: "Poppins";\
          color: #fff;\
          border: none;\
          border-radius: 4px;\
          margin-top: 80px;\
        }\
        button:hover {\
          background-color: #79a6cd;\
        }' +
        '</style></head><body><div> Your schedule has been saved! </div>\
        <button onclick="history.back()">\
            Go back to course selection\
        </button></body></html>');

        pdata = "";
		req.on('data', data => {
            pdata += data.toString();
        });

        var userCourses = [];

        req.on('end', () => {
			pdata = qs.parse(pdata);
            for (i = 0; i < 8; i++) {
                courses = pdata['courses'+ i]
                userCourses[i] = courses;
            }
            console.log(userCourses);

            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("breaking-grad");
                var coll = dbo.collection("user-data");

                coll.deleteMany({"User": "molly.clawson@tufts.edu"});

                var newData = {"User": "molly.clawson@tufts.edu", "Schedule": userCourses}

                coll.insertOne(newData);
                console.log(newData);
              });
		});
    }
    res.end();

}).listen(process.env.PORT || 3000);

