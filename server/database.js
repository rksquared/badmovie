const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});
const getAllFavorites = function(callback) {
  connection.query(`SELECT * FROM movies`, (err, results) => {
    callback(err, results);
  })
};
const saveFavorite = function(movie, callback) {
  connection.query(`INSERT INTO movies SET ?`, movie, (err, results) => {
    callback(err, results);
  })
};
const deleteFavorites = function(callback) {
  //get favorites from the database
};

module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorites
};