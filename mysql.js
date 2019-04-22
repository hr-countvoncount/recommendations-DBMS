let mysql = require('mysql');

let MysqlPoolBooster = require('mysql-pool-booster');
mysql = MysqlPoolBooster(mysql);

let pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
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
  ENGINE= MyISAM;`

    pool.query(`USE recs;`)

    pool.query(createRecs, function (err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    })
})

async function save() {
    var start = new Date()
    pool.query(`SET AUTOCOMMIT = 0;`)
    pool.query(`SET foreign_key_checks=0`)
    pool.query(`SET unique_checks=0`)
    pool.query(`SET sql_log_bin = 0`)

    pool.query(`LOAD DATA LOCAL INFILE 'data4.csv' 
				INTO TABLE recommendations 
				FIELDS TERMINATED BY ',' 
                                LINES TERMINATED BY '\n'`, (err, result, fields) => {

   if (err) {
     console.error('err on insert', err)
     } 
   })
}


let find = (id) => {
    pool.query(`select * from recommendations where id ='${id}'`, (err, res) => {
        console.log(res)
  })
}

 for (let i = 0; i < 9; i++) {
 save()
 }

