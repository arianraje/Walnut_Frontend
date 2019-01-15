var express = require("express");
var app = express();
var router = express.Router();
var cors = require('cors')

const fileUpload = require('express-fileupload');
// var path = '/Users/philippeibl/Documents/Walnut_Frontend/public/views/';
var bodyParser = require('body-parser');
const python = require('./controllers/python');
const fs = require('fs');

// app.use(express.static('/Users/philippeibl/Documents/Walnut_Frontend/public'));
// app.use(express.static('/Users/philippeibl/Documents/Walnut_Frontend/public/views'));
app.use( bodyParser.json() );
app.use(fileUpload());
app.use(cors())

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

app.get("/",function(req,res){
  res.sendFile(__dirname + "/public/views/index.html");
  // res.sendFile("./public/views/summary.html");
});

app.get("/styles/style.css",function(req,res){
  res.sendFile(__dirname + "/public/styles/style.css");
  // res.sendFile("./public/views/summary.html");
});


app.get("/summary.html",function(req,res){
  res.sendFile(__dirname + "/public/views/summary.html");
  // res.sendFile("./public/views/summary.html");
});


app.post('/upload', async function (req, res) {
  var text = req.files.file1;

  req.files.file1.mv("./python/tmp.txt");
console.log('moved');

    var data = await python.summarize();

  fs.readFile('./python/Summary.txt', 'utf8', function (err, summary) {
      console.log(summary);
      // res.render(path + 'summary.html', {summary, summary});

      res.send({"success": "true", "preview": summary});
  });
});

//app.get('/summary', function(req, res) {
  //console.log(text);
  //res.render(path + 'summary.html', {text: text});
//});
var port = 3000
app.listen(port,function(){
  console.log("Live at Port 3000");
});

