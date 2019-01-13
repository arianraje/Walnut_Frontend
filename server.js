var express = require("express");
var app = express();
var router = express.Router();
// var path = '/Users/philippeibl/Documents/Walnut_Frontend/public/views/';
var bodyParser = require('body-parser');
const python = require('./controllers/python');
const fs = require('fs');

// app.use(express.static('/Users/philippeibl/Documents/Walnut_Frontend/public'));
// app.use(express.static('/Users/philippeibl/Documents/Walnut_Frontend/public/views'));
app.use( bodyParser.json() );
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
  var text = req.body.tags;
  fs.writeFile("./python/tmp.txt", text, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("File updated with new text. . .");
  });
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

app.listen(3030,function(){
  console.log("Live at Port 3030");
});
