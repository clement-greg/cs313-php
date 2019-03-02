const http = require('http')
const port = 8888
const { Pool, Client } = require('pg');


const requestHandler = (request, response) => {
    if(request.url === '/home') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<h1>Welcome to the Home Page!!!!</h1>');
        response.end();
    }

    if(request.url === '/getData') {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write('{"name":"Br. Burton","class":"cs313"}');
        response.end();
    }

    if(request.url === '/getDbData') {
      const client = new Client({
        user: 'dqcpqyfmbwvsjb',
        host: 'ec2-107-20-183-142.compute-1.amazonaws.com',
        database: 'ds7cisu21aeil',
        password: '46f69c31bacaa758a39f212f85f8fbf05ade706d7e5abb50e108225424194641',
        port: 5432,
        ssl: true,
      })
      client.connect()
      
      client.query('SELECT * FROM student WHERE deletedate IS NULL ORDER BY name', (err, res) => {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write(JSON.stringify(res.rows));
        response.end();
      })
    }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})