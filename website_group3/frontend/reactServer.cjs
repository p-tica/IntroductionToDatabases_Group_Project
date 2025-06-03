// Citation for starter code
// Date: 06/02/2025
// Code copied from the bsg files from Exploration - Web Application Technology
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948 

// ########################################
// ########## SETUP

const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));

const PORT = 60001;

// ########################################
// ########## ROUTE HANDLERS

// Handles any requests that don't match the ones above to return the React app
// A request to '/nonExist' will redirect to the index.html where react router takes over at '/'
// Addition of splat is due to changes in path route matching from Express 4 to 5. More details:
// 1. https://github.com/expressjs/express/issues/5948
// 2. https://expressjs.com/en/guide/migrating-5.html#path-syntax
app.get('/*splat', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// ########################################
// ########## LISTENER

app.listen(PORT, () => {
    console.log(`Server running: http://classwork.engr.oregonstate.edu:${PORT}...`);
});