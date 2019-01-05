const {PythonShell} = require('python-shell');

exports.summarize = async function(path) {
  return new Promise(resolve => {

    let options = {
      mode: 'text',
      pythonPath: '/Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages',
      pythonOptions: ['-u'],
      args: ['value1', 'value2', 'value3']
    };

    PythonShell.run('python/CreateScores.py', options, function(err, results) {
      if (err)
        throw err;

      console.log('results: %j', results);
      let data = {hello: results};
      resolve(data);
    });
  });
}
