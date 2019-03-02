var fs = require('fs');

var path = process.argv[2];
var ext = process.argv[3];

fs.readdir(path, (err, list)=> {

    list.forEach(item=> {
        if(item.endsWith('.' + ext)) {
            console.log(item);
        }
    })

});