const express = require('express');
const campsiteRouter = express.Router();

//We are setting it up in server.js for 'campsites', so here we only use /
campsiteRouter.route('/')
//Note that .all, .get, .post, etc. have been chained onto the campsiteRouter.route method.
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain'); //plain means plain text.
    next(); //next function passes control to the next routing method after this point. Otherwise, we would just stop here and not move forward.
})
//After the express server handles the code for the app.all method…. If the request is a post request, it would go to the app.all method, skipping the app.get method, and going to the app.post method. Only .all is done for all.
.get((req, res) => {
    res.end('Will send all the campsites to you');
})
.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`); //express.json in the server.js file had already parsed the data with JSON, so we are accessing it with req.body.name and req.body.description here.
})
.put((req, res) => {
    res.statusCode = 403; //403 is when an operation is not supported.
    res.end('PUT operation not supported on /campsites');
})
.delete((req, res) => {//This is normally a dangerous operation, so if it's set up for real we would make sure ordinary users are not allowed to do it.
    res.end('Deleting all campsites');
}); //Note that this is the only one with the ;, as it’s the end of the chain. We have a single statement handling all routing for /campsites.

campsiteRouter.route('/:campsiteId')//The route parameter at the end will allow us to store whatever the client sends as part of the path, called campsiteId. 
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
})

.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
})

.put((req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
})

.delete((req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});


module.exports = campsiteRouter;