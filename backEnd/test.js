var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '192.168.1.104',
  user     : 'root',
  password : 'root',
  database : 'test'
});
 
connection.connect();
 
// connection.query('SELECT * from websites', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });

module.exports=  (query='SELECT * from websites')=>{
  return new Promise((resolve,rejecr)=>{
    connection.query(query, function (error, results, fields) {
      if (error) rejecr(error);
      console.log('The solution is: ', );
      resolve(results)
    });
  });
  
};