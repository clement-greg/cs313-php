var fs = require('fs');

module.exports = function(path, extension, callback) {

    fs.readdir(path, (err, list)=> {

        if(err) {
            callback(err, null);
            return;
        }
        let results = [];
        list.forEach(item=> {
            if(item.endsWith('.' + extension)) {
                results.push(item);
            }
        })

        callback(null, results);
    });
}