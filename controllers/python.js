const {PythonShell} = require('python-shell');

exports.summarize = async function(path) {
  var options = {
    mode: 'text',
    pythonPath: 'python3',
    pythonOptions: ['-u'],
    scriptPath: '/Users/arianraje/Documents/Walnut_Frontend/python',
  };

  var pyshell = new PythonShell('CreateScores.py', options)
  pyshell.on('message', function (message) {
    console.log(message);
  });

  pyshell.end(function (err) {
    if (err){
        throw err;
    };
    console.log('Summary Written');
  });
}
