var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
const https = require('https');

//This is for the get request to get json data deom endpoint workflow
var urlencodedParser = bodyParser.urlencoded({ extended: false })
    username = "spadmin",
    password = "admin",
    url = "http://localhost:8080/identityiq/rest/identities/barack.obama/managedIdentities",
    auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

request(
    {
        url : url,
        headers : {
            "Authorization" : auth
        }
    },
    function (error, response, body) {
      var string = JSON.stringify(body);
       var objectValue = JSON.parse(string);
     }
);

//This is for the post request getting from form.
app.use(express.static('./public'))
app.use(morgan('short'))

app.post('/identityiq', urlencodedParser, function (req, res) {
var name = req.body.create_name;
var ent = req.body.create_ent;
var opr = req.body.create_opr;
var app = req.body.create_app;

console.log(req.body);
res.redirect('/');

//var data = JSON.stringify(req.body);
var data = req.body;
console.log(data);

var obj = {
   "workflowArgs":data
};

var myJSON = JSON.stringify(obj);
console.log(myJSON)

urls = "http://localhost:8080/identityiq/rest/workflows/REST_API_Provisioning/launch",
request({
        url : urls,
        method: "POST",
        //json: true,
        headers : {
            "Authorization" : auth,
             "Content-Type": 'application/json',
           },
         body: myJSON

    }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body)
            }
            else {

                console.log("error: " + error)
                console.log("response.statusCode: " + response.statusCode)
                console.log("response.statusText: " + response.statusText)
                //console.log(req)
            }

}
);
})


var server = app.listen(3000, function () {
    console.log('Node server is running..');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })
});

module.exports = app;
