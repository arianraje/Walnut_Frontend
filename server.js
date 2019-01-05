var express = require("express");
var app = express();
var router = express.Router();
var path = '/Users/arianraje/Documents/Walnut_Frontend/public/views/';
var bodyParser = require('body-parser');
const fs = require('fs');
const python = require('./controllers/python');

app.use(express.static('/Users/arianraje/Documents/Walnut_Frontend/public'));
app.use(express.static('/Users/arianraje/Documents/Walnut_Frontend/public/views'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

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

  var lineReader = require('readline').createInterface({
    input: fs.createReadStream('./python/summary.txt')
  });

  var i = 0; var preview = "";
  lineReader.on('line', function (line) {
    if(++i > 5) {
      lineReader.close();
    }
    preview = preview + "<br />" + line;
  });

  lineReader.on('close', function() {
    console.log("exit");
    res.send({"success": "true", "preview": preview});
    // process.exit(0);
  });
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});
