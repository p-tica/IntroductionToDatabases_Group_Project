// Citation for starter code 
// Date: 06/09/2025
// Code adapted from the bsg files from Exploration - Web Application Technology
// Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

// Get an instance of mysql we can use in the app
let mysql = require('mysql2')

// Create a 'connection pool' using the provided credentials
const env = process.env
console.log({env})
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : process.env.DB_HOST || 'classmysql.engr.oregonstate.edu',
    port              : process.env.DB_PORT || 3306,
    user              : process.env.DB_USER || 'cs340_',
    password          : process.env.DB_PASSWORD || '',
    database          : process.env.DB_NAME || 'cs340_',
}).promise(); // This makes it so we can use async / await rather than callbacks

// Export it for use in our application
module.exports = pool;