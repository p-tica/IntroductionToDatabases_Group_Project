// Citation for starter code 
// Date: 06/09/2025
// Code adapted from the bsg files from Exploration - Web Application Technology
// Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

// Get an instance of mysql we can use in the app
let mysql = require('mysql2')

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : 'classmysql.engr.oregonstate.edu',
    user              : 'cs340_',
    password          : '',
    database          : 'cs340_',
}).promise(); // This makes it so we can use async / await rather than callbacks

// Export it for use in our application
module.exports = pool;