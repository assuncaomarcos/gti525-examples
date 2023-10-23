const https = require('node:http');

const options = {
    hostname: 'eu.httpbin.org',
    port: 80,
    path: '/get',
    method: 'GET'
};

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
        process.stdout.write(d);
    })
})

req.on('error', error => {
    console.error(error);
})

req.end();