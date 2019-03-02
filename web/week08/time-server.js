const net = require('net');

var server = net.createServer(socket=> {
    let dt = new Date();
    let year = dt.getFullYear();
    let month = dt.getMonth() + 1;
    if(month.toString().length === 1) {
        month = '0' + month.toString();
    }

    let day = dt.getDate();
    if(day.toString().length === 1) {
        day = '0' + day.toString();
    }

    let hour = dt.getHours();
    if(hour.toString().length === 1) {
        hour ='0' + hour.toString();
    }

    let minute = dt.getMinutes();
    if(minute.toString().length === 1) {
        minute ='0' + minute.toString();
    }

    socket.write(year + '-' + month + '-' + day + ' ' + hour + ':' + minute);
    socket.write('\n');
    socket.end();
});

server.listen(process.argv[2]);