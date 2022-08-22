const express = require('express');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;
let counter = 0;

const app = express();
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
app.use('/public', express.static('public'));
app.get('/', function(req, res, next) {
    counter++;
    //res.send('Hello World' + counter);
    // res.render('index', { counter: counter}, (err, html) => {
    //   console.log('rendered stuff');
    // });

    const options = {
        root: path.join(__dirname, ''),
        headers: {
            'x-timestamp': Date.now(),
            'Content-Type': 'text/html'
        }
    }
    res.sendFile('index.html', options, (err) => {
        if(err) {
            next(err);
        } else {
            console.log('Sent index.html');
        }
    });
})
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     counter++;
//     console.log('Servicing request ', counter);
//
//     res.end('Hello World');
// });


app.listen(3000, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


