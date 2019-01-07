var express = require("express");
var app = express();
var router = express.Router();
var path = '/Users/arianraje/Documents/Walnut_Frontend/public/views/';
var bodyParser = require('body-parser');
const python = require('./controllers/python');
const fs = require('fs');

app.use(express.static('/Users/arianraje/Documents/Walnut_Frontend/public'));
app.use(express.static('/Users/arianraje/Documents/Walnut_Frontend/public/views'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

app.get("/",function(req,res){
  res.sendFile(path + "index.html");
  res.sendFile(path + "summary.html");
});


app.post('/posts', async function (req, res) {
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
      res.render(path + 'summary.html', {summary, summary});
  });
});

//app.get('/summary', function(req, res) {
  //console.log(text);
  //res.render(path + 'summary.html', {text: text});
//});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});
