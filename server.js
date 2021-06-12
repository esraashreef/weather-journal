// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Start up an instance of app
const app = express();
app.use(cors());


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log("server is running and listening to port :", port);

}


app.post('/all', addInfo);

function addInfo(request, responce) {
    projectData = {...request.body }


    responce.end();
    responce.send(projectData)
}

app.get('/add', getinfo);

function getinfo(request, responce) {
    responce.send(projectData);
}