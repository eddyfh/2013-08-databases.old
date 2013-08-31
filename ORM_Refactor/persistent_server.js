var mysql = require('mysql');
var request = require("request"); // DELETE THIS LATER
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/

/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */

var http = require("http");
var requestHandler = require('./request-handler.js');
var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(requestHandler.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
// dbConnection.query('insert')


// var tablename = "messages";
// dbConnection.query("DELETE FROM " + tablename);
// request(
//   {method: "POST",      // options:
//    uri: "http://127.0.0.1:8080/classes/room1",
//    form: {username: "Valjean",
//           message: "In mercy's name, three days is all I need."}
//   },
//   function(error, response, body) {
//     /* Now if we look in the database, we should find the
//      * posted message there. */
//     // dbConnection.query('insert into messages (username, message) values ("test1", "testmsg")');
//     // console.log(body);
//     dbConnection.query('select * from messages', function(err, rows, fields) {
//       console.log('rows are: ');
//       console.log(rows);
//     });
//     // console.log(response);
//     var queryString = "SELECT * FROM MESSAGES";
//     var queryArgs = [];
//     dbConnection.query( queryString, queryArgs,
//       function(err, results, fields) {
//         console.log('here are results from spec:');
//         console.log(results);
//       });
//   });
/* TODO: Change the above queryString & queryArgs to match your schema design
 * The exact query string and query args to use
 * here depend on the schema you design, so I'll leave
 * them up to you. */
// dbConnection.query( queryString, queryArgs,
//   function(err, results, fields) {
//     console.log('here are results from spec:');
//     console.log(results);
//     // Should have one result:
//   });


// dbConnection.query('insert into messages (username, message) values ("ed", "this msg")');
// dbConnection.query('select * from messages', function(err, rows, fields) {
//   console.log(rows);
// });
// dbConnection.query('DESCRIBE messages', function(err, rows, fields) {
//   // console.log(rows);
//   // console.log(fields);
// });
