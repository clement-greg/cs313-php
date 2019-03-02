var fs = require('fs');

fs.readFile(process.argv[2],(err, buffer)=> {
    var lines = buffer.toString().split('\n');
    console.log(lines.length - 1);
});
