var listModule = require('./list-modules.js');

var path = process.argv[2];
var ext = process.argv[3];
listModule(path,ext,(err,results)=> {

    results.forEach(item=> {
        console.log(item);
    });
});