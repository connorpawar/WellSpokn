// // const Pool = require('pg').Pool
// // const pool = new Pool({
// // //   user: 'me',
// // //   host: 'localhost',
// // //   database: 'api',
// // //   password: 'password',
// // //   port: 5432,
// // })

// // pool.connect(function(err) {
// // 	if (err) throw err;
// // });
  
// module.exports = pool;


var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'mysql.eecs.ku.edu',
  user: 'pconnor',
  password: 'eveeN7qu',
  database: 'pconnor'
})

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;