const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser')

app.use(bodyParser.json());

const hostname = '127.0.0.1';
const Port = 3000;

const router = require('./router');

app.get('/', (req, res)=> {
  res.send('Hello World');
}) 

// app.use(express.urlencoded({ extended: true, type: 'application/x-www-form-urlencoded' }));
app.use(express.json());
app.use('/books', router);

app.listen(Port, hostname, () => {
     console.log(`Server running at http//${hostname}:${Port}`);
})


module.exports = app;





// require('dotenv').config();

// const express = require('express');
// const router = require('./router');
// const { route } = require('./router');
// const app = express();
// Port = 3000;

// app.use(express.json());
// app.use('/', router);

// app.listen(Port, () => {
//     console.log('server running on', Port);
// })
