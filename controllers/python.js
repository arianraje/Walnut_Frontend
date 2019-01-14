const {PythonShell} = require('python-shell');

exports.summarize = async function(path) {

  let promise = new Promise((resolve, reject) => {

    var options = {
      mode: 'text',
      pythonPath: 'python3',
      pythonOptions: ['-u'],
      scriptPath: '/Users/philippeibl/Documents/Walnut_Frontend/python/',
    };

    var pyshell = new PythonShell('CreateScores.py', options);
    pyshell.on('message', function (message) {
      console.log(message);
    });


    pyshell.end(function (err) {
      if (err){
          console.log(err);
      };
      console.log('Summary Written');
      resolve("done!");
    });

});

return promise;
}
