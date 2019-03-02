var http = require('http');

let responses = ['', '', ''];
let count = 3;

// process.argv[2] = 'http://localhost:4200';
// process.argv[3] = 'http://localhost:4200';
// process.argv[4] = 'http://localhost:4200';

doGet(0);
doGet(1);
doGet(2);

function doGet(index) {
    try {
        http.get(process.argv[index + 2], (response) => {
            response.on("data", function (data) {
                responses[index] += data.toString();
            });

            response.on('end', () => {
                count--;
                if (count === 0) {
                    handleComplete();
                }
            });
        });
    } catch (e) {
        console.log(e);
    }
}

function handleComplete() {
    responses.forEach(response => {
        console.log(response);
  
    });
}