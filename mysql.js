let mysql = require('mysql');

let MysqlPoolBooster = require('mysql-pool-booster');
mysql = MysqlPoolBooster(mysql);

let pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'recs'
});

pool.getConnection(function (err) {
	if (err) {
		return console.error('error: ' + err.message);
	}
	console.log('Connected to the MySQL server.');

	let createRecs = `CREATE TABLE IF NOT EXISTS recommendations (
		id INT,
		recImg VARCHAR (255),
		recDetails VARCHAR (255),
		recTitle VARCHAR (255),
		recCost INT,
		recRating INT,
		recratingCount INT,
		roomId INT,
		INDEX (id)
  ) 
  ENGINE=InnoDB`

	pool.query(`USE recs;`)
	
	pool.query(createRecs, function (err, results, fields) {
		if (err) {
			console.log(err.message);
		}
	})
})


function save() {
  var start = new Date()
  
	pool.query(`LOAD DATA LOCAL INFILE 'data1m.csv' 
				INTO TABLE recommendations 
				FIELDS TERMINATED BY ',' 
				LINES TERMINATED BY '\n';`, (err, result, fields) => {

		if (err) {
			console.error('err on insert', err)
		}
		var end = new Date() - start
		console.log('took:  %dms', end)
	})
}

//  pool.query(` drop table recommendations `)

//   pool.query(`select * from recommendations where id = 1`, (err, res)=>{

//   })

// pool.query(`select * from recommendations `, (err, res) => {
// 	console.log(res.length)
// })

let find = (id) => {
	var start = new Date()
	pool.query(`select * from recommendations where id ='${id}'`, (err, res) => {
		var end = new Date() - start
		console.log(res)
		console.log('took:  %dms', end)
	})
}

find(998899)
// save()