const mysql = require('mysql');
require('dotenv').config();

/* Connection Pool */
const mysqlPool = mysql.createPool(require('./mysql_settings.js'));
const mysqlConn = mysql.createConnection(require('./mysql_settings'));

/* Database Connection Testing */
mysqlConn.connect ((err) => {
    if (!err) {
        console.log(`Successfully connected to MySQL => Database => shanaisys`);
    }
});
mysqlConn.end();

module.exports = mysqlPool;