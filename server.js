const express = require('express'); // Note that we don’t need to list the file path, only express.
const morgan = require('morgan');
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(express.json()); //when the server receives requests with JSON, this middleware function will parse the data into objects, so that we can use that data in JS.

app.use('/campsites', campsiteRouter); //this is where we set the name for /campsites, and we don’t specify it in campsiteRouter.js. (we instead use '/' there). The rest of the routes below work the same. 
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);

// After npm start-ing in the terminal, this allows us to see the static websites located in the public folder (Express will serve them.):
app.use(express.static(__dirname + '/public'));

// If line 19 were commented out, then localhost:3000/ would still load, but it would show the content below:
app.use((req, res) => {
    //request object, response object, are the parameters.
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});